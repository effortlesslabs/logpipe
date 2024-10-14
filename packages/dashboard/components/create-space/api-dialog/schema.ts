import { z } from "zod";

const CreateApiKeyFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  spaceId: z.string(),
});

export default CreateApiKeyFormSchema;
