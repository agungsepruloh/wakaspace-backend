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
  },
  rarityId: {
    type: Types.ObjectId,
    ref: CollectionDB.RARITY,
  },
};

class Hero extends BaseSchema {
  constructor() {
    super();
    this.add(schema);
    this.loadVirtuals();
  }

  loadVirtuals() {
    this.virtual('type', {
      ref: CollectionDB.TYPE,
      localField: 'typeId',
      foreignField: '_id',
      justOne: true,
    });

    this.virtual('rarity', {
      ref: CollectionDB.RARITY,
      localField: 'rarityId',
      foreignField: '_id',
      justOne: true,
    });
  }
}

const HeroSchema = new Hero();

export default HeroSchema;
