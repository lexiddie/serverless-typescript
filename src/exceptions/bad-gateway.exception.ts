import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class BadGatewayException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Bad Gateway`,
    status = `BAD_GATEWAY`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.BAD_GATEWAY,
        status
      ),
      HttpStatus.BAD_GATEWAY,
      status
    );
  }
}

export default BadGatewayException;
