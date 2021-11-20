import WakaspaceError from '@wakaspace/exception';
import { isCelebrateError } from 'celebrate';
import { ErrorMessage } from '@wakaspace/constants';

/**
 * Handling & Formatting Error
 */

const expressErrorHandler = (err, req, res, next) => {
  const { status, message, errors } = err;
  const errorObject = {
    status: status || 500,
    message,
    error: err,
  };

  /**
   * Handle 401 thrown by express-jwt library
   */
  if (err.name === 'UnauthorizedError') {
    errorObject.error = ErrorMessage.userNotAuthorized;
  } else if (err instanceof WakaspaceError.Boom) {
    /* Handle WakaspaceError */
    errorObject.error = err.output.payload.error;
    errorObject.status = err.output.statusCode;
  } else if (err.name === 'ValidationError') {
    errorObject.error = ErrorMessage.validationFailed;
    errorObject.status = 400;
  } /* Handle Joi Validation */ else if (isCelebrateError(err)) {
    errorObject.error = ErrorMessage.validationFailed;
  }

  return res.status(errorObject.status).error(errorObject);
  // eslint-disable-next-line no-unreachable
  next();
};

export default expressErrorHandler;
