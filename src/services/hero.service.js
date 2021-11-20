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
    const data = await this.paginate(filter, { page, limit });
    const docs = [];

    for (const doc of data.docs) {
      const hero = doc.toObject();
      Reflect.deleteProperty(hero, 'typeId');
      Reflect.deleteProperty(hero, 'rarityId');
      docs.push(hero);
    }

    Reflect.set(data, 'docs', docs);
    return data;
  }
}
