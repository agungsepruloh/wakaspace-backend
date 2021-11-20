import { CollectionDB } from '@wakaspace/constants';
import { model } from 'mongoose';
import RaceSchema from './race.schema';

const RaceModel = model(CollectionDB.RACE, RaceSchema);

export { RaceModel };
