import { describe, it, expect } from "@jest/globals";

import { createLogger } from "../lib/logger";

describe("LogPipe", () => {
  it("should create a new instance of LogPipe", () => {
    const logger = createLogger({
      level: "info",
      apiKey: "1234567890",
      uri: "http://localhost:3000",
    });
    logger.info("Hello, world!");
    expect(logger.transports.length).toBe(1);
  });
});
