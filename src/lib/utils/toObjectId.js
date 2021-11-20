import mongoose, { mongo } from 'mongoose';

/**
 *
 * @param {string} id id
 * @returns {mongo.ObjectId} Return ObjectId
 */
const toObjectId = (id) => mongoose.mongo.ObjectId(id);
export { toObjectId };
