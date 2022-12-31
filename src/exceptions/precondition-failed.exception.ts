import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class PreconditionFailedException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Precondition Failed`,
    status = `PRECONDITION_FAILED`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.PRECONDITION_FAILED,
        status
      ),
      HttpStatus.PRECONDITION_FAILED,
      status
    );
  }
}

export default PreconditionFailedException;
