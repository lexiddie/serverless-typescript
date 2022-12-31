import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class InternalServerErrorException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Internal Server Error`,
    status = 'INTERNAL_SERVER_ERROR'
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.INTERNAL_SERVER_ERROR,
        status
      ),
      HttpStatus.INTERNAL_SERVER_ERROR,
      status
    );
  }
}

export default InternalServerErrorException;
