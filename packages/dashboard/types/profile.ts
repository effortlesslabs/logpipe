export interface Profile {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface AuthResponse {
  profile: Profile;
  jwtToken: string;
  refreshJwtToken: string;
}
