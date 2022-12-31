import ConflictException from './conflict.exception';

/**
 * The operation was aborted, typically due to a concurrency issue such as
 * a sequencer check failure or transaction abort.
 *
 * See the guidelines above for deciding between `FAILED_PRECONDITION`,
 * `ABORTED`, and `UNAVAILABLE`.
 *
 * HTTP Mapping: 409 Conflict
 */
class RpcAbortedException extends ConflictException {
  constructor(objectOrError?: string | object | any, description?: string) {
    super(objectOrError, description, 'ABORTED');
  }
}

export default RpcAbortedException;
