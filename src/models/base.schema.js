import 'mongoose-fill';
import { Schema, SchemaDefinition } from 'mongoose';
import UniqueValidator from 'mongoose-unique-validator';
import MongooseDelete from 'mongoose-delete';
import MongooseAutopopulate from 'mongoose-autopopulate';
import { MongooseConfig } from '../config/mongoose.config';
import { MongooseAggregatePaginate, MongoosePaginate } from '@wakaspace/plugins';

/**
 * @type {SchemaDefinition} schema
 */
const schema = {};

export default class BaseSchema extends Schema {
  constructor(obj, options) {
    super(obj, { ...MongooseConfig.schemaOptions, ...options });
    this.add(schema);
    this.loadBasePlugins();
    this.loadUniquePlugin();
  }

  loadBasePlugins() {
    this.plugin(MongooseDelete, { overrideMethods: 'all' });
    this.plugin(MongoosePaginate);
    this.plugin(MongooseAggregatePaginate);
    this.plugin(MongooseAutopopulate);
  }

  loadUniquePlugin() {
    this.plugin(UniqueValidator, { message: '{PATH} is already exist.' });
  }
}
