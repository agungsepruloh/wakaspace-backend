import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Jakarta');
/**
 * To get current Time in UTC format
 *
 * @returns {string} return current time
 */
const getCurrentTime = () => moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
const momentUtc = (input) => moment(input).utc();

export { getCurrentTime, momentUtc };
