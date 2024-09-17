# LogPipe

**LogPipe** is a custom logging transport for [winston](https://github.com/winstonjs/winston) that sends log entries to a specified URI using an API key. This package provides a seamless way to integrate logging with any service that accepts logs via an HTTP request.

## Features

- Supports multiple log levels (`info`, `error`, `debug`, etc.).
- Sends logs to a configurable URI using a GraphQL mutation.
- Easily integrates with your existing `winston` loggers.
- Simple configuration for API key and endpoint.

## Installation

To install the package, run:

```bash
npm install @logpipe/logger
```

## Usage

### 1. Basic Setup

You can easily integrate the `PipeTransport` into a `winston` logger. Below is an example configuration:

```javascript
import winston from "winston";
import PipeTransport from "@logpipe/logger";

const logger = winston.createLogger({
  transports: [
    new PipeTransport({
      level: "info", // Log level
      apiKey: "your-api-key", // Your API key
      uri: "https://your-log-endpoint.com", // Your log server URI
    }),
  ],
});

logger.info("This is an info message");
```

### 2. Advanced Setup Using `createLogger`

Alternatively, you can use the `createLogger` method, which simplifies the logger creation process:

```javascript
import { createLogger } from "@logpipe/logger";

const logger = createLogger({
  level: "info",
  apiKey: "your-api-key",
  uri: "https://your-log-endpoint.com",
});

logger.info("Hello, LogPipe!");
```

### 3. Environment Variables (Optional)

You can also configure the logger using environment variables:

```bash
LOGPIPE_URI="https://your-log-endpoint.com"
LOGPIPE_API_KEY="your-api-key"
```

Then, use the logger without hardcoding API keys and URIs:

```javascript
const logger = createLogger({
  level: "info",
  uri: process.env.LOGPIPE_URI,
  apiKey: process.env.LOGPIPE_API_KEY,
});

logger.error("An error occurred");
```

## Testing

To run the tests, make sure to set your `LOGPIPE_URI` and `LOGPIPE_API_KEY` environment variables, then run:

```bash
npm test
```

Example Jest test:

```javascript
import winston from "winston";
import PipeTransport from "@yourorg/logpipe";

describe("PipeTransport", () => {
  it("should create a new instance of PipeTransport", () => {
    const logger = winston.createLogger({
      transports: [
        new PipeTransport({
          level: "info",
          uri: "http://localhost:4000",
          apiKey: "your-api-key",
        }),
      ],
    });

    logger.info("Log message");
    expect(logger.transports.length).toBe(1);
  });
});
```

## API

### `createLogger(options)`

- **options.level**: The log level to capture.
- **options.apiKey**: Your API key for authenticating log requests.
- **options.uri**: The URI endpoint to which logs should be sent.

### `PipeTransport`

A custom `winston` transport that sends log entries to a remote URI.

### Example:

```javascript
new PipeTransport({
  level: "info",
  apiKey: "your-api-key",
  uri: "https://your-log-endpoint.com",
});
```

## License

This project is licensed under the MIT License.
