import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class NotFoundException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Not Found`,
    status = `NOT_FOUND`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.NOT_FOUND,
        status
      ),
      HttpStatus.NOT_FOUND,
      status
    );
  }
}

export default NotFoundException;
