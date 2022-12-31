import UnauthorizedException from './unauthorized.exception';

/**
 * The request does not have valid authentication credentials for the
 * operation.
 *
 * HTTP Mapping: 401 Unauthorized
 */
class RpcUnauthenticatedException extends UnauthorizedException {
  constructor(objectOrError?: string | object | any, description?: string) {
    super(objectOrError, description, 'UNAUTHENTICATED');
  }
}

export default RpcUnauthenticatedException;
