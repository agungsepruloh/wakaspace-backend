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

class Race extends BaseSchema {
  constructor() {
    super();
    this.add(schema);
  }
}

const RaceSchema = new Race();

export default RaceSchema;
