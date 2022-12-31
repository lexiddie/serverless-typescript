import InternalServerErrorException from './internal-server-error.exception';

/**
 * Unrecoverable data loss or corruption.
 *
 * HTTP Mapping: 500 Internal Server Error
 */
class RpcDataLossException extends InternalServerErrorException {
  constructor(objectOrError?: string | object | any, description?: string) {
    super(objectOrError, description, 'DATA_LOSS');
  }
}

export default RpcDataLossException;
