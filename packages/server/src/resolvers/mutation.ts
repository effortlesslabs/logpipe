import { generateApiKey } from "generate-api-key";
import { Resolvers } from "../@generated/resolvers-types";
import Space from "../database/space";
import Log from "../database/log";
import Profile from "../database/profile";
import sendMagicLink from "../utils/sendMagicLink";
import { generateMagicLinkToken, withAuthGuard } from "../utils/auth";

export const Mutation: Resolvers = {
  Mutation: {
    async magicLink(_, { email }) {
      const profile = await Profile.findOne({ email });

      if (profile) {
        await profile.save();
      } else {
        await new Profile({
          name: "Anonymous",
          email,
        }).save();
      }
      const authCode = await generateMagicLinkToken(email);
      await sendMagicLink({ to: email, authCode: authCode });
      return true;
    },
    createSpace: withAuthGuard(async ({ profileId }, { input }) => {
      const newInput = { ...input, profileId };
      const space = new Space(newInput);
      await space.save();
      return space;
    }),
    updateSpace: withAuthGuard(async ({ profileId }, { id, input }) => {
      const space = await Space.findOne({ _id: id, profileId });
      if (!space) {
        throw new Error("Space not found");
      }
      space.set(input);
      await space.save();
      return space;
    }),

    deleteSpace: withAuthGuard(async ({ profileId }, { id }) => {
      const space = await Space.findById(id);
      if (!space) {
        throw new Error("Space not found");
      }
      await Space.deleteOne({ _id: id, profileId });
      return space;
    }),

    createLog: withAuthGuard(async ({ profileId, spaceId }, { input }) => {
      const log = new Log({ ...input, spaceId, profileId });
      await log.save();
      return true;
    }),

    generateApiKey: withAuthGuard(async ({ profileId }, { input }) => {
      const key = generateApiKey({ length: 20, prefix: "logpipe" }).toString();
      const apiKey = { name: input.name, key: key };
      await Space.updateOne(
        { _id: input.spaceId, profileId },
        { $push: { apiKeys: apiKey } }
      );
      return apiKey;
    }),
  },
};
