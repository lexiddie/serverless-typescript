import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class UnauthorizedException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Unauthorized`,
    status = `UNAUTHORIZED`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.UNAUTHORIZED,
        status
      ),
      HttpStatus.UNAUTHORIZED,
      status
    );
  }
}

export default UnauthorizedException;
