import GatewayTimeoutException from './gate-way-timeout.exception';

/**
 * The deadline expired before the operation could complete. For operations
 * that change the state of the system, this error may be returned
 * even if the operation has completed successfully. For example, a
 * successful response from a server could have been delayed long
 * enough for the deadline to expire.
 *
 * HTTP Mapping: 504 Gateway Timeout
 */
class RpcDeadlineExceededException extends GatewayTimeoutException {
  constructor(objectOrError?: string | object | any, description?: string) {
    super(objectOrError, description, 'DEADLINE_EXCEEDED');
  }
}

export default RpcDeadlineExceededException;
