import { CollectionDB } from '@wakaspace/constants';
import { model } from 'mongoose';
import HeroSchema from './hero.schema';
import RaceSchema from './race.schema';
import RaritySchema from './rarity.schema';
import TypeSchema from './type.schema';

const HeroModel = model(CollectionDB.HERO, HeroSchema);
const RaceModel = model(CollectionDB.RACE, RaceSchema);
const RarityModel = model(CollectionDB.RARITY, RaritySchema);
const TypeModel = model(CollectionDB.TYPE, TypeSchema);

export { HeroModel, RaceModel, RarityModel, TypeModel };
