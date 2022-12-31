import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class NotAcceptableException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Not Acceptable`,
    status = `NOT_ACCEPTABLE`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.NOT_ACCEPTABLE,
        status
      ),
      HttpStatus.NOT_ACCEPTABLE,
      status
    );
  }
}

export default NotAcceptableException;
