import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class NotImplementedException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Not Implemented`,
    status = `NOT_IMPLEMENTED`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.NOT_IMPLEMENTED,
        status
      ),
      HttpStatus.NOT_IMPLEMENTED,
      status
    );
  }
}

export default NotImplementedException;
