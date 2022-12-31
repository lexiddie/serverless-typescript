import { APIGatewayProxyEvent, ProxyResult } from 'aws-lambda';
import { get } from 'lodash';

export interface IExceptionResponse {
  code: number;
  message: object | string | Record<string, any>;
  status: string;
  error: string;
}

export interface ICustomExceptionResponse extends IExceptionResponse {
  timestamp: string;
  endpoint: string;
  method: string;
}

class MainException {
  public code: number;
  public message: object | string | Record<string, any>;
  public status: string;
  public error: string;
  public event: APIGatewayProxyEvent;

  constructor(
    objectOrError: object | string | Record<string, any>,
    event: APIGatewayProxyEvent
  ) {
    const code: number = get(objectOrError, 'code', 500);
    const message: object | string | Record<string, any> = get(
      objectOrError,
      'message',
      'Internal Server Error'
    );
    const status: string = get(
      objectOrError,
      'status',
      'INTERNAL_SERVER_ERROR'
    );
    const error: string = get(objectOrError, 'error', 'Error');
    this.status = status;
    this.message = message;
    this.code = code;
    this.error = error;
    this.event = event;
  }

  private getErrorResponse = (
    code: number,
    message: object | string | Record<string, any>,
    status: string,
    error: string,
    event: APIGatewayProxyEvent
  ): ICustomExceptionResponse => ({
    code: code,
    message: message,
    status: status,
    error: error,
    timestamp: new Date().toISOString(),
    endpoint: event.path,
    method: event.httpMethod
  });

  public response = (): ProxyResult => {
    const body = this.getErrorResponse(
      this.code,
      this.message,
      this.status,
      this.error,
      this.event
    );
    return {
      statusCode: this.code,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  };
}

export default MainException;
