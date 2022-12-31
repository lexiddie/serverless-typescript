import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class RequestTimeoutException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Request Timeout`,
    status = `REQUEST_TIMEOUT`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.REQUEST_TIMEOUT,
        status
      ),
      HttpStatus.REQUEST_TIMEOUT,
      status
    );
  }
}

export default RequestTimeoutException;
