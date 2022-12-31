import BadRequestException from './bad-request.exception';

/**
 * The client specified an invalid argument. Note that this differs
 * from `FAILED_PRECONDITION`. `INVALID_ARGUMENT` indicates arguments
 * that are problematic regardless of the state of the system
 * (e.g., a malformed file name).
 *
 * HTTP Mapping: 400 Bad Request
 */
class RpcInvalidArgumentException extends BadRequestException {
  constructor(objectOrError?: string | object | any, description?: string) {
    super(objectOrError, description, 'INVALID_ARGUMENT');
  }
}

export default RpcInvalidArgumentException;
