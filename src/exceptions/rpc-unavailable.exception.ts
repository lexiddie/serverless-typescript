import ServiceUnavailableException from './service-unavailable.exception';

/**
 * The service is currently unavailable.  This is most likely a
 * transient condition, which can be corrected by retrying with
 * a backoff. Note that it is not always safe to retry
 * non-idempotent operations.
 *
 * See the guidelines above for deciding between `FAILED_PRECONDITION`,
 * `ABORTED`, and `UNAVAILABLE`.
 *
 * HTTP Mapping: 503 Service Unavailable
 */
class RpcUnavailableException extends ServiceUnavailableException {
  constructor(objectOrError?: string | object | any, description?: string) {
    super(objectOrError, description, 'UNAVAILABLE');
  }
}

export default RpcUnavailableException;
