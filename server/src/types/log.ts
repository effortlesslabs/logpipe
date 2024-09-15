import { LogLevel } from "../@generated/resolvers-types";

export interface Log {
  id: string;
  spaceId: string;
  level: LogLevel;
  message: string;
  createdAt: string;
}
