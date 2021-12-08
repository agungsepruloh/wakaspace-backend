import { CollectionDB } from '@wakaspace/constants';
import { model } from 'mongoose';
import EthAddressSchema from './eth-address.schema';
import HeroSchema from './hero.schema';
import RaceSchema from './race.schema';
import RaritySchema from './rarity.schema';
import TypeSchema from './type.schema';
import UserSchema from './user.schema';

const EthAddressModel = model(CollectionDB.ETH_ADDRESS, EthAddressSchema);
const HeroModel = model(CollectionDB.HERO, HeroSchema);
const RaceModel = model(CollectionDB.RACE, RaceSchema);
const RarityModel = model(CollectionDB.RARITY, RaritySchema);
const TypeModel = model(CollectionDB.TYPE, TypeSchema);
const UserModel = model(CollectionDB.USER, UserSchema);

export { EthAddressModel, HeroModel, RaceModel, RarityModel, TypeModel, UserModel };
