import Transport from "winston-transport";
import type { LogEntry } from "winston";

const query = `
    mutation CreateLog($input: LogInput!) {
      createLog(input: $input)
    }
`;

function createLog(
  url: string,
  apiKey: string,
  level: string,
  message: string
) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      query,
      variables: {
        input: {
          level,
          message,
        },
      },
    }),
  }).then((res) => res.json());
}

interface Options extends Transport.TransportStreamOptions {
  apiKey: string;
  uri: string;
}

class PipeTransport extends Transport {
  private apiKey;
  private uri;

  constructor(opts: Options) {
    super(opts);
    this.apiKey = opts.apiKey;
    this.uri = opts.uri;
  }

  log(info: LogEntry, next: () => void): void {
    setImmediate(() => {
      this.emit("logged", info);
    });

    createLog(this.uri, this.apiKey, info.level, info.message)
      .then(() => {
        next();
      })
      .catch((err) => {
        console.error(
          "error sending log to pipe. please check your uri and api key",
          err
        );
        next();
      });
  }
}

export default PipeTransport;
