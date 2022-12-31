import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class GoneException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Gone`,
    status = `GONE`
  ) {
    super(
      HttpException.createBody(objectOrError, description, HttpStatus.GONE),
      HttpStatus.GONE,
      status
    );
  }
}

export default GoneException;
