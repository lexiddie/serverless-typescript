import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class ForbiddenException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Forbidden`,
    status = `FORBIDDEN`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.FORBIDDEN,
        status
      ),
      HttpStatus.FORBIDDEN,
      status
    );
  }
}

export default ForbiddenException;
