import BadRequestException from './bad-request.exception';

/**
 * The operation was rejected because the system is not in a state
 * required for the operation's execution.  For example, the directory
 * to be deleted is non-empty, an rmdir operation is applied to
 * a non-directory, etc.
 *
 * Service implementors can use the following guidelines to decide
 * between `FAILED_PRECONDITION`, `ABORTED`, and `UNAVAILABLE`:
 *
 *   (a) Use `UNAVAILABLE` if the client can retry just the failing call.
 *
 *   (b) Use `ABORTED` if the client should retry at a higher level
 *       (e.g., when a client-specified test-and-set fails, indicating the
 *       client should restart a read-modify-write sequence).
 *
 *   (c) Use `FAILED_PRECONDITION` if the client should not retry until
 *       the system state has been explicitly fixed.  E.g., if an "rmdir"
 *       fails because the directory is non-empty, `FAILED_PRECONDITION`
 *       should be returned since the client should not retry unless
 *       the files are deleted from the directory.
 *
 * HTTP Mapping: 400 Bad Request
 */
class RpcFailedPreconditionException extends BadRequestException {
  constructor(objectOrError?: string | object | any, description?: string) {
    super(objectOrError, description, 'FAILED_PRECONDITION');
  }
}

export default RpcFailedPreconditionException;
