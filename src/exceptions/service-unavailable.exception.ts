import HttpStatus from '../enums/http-status.enum';
import HttpException from './http.exception';

class ServiceUnavailableException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description = `Service Unavailable`,
    status = `SERVICE_UNAVAILABLE`
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.SERVICE_UNAVAILABLE,
        status
      ),
      HttpStatus.SERVICE_UNAVAILABLE,
      status
    );
  }
}

export default ServiceUnavailableException;
