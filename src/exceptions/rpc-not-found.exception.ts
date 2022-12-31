import NotFoundException from './not-found.exception';

/**
 * Some requested entity (e.g., file or directory) was not found.
 *
 * Note to server developers: if a request is denied for an entire class
 * of users, such as gradual feature rollout or undocumented whitelist,
 * `NOT_FOUND` may be used. If a request is denied for some users within
 * a class of users, such as user-based access control, `PERMISSION_DENIED`
 * must be used.
 *
 * HTTP Mapping: 404 Not Found
 */
class RpcNotFoundException extends NotFoundException {
  constructor(objectOrError?: string | object | any, description?: string) {
    super(objectOrError, description, 'NOT_FOUND');
  }
}

export default RpcNotFoundException;
