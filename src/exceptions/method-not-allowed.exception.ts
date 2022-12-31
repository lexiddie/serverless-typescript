import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class MethodNotAllowedException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Method Not Allowed`,
    status = `METHOD_NOT_ALLOWED`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.METHOD_NOT_ALLOWED,
        status
      ),
      HttpStatus.METHOD_NOT_ALLOWED,
      status
    );
  }
}

export default MethodNotAllowedException;
