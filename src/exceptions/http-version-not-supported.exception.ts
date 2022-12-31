import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class HttpVersionNotSupportedException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `HTTP Version Not Supported`,
    status = `HTTP_VERSION_NOT_SUPPORTED`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
        status
      ),
      HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
      status
    );
  }
}

export default HttpVersionNotSupportedException;
