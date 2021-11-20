import { unset } from 'lodash';
import { getCurrentTime } from '@wakaspace/moment';

/**
 *  See more options here {@link https://mongoosejs.com/docs/guide.html#options }
 */
const schemaOptions = {
  strict: true,
  timestamps: {
    createdAt: 'createdOn',
    updatedAt: 'updatedOn',
    currentTime: () => getCurrentTime(),
  },
  minimize: true,
  toJSON: {
    virtuals: true,
    getters: true,
    transform: (doc, ret) => {
      unset(ret, '__v');
      unset(ret, '__t');
      unset(ret, '_id');
      unset(ret, 'updatedOn');
      unset(ret, 'deleted');
    },
  },
  toObject: {
    virtuals: true,
    getters: true,
    transform: (doc, ret) => {
      unset(ret, '__v');
      unset(ret, '__t');
      unset(ret, '_id');
      unset(ret, 'updatedOn');
      unset(ret, 'deleted');
    },
  },
};

const MongooseConfig = {
  schemaOptions,
};

Object.freeze(MongooseConfig);
export { MongooseConfig };
