interface ApiKey {
  _id: string;
  name: string;
  key: string;
}

export interface Space {
  id: string;
  name: string;
  schema: string;
  description?: string;
  apiKeys: ApiKey[];
  profileId: string;
  createdAt: string;
  updatedAt: string;
}
