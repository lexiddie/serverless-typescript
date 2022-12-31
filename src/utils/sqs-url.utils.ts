import { Context } from 'aws-lambda';
import { get } from 'lodash';

export const getSqsQueueUrl = (
  name: string,
  context: Context | null = null
): string => {
  const region = get(
    process,
    'env.AWS_REGION',
    context!.invokedFunctionArn.split(':')[3]
  );
  const accountId = get(
    process,
    'env.AWS_ACCOUNT_ID',
    context!.invokedFunctionArn.split(':')[4]
  );
  const queueUrl: string = `https://sqs.${region}.amazonaws.com/${accountId}/${name}`;
  return queueUrl;
};
