import { describe, it, expect } from "@jest/globals";
import winston from "winston";
import PipeTransport from "../lib/transports";

const uri = "http://localhost:3000";
const apiKey = "1234567890";

describe("PipeTransport", () => {
  it("should create a new instance of PipeTransport", () => {
    const logger = winston.createLogger({
      transports: [new PipeTransport({ level: "info", uri, apiKey })],
    });
    logger.info("Hello, world!");
    expect(logger.transports.length).toBe(1);
  });
});
