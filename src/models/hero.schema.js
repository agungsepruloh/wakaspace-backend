import { CollectionDB } from '@wakaspace/constants';
import { SchemaDefinition, Types } from 'mongoose';
import BaseSchema from './base.schema';

/**
 * @type {SchemaDefinition} schema
 */
const schema = {
  name: {
    type: String,
    required: true,
    titleCase: true,
  },
  desc: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: 'eth',
  },
  imageUrl: {
    type: String,
    default: null,
  },
  typeId: {
    type: Types.ObjectId,
    ref: CollectionDB.TYPE,
    autopopulate: true,
  },
  rarityId: {
    type: Types.ObjectId,
    ref: CollectionDB.RARITY,
    autopopulate: true,
  },
};

class Hero extends BaseSchema {
  constructor() {
    super();
    this.add(schema);
    this.loadBasePlugins();
    this.loadVirtuals();
  }

  loadVirtuals() {
    this.virtual('type').get(function () {
      return this.typeId.title;
    });

    this.virtual('rarity').get(function () {
      return this.rarityId.title;
    });
  }
}

const HeroSchema = new Hero();

export default HeroSchema;
