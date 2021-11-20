import WakaspaceError from '@wakaspace/exception';
import { Request, Response, NextFunction } from 'express';
import { ErrorMessage } from '@wakaspace/constants';
import { isEmpty } from 'lodash';
import moment from 'moment-timezone';

/**
 * @typedef ExpressMiddleware
 * @property {Request} req Express req Object
 * @property {Response} res  Express res Object
 * @property {NextFunction} next  Express next Function
 */

/**
 * Convert query to filter
 *
 * @param {array} searchKeys Keys to search
 * @param {string} dateFilterKey dateFilterKey
 * @returns {ExpressMiddleware} middleware
 */
const parse =
  (searchKeys = [], dateFilterKey = 'createdOn') =>
  async (req, res, next) => {
    try {
      if (isEmpty(req.query)) {
        return next();
      }

      const { query } = req;
      req.filter = {};

      const dbDateFilterKey = `${dateFilterKey}`;

      if (query?.onDate) {
        Reflect.set(req.filter, dbDateFilterKey, {
          $gte: moment(query?.onDate).startOf('day').utc(true).format(),
          $lte: moment(query?.onDate).endOf('day').utc(true).format(),
        });
      } else if (query?.fromDate && query?.toDate) {
        Reflect.set(req.filter, dbDateFilterKey, {
          $gte: moment(query?.fromDate).startOf('day').utc(true).format(),
          $lte: moment(query?.toDate).endOf('day').utc(true).format(),
        });
      } else if (query?.fromDate && !query?.toDate) {
        Reflect.set(req.filter, dbDateFilterKey, {
          $gte: { $toDate: moment(query?.fromDate).startOf('day').utc(true).format() },
        });
      } else if (!query?.fromDate && query?.toDate) {
        throw WakaspaceError.badData(ErrorMessage.invalidDateFilter);
      }

      if (searchKeys.length > 0 && query?.search) {
        const search = [];

        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < searchKeys.length; index++) {
          const searchKey = searchKeys[index];
          search.push({
            [searchKey]: {
              $regex: query?.search,
              $options: '$i',
            },
          });
        }

        Reflect.set(req.filter, '$or', search);
      } else if (query?.search) {
        Reflect.set(req.filter, '$text', { $search: query?.search });
      }

      Reflect.deleteProperty(req.query, 'search');
      Reflect.deleteProperty(req.query, 'toDate');
      Reflect.deleteProperty(req.query, 'fromDate');

      return next();
    } catch (e) {
      return next(e);
    }
  };

/**
 * access by req.filter
 */
export default parse;
