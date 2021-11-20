import { RaceModel, RarityModel, TypeModel } from '@wakaspace/models';

export class MarketplaceService {
  /**
   * Get all options
   */
  static async GetAllOptions() {
    const races = await RaceModel.find();
    const rarities = await RarityModel.find();
    const types = await TypeModel.find();
    return [
      { title: 'Race', values: races },
      { title: 'Rarity', values: rarities },
      { title: 'Type', values: types },
    ];
  }
}
