import { z } from "zod";

const ApiKeyFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  spaceId: z.string(),
});

export default ApiKeyFormSchema;
