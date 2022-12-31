import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class MisdirectedException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Misdirected`,
    status = `MISDIRECTED`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.MISDIRECTED,
        status
      ),
      HttpStatus.MISDIRECTED,
      status
    );
  }
}

export default MisdirectedException;
