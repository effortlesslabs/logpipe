import { describe, it, expect } from "@jest/globals";

import { createLogger } from "../lib/logger";

const uri = process.env.LOGPIPE_URI || "http://localhost:4000";
const apiKey = process.env.LOGPIPE_API_KEY || "logpipe.v~PXMole5bBdTd1_mw~R";

describe("LogPipe", () => {
  it("should create a new instance of LogPipe", () => {
    const logger = createLogger({
      level: "info",
      uri,
      apiKey,
    });
    logger.info("Hello, world!");
    expect(logger.transports.length).toBe(1);
  });
});
