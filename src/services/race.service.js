import { RaceModel } from '@wakaspace/models';

export class RaceService extends RaceModel {
  /**
   * Get all races
   * @returns {Promise<Array<Document>>} races
   */
  static async GetAll() {
    const records = await this.find();
    return records;
  }
}
