import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class ConflictException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Conflict`,
    status = `CONFLICT`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.CONFLICT,
        status
      ),
      HttpStatus.CONFLICT,
      status
    );
  }
}

export default ConflictException;
