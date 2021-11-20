import { HeroModel } from '@wakaspace/models';

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
}
