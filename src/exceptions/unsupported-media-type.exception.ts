import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class UnsupportedMediaTypeException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Unsupported Media Type`,
    status = `UNSUPPORTED_MEDIA_TYPE`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        status
      ),
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      status
    );
  }
}

export default UnsupportedMediaTypeException;
