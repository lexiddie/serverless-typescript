import NotImplementedException from './not-implemented.exception';

/**
 * The operation is not implemented or is not supported/enabled in this
 * service.
 *
 * HTTP Mapping: 501 Not Implemented
 */
class RpcUnimplementedException extends NotImplementedException {
  constructor(objectOrError?: string | object | any, description?: string) {
    super(objectOrError, description, 'UNIMPLEMENTED');
  }
}

export default RpcUnimplementedException;
