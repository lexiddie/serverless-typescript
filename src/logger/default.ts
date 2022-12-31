import { Context, APIGatewayEvent, SQSEvent } from 'aws-lambda';
import { get, isNull } from 'lodash';

import { DateTime, Settings } from 'luxon';

Settings.defaultZone = 'UTC+7';

import { sourceIpFromEvent } from '../utils/request-context.utils';
import { ulid } from 'ulid';

export const SEVERITY = {
  INFO: 'INFO',
  TRACE: 'TRACE',
  ERROR: 'ERROR',
  WARN: 'WARN',
  PERF: 'PERF',
  DEBUG: 'DEBUG'
};

const LOG_LEVEL_PRIORITY: { [key: string]: number } = {
  ERROR: 1,
  PERF: 2,
  WARN: 3,
  INFO: 4,
  DEBUG: 5,
  TRACE: 6
};

class Logger {
  defaultMeta: Record<string, string | number>;
  remoteIp: string;
  traceId: string;

  constructor(
    gatewayEvent: APIGatewayEvent | null,
    context: Context | null,
    correlationId: string | null = null,
    sqsEvent: SQSEvent | null = null
  ) {
    if (!isNull(gatewayEvent) && !isNull(context)) {
      const remoteIp = sourceIpFromEvent(gatewayEvent);
      correlationId =
        correlationId || get(gatewayEvent, 'headers.x-correlation-id', '');
      const traceId = get(gatewayEvent, 'headers.X-Amzn-Trace-Id', 'Unknown');
      this.defaultMeta = {
        service: context.functionName,
        functionName: context.functionName,
        requestId: context.awsRequestId,
        traceId: traceId,
        correlationId: correlationId || ulid(),
        remoteIp: remoteIp
      };
      this.remoteIp = remoteIp;
      this.traceId = traceId;
    } else if (!isNull(sqsEvent) && !isNull(context)) {
      const record = sqsEvent.Records[0];
      const body = JSON.parse(record.body);
      const correlationId = get(
        body,
        'correlationId',
        JSON.parse(body.Message).correlationId
      );
      const awsTraceHeader = get(record, 'attributes.AWSTraceHeader', null);
      const traceId = !isNull(awsTraceHeader)
        ? awsTraceHeader.split(';')[0]
        : 'Unknown';
      this.defaultMeta = {
        service: context.functionName,
        functionName: context.functionName,
        requestId: context.awsRequestId,
        traceId: traceId,
        correlationId: correlationId || ulid(),
        remoteIp: 'Unknown'
      };
      this.remoteIp = 'Unknown';
      this.traceId = traceId;
    }
  }

  getSourceIp = (): string => {
    return this.remoteIp;
  };

  getTraceId = (): string => {
    return this.traceId;
  };

  getCorrelationId = (): string => {
    const correlationId: string = get(
      this.defaultMeta,
      'correlationId',
      'Unknown'
    ) as string;
    return correlationId;
  };

  private format(level: string, message: string, rest: unknown): string {
    if (process.env.NODE_ENV !== 'production') {
      return `[${DateTime.local().toISO()}] [${level}] ${message} ${JSON.stringify(
        rest
      )} `;
    }

    return JSON.stringify(
      Object.assign({}, this.defaultMeta, rest, {
        ts: DateTime.local().toISO(),
        level: level,
        message: message
      })
    );
  }

  private write(severity: string, message: string): void {
    switch (severity) {
      case SEVERITY.INFO:
        console.info(message);
        break;
      case SEVERITY.WARN:
        console.warn(message);
        break;
      case SEVERITY.ERROR:
        console.error(message);
        break;
      default:
        console.log(message);
    }
  }

  private log(severity: string, message: string, ...args: unknown[]): void {
    let passedInSeverity = severity;
    if (!passedInSeverity) {
      passedInSeverity = SEVERITY.INFO;
    }
    const logLevel =
      process.env.LOG_LEVEL && process.env.LOG_LEVEL.toUpperCase();
    if (
      logLevel &&
      LOG_LEVEL_PRIORITY[logLevel] &&
      LOG_LEVEL_PRIORITY[logLevel] < LOG_LEVEL_PRIORITY[passedInSeverity]
    ) {
      return;
    }

    if (args !== null && args.length > 0) {
      if (typeof args[0] === 'object') {
        this.write(severity, this.format(severity, message, args[0]));
        return;
      } else {
        this.write(
          severity,
          this.format(severity, message, JSON.parse(JSON.stringify(args)))
        );
        return;
      }
    }

    this.write(severity, this.format(severity, message, null));
    return;
  }

  /**
   * logging with severity of debug
   * @param {string} message
   * @param {array} args
   */
  debug(message: string, ...args: unknown[]): void {
    this.log(SEVERITY.DEBUG, message, ...args);
  }

  /**
   * logging with severity of info
   * @param {string} message
   * @param {array} args
   */
  info(message: string, ...args: unknown[]): void {
    this.log(SEVERITY.INFO, message, ...args);
  }

  /**
   * logging with severity of warn
   * @param {string} message
   * @param {array} args
   */
  warn(message: string, ...args: unknown[]): void {
    this.log(SEVERITY.WARN, message, ...args);
  }

  /**
   * logging with severity of error
   * @param {string} message
   * @param {array} args
   */
  error(message: string, ...args: unknown[]): void {
    this.log(SEVERITY.ERROR, message, ...args);
  }
}

export default Logger;
