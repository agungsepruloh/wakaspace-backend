import WakaspaceError from '@wakaspace/exception';
import { Request, Response, NextFunction } from 'express';
import { ErrorMessage } from '@wakaspace/constants';
import moment from 'moment-timezone';
import { isEmpty } from 'lodash';

/**
 * @typedef ExpressMiddleware
 * @property {Request} req Express req Object
 * @property {Response} res  Express res Object
 * @property {NextFunction} next  Express next Function
 */

/**
 * Convert query to aggregation filter
 *
 * @param {Array} searchKeys Keys to search
 * @param {string} dateFilterKey dateFilterKey
 * @returns {ExpressMiddleware} middleware
 */
const parseAggregation =
  (searchKeys = [], dateFilterKey = 'createdOn') =>
  async (req, res, next) => {
    try {
      if (isEmpty(req.query)) {
        return next();
      }

      const { query } = req;
      req.filter = { dates: [], search: null };

      const dbDateFilterKey = `$${dateFilterKey}`;

      const fromDateFilter = {
        $gte: [
          dbDateFilterKey,
          {
            $toDate: moment(query?.fromDate).startOf('day').utc(true).format(),
          },
        ],
      };

      const toDateFilter = {
        $lte: [
          dbDateFilterKey,
          {
            $toDate: moment(query?.toDate).endOf('day').utc(true).format(),
          },
        ],
      };

      if (query?.fromDate && query?.toDate) {
        req.filter.dates.push(fromDateFilter);
        req.filter.dates.push(toDateFilter);
      } else if (query?.fromDate && !query?.toDate) {
        req.filter.dates.push(fromDateFilter);
      } else if (!query?.fromDate && query?.toDate) {
        throw WakaspaceError.badData(ErrorMessage.invalidDateFilter);
      }

      if (searchKeys.length > 0 && query?.search) {
        const search = {
          $or: [],
        };

        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < searchKeys.length; index++) {
          const searchKey = searchKeys[index];
          search.$or.push({
            [searchKey]: {
              $regex: query?.search,
              $options: '$i',
            },
          });
        }

        Reflect.set(req.filter, 'search', search);
      } else if (query?.search) {
        Reflect.set(req.filter, 'search', { $text: { $search: `${query?.search}` } });
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
export default parseAggregation;
