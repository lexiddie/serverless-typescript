import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class GatewayTimeoutException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Gateway Timeout`,
    status = `GATEWAY_TIMEOUT`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.GATEWAY_TIMEOUT,
        status
      ),
      HttpStatus.GATEWAY_TIMEOUT,
      status
    );
  }
}

export default GatewayTimeoutException;
