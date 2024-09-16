import { describe, it, expect } from "@jest/globals";
import winston from "winston";
import PipeTransport from "../lib/transports";

const uri = process.env.LOGPIPE_URI || "http://localhost:4000";
const apiKey = process.env.LOGPIPE_API_KEY || "logpipe.v~PXMole5bBdTd1_mw~R";

describe("PipeTransport", () => {
  it("should create a new instance of PipeTransport", async () => {
    const logger = winston.createLogger({
      transports: [new PipeTransport({ level: "info", uri, apiKey })],
    });
    expect(logger.transports.length).toBe(1);
  });
});
