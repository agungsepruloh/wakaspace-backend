import { get } from 'lodash';

/**
 *  To Convert any text to `titlecase`
 * 
 *  @param {*} schema Monngose Schema
 *  @example - 
 *  
  new Schema({
    fName: {
    type: String,
    required: [true, 'Please enter first name'],
    index: true,
    titleCase: true, // here
    },
  });
 *   
 * @returns {void}
 */
export default function mongooseTitleCasePlugin(schema) {
  schema.pre('save', function (next) {
    const self = this;
    schema.eachPath(function (path, type) {
      const titleOption = get(type, 'options.titleCase');
      if (titleOption) {
        if (self[path]) {
          self[path] = self[path].replace(/\b[a-z]/g, (x) => x.toUpperCase());
        }
      }
    });
    next();
  });
}
