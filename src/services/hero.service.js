import { HeroModel } from '@wakaspace/models';

export class HeroService extends HeroModel {
  /**
   * Get all heroes
   * @returns {Promise<Array<Document>>} heroes
   */
  static async Paginate() {
    const records = await this.find();
    return records;
  }
}
