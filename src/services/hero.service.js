import { HeroModel } from '@wakaspace/models';
import { Model } from 'mongoose';

export class HeroService extends HeroModel {
  /**
   * Get all heroes
   * @param {Object} pageDto page data object
   * @param {Object} filter filter
   * @returns {Promise<Array<Document>>} heroes
   */
  static async Paginate(pageDto, filter) {
    const { page, limit } = pageDto;
    const populate = ['type', 'rarity'];
    const data = await this.paginate(filter, { page, limit, populate });
    return data;
  }

  /**
   * Find hero by ID
   * @param {String} heroId hero's ID
   * @returns {Model} doc
   */
  static async FindById(heroId) {
    const populate = ['type', 'rarity'];
    const data = await this.findById(heroId).populate(populate);
    return data;
  }
}
