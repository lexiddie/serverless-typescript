import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

/**
 * Some resource has been exhausted, perhaps a per-user quota, or
 * perhaps the entire file system is out of space.
 *
 * HTTP Mapping: 429 Too Many Requests
 */
class RpcResourceExhaustedException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Request Timeout`,
    status = `RESOURCE_EXHAUSTED`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.TOO_MANY_REQUESTS,
        status
      ),
      HttpStatus.TOO_MANY_REQUESTS,
      status
    );
  }
}

export default RpcResourceExhaustedException;
