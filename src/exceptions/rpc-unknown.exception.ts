import InternalServerErrorException from './internal-server-error.exception';

/**
 * Unknown error. For example, this error may be returned when
 * a `Status` value received from another address space belongs to
 * an error space that is not known in this address space. Also
 * errors raised by APIs that do not return enough error information
 * may be converted to this error.
 *
 * HTTP Mapping: 500 Internal Server Error
 */
class RpcUnknownException extends InternalServerErrorException {
  constructor(objectOrError?: string | object | any, description?: string) {
    super(objectOrError, description, 'UNKNOWN');
  }
}

export default RpcUnknownException;
