import { SchemaDefinition } from 'mongoose';
import BaseSchema from './base.schema';

/**
 * @type {SchemaDefinition} schema
 */
const schema = {
  title: {
    type: String,
    required: true,
    titleCase: true,
  },
  imageUrl: {
    type: String,
    default: null,
  },
};

class Type extends BaseSchema {
  constructor() {
    super();
    this.add(schema);
  }
}

const TypeSchema = new Type();

export default TypeSchema;
