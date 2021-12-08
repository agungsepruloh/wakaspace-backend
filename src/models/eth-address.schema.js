import { CollectionDB } from '@wakaspace/constants';
import { SchemaDefinition, Types } from 'mongoose';
import BaseSchema from './base.schema';

/**
 * @type {SchemaDefinition} schema
 */
const schema = {
  address: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
  },
};

class EthAddress extends BaseSchema {
  constructor() {
    super();
    this.add(schema);
    this.loadBasePlugins();
    this.loadVirtuals();
  }

  loadVirtuals() {
    this.virtual('user', {
      ref: CollectionDB.USER,
      localField: 'userId',
      foreignField: '_id',
      justOne: true,
    });
  }
}

const EthAddressSchema = new EthAddress();

export default EthAddressSchema;
