import { ProxyResult } from 'aws-lambda';

class Response {
  static json(
    statusCode: number,
    body: Record<string, unknown> | unknown | undefined = undefined
  ): ProxyResult {
    const response = {
      status: 200,
      message: 'Success',
      data: body
    };
    return {
      statusCode: statusCode,
      body: JSON.stringify(response),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
}

export default Response;
