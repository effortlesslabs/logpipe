import { Resolvers } from "../@generated/resolvers-types";
import Space from "../database/space";
import Log from "../database/log";
import Profile from "../database/profile";
import {
  generateJwtToken,
  generateRefreshJwtToken,
  withAuthGuard,
} from "../utils/auth";

export const Query: Resolvers = {
  Query: {
    async validateMagicLink(_, { code }) {
      const profile = await Profile.findOne({ authCode: code });
      if (!profile) {
        throw new Error("Invalid code");
      }

      const jwtToken = await generateJwtToken(profile._id.toString());
      const refreshJwtToken = await generateRefreshJwtToken(
        profile._id.toString()
      );
      return {
        profile,
        jwtToken,
        refreshJwtToken,
      };
    },

    profile: withAuthGuard(async ({ profileId }) => {
      return await Profile.findOne({ _id: profileId });
    }),

    spaces: withAuthGuard(async ({ profileId }) => {
      return await Space.find({ profileId });
    }),

    space: withAuthGuard(async ({ profileId }, { id }) => {
      return await Space.findOne({ _id: id, profileId });
    }),

    logs: withAuthGuard(async ({ profileId }) => {
      return await Log.find({ profileId });
    }),
  },
};
