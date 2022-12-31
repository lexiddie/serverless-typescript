import InternalServerErrorException from './internal-server-error.exception';

/**
 * Internal errors. This means that some invariants expected by the
 * underlying system have been broken.  This error code is reserved
 * for serious errors.
 *
 * HTTP Mapping: 500 Internal Server Error
 */
class RpcInternalException extends InternalServerErrorException {
  constructor(objectOrError?: string | object | any, description?: string) {
    super(objectOrError, description, 'INTERNAL');
  }
}

export default RpcInternalException;
