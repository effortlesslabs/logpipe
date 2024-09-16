import { Resolvers } from "../@generated/resolvers-types";
import Space from "../database/space";
import Log from "../database/log";
import Profile from "../database/profile";
import sendMagicLink from "../utils/sendMagicLink";
import { withAuthGuard } from "../utils/auth";

export const Mutation: Resolvers = {
  Mutation: {
    async magicLink(_, { email }) {
      const randomCode = Math.random().toString(36).substring(2, 15);
      const profile = await Profile.findOne({ email });
      if (profile) {
        profile.authCode = randomCode;
        await profile.save();
      } else {
        await new Profile({ email, authCode: randomCode }).save();
      }
      await sendMagicLink({ to: email, authCode: randomCode });
      return true;
    },
    createSpace: withAuthGuard(async (profileId, { input }) => {
      const newInput = { ...input, profileId };
      const space = new Space(newInput);
      await space.save();
      return space;
    }),
    updateSpace: withAuthGuard(async (profileId, { id, input }) => {
      const space = await Space.findOne({ _id: id, profileId });
      if (!space) {
        throw new Error("Space not found");
      }
      space.set(input);
      await space.save();
      return space;
    }),

    deleteSpace: withAuthGuard(async (profileId, { id }) => {
      const space = await Space.findById(id);
      if (!space) {
        throw new Error("Space not found");
      }
      await Space.deleteOne({ _id: id, profileId });
      return space;
    }),

    createLog: withAuthGuard(async (profileId, { input }) => {
      const log = new Log({ ...input, profileId });
      await log.save();
      return log;
    }),

    generateApiKey: withAuthGuard(async (profileId, { input }) => {
      const key = Math.random().toString(36).substring(2, 15);
      const apiKey = { name: input.name, key: key };
      await Space.updateOne({ _id: input.spaceId, profileId }, { $push: { apiKeys: apiKey } });
      return apiKey;
    }),
  },
};
