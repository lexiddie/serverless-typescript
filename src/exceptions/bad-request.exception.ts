import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class BadRequestException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Bad Request`,
    status = `BAD_REQUEST`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.BAD_REQUEST,
        status
      ),
      HttpStatus.BAD_REQUEST,
      status
    );
  }
}

export default BadRequestException;
