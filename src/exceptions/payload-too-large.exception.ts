import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class PayloadTooLargeException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Payload Too Large`,
    status = `PAYLOAD_TOO_LARGE`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.PAYLOAD_TOO_LARGE,
        status
      ),
      HttpStatus.PAYLOAD_TOO_LARGE,
      status
    );
  }
}

export default PayloadTooLargeException;
