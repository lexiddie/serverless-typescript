import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class ImATeapotException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `I'm a teapot`,
    status = `I_AM_A_TEAPOT`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.I_AM_A_TEAPOT,
        status
      ),
      HttpStatus.I_AM_A_TEAPOT,
      status
    );
  }
}

export default ImATeapotException;
