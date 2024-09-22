import { Resolvers } from "../@generated/resolvers-types";
import Space from "../database/space";
import Log from "../database/log";
import Profile from "../database/profile";
import {
  generateJwtToken,
  generateRefreshJwtToken,
  verifyMagicLinkToken,
  withAuthGuard,
} from "../utils/auth";

export const Query: Resolvers = {
  Query: {
    async validateMagicLink(_, { code }) {
      const email = await verifyMagicLinkToken(code);
      if (!email) {
        throw new Error("Invalid link or link has expired");
      }
      const profile = await Profile.findOne({ email });
      if (!profile) {
        throw new Error("Profile not found");
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
      return await Log.find({ profileId }).sort({ createdAt: -1 }).limit(100);
    }),
  },
};
