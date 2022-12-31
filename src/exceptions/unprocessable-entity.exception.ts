import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class UnprocessableEntityException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Unprocessable Entity`,
    status = `UNPROCESSABLE_ENTITY`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.UNPROCESSABLE_ENTITY,
        status
      ),
      HttpStatus.UNPROCESSABLE_ENTITY,
      status
    );
  }
}

export default UnprocessableEntityException;
