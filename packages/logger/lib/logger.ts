import winston from "winston";
import PipeTransports from "./transports";

interface Options extends winston.LoggerOptions {
  apiKey: string;
  uri: string;
}

class LogPipe {
  private apiKey: string;
  public logger: winston.Logger;

  constructor(options: Options) {
    this.apiKey = options.apiKey;
    this.logger = winston.createLogger({
      format: winston.format.json(),
      defaultMeta: { apiKey: this.apiKey },
      transports: [
        new PipeTransports({
          level: options.level,
          apiKey: this.apiKey,
          uri: options.uri,
        }),
      ],
    });
  }
}

export function createLogger(option: Options) {
  const pipe = new LogPipe(option);
  return pipe.logger;
}
