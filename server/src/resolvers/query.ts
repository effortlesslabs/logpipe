import { Resolvers } from "../@generated/resolvers-types";
import Space from "../database/space";
import Log from "../database/log";
import Profile from "../database/profile";
import { generateJwtToken, generateRefreshJwtToken } from "../utils/auth";

export const Query: Resolvers = {
  Query: {
    async validateMagicLink(_, { code }) {
      const profile = await Profile.findOne({ authCode: code });
      if (!profile) {
        throw new Error("Invalid code");
      }

      const jwtToken = await generateJwtToken(profile._id.toString());
      const refreshJwtToken = await generateRefreshJwtToken(profile._id.toString());
      return {
        profile,
        jwtToken,
        refreshJwtToken,
      };
    },
    async spaces() {
      return await Space.find();
    },
    async space(_, { id }) {
      return await Space.findById(id);
    },
    async logs(_, { spaceId }) {
      return await Log.find({ spaceId });
    },
  },
};
