import ConflictException from './conflict.exception';

/**
 * The entity that a client attempted to create (e.g., file or directory)
 * already exists.
 *
 * HTTP Mapping: 409 Conflict
 */
class RpcAlreadyExistsException extends ConflictException {
  constructor(objectOrError?: string | object | any, description?: string) {
    super(objectOrError, description, 'ALREADY_EXISTS');
  }
}

export default RpcAlreadyExistsException;
