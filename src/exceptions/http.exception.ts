import { get, isArray, isObject, isString } from 'lodash';
import { ZodError } from 'zod';

class HttpException extends Error {
  private readonly response;
  private readonly code;
  private readonly status;

  constructor(
    response: string | Record<string, any>,
    code: number,
    status: string
  ) {
    super();
    this.response = response;
    this.code = code;
    this.status = status;
    this.initMessage();
    this.initName();
  }

  initMessage = (): void => {
    if (isString(this.response)) {
      this.message = this.response;
    } else if (
      isObject(this.response) &&
      (isString(get(this.response, 'message')) ||
        isObject(get(this.response, 'message')))
    ) {
      this.message = get(this.response, 'message');
    } else if (
      isObject(this.response) &&
      isArray(get(this.response, 'message'))
    ) {
      this.message = get(this.response, 'message');
    } else if (this.constructor) {
      const constructorName: string = get(this.constructor, 'name');
      const message = constructorName.match(/[A-Z][a-z]+|[0-9]+/g)!.join(' ');
      this.message = message || 'No Message';
    }
  };

  initName = (): void => {
    this.name = this.constructor.name;
  };

  getResponse = (): string | object => {
    return this.response;
  };

  getCode = (): number => {
    return this.code;
  };

  getStatus = (): string => {
    return this.status;
  };

  static createBody = (
    objectOrError: object | string,
    description?: string,
    code?: number,
    status?: string
  ): object => {
    if (!objectOrError) {
      return { message: description, code: code, status: status };
    } else if (
      isObject(objectOrError) &&
      isObject(get(objectOrError, 'description'))
    ) {
      return {
        code: code,
        message: get(objectOrError, 'description'),
        status: status,
        error: description
      };
    } else if (objectOrError instanceof ZodError) {
      const zodError = JSON.parse(JSON.stringify(objectOrError));
      return {
        code: code,
        message: zodError.issues,
        status: status,
        error: description
      };
    }
    return isObject(objectOrError) && !Array.isArray(objectOrError)
      ? objectOrError
      : {
          code: code,
          message: objectOrError,
          status: status,
          error: description
        };
  };
}

export default HttpException;
