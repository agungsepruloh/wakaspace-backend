import { CollectionDB } from '@wakaspace/constants';
import { SchemaDefinition } from 'mongoose';
import BaseSchema from './base.schema';

/**
 * @type {SchemaDefinition} schema
 */
const schema = {
  username: {
    type: String,
    required: false,
    default: null,
  },
  email: {
    type: String,
    required: false,
    default: null,
  },
};

class User extends BaseSchema {
  constructor() {
    super();
    this.add(schema);
    this.loadBasePlugins();
    this.loadVirtuals();
  }

  loadVirtuals() {
    this.virtual('ethAddresses', {
      ref: CollectionDB.ETH_ADDRESS,
      localField: '_id',
      foreignField: 'userId',
      justOne: false,
    });
  }
}

const UserSchema = new User();

export default UserSchema;
