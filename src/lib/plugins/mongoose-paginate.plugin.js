import MongoosePaginate from 'mongoose-paginate-v2';
import MongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

MongoosePaginate.paginate.options = {
  limit: 10,
};

export { MongoosePaginate, MongooseAggregatePaginate };
