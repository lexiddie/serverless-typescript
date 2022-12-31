import { APIGatewayEvent } from 'aws-lambda';

export const sourceIpFromEvent = (event: APIGatewayEvent): string => {
  let user = 'NO_ID';
  if (event.requestContext && event.requestContext.identity) {
    user = event.requestContext.identity.sourceIp;
  }
  return user;
};
