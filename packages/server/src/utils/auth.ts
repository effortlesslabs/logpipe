import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import Space from "../database/space";
import { Context } from "../types/context";
const jwtSecret = process.env.JWT_SECRET_KEY as string;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET_KEY as string;

export const generateJwtToken = (id: string): string => {
  const jwtToken = jwt.sign({ id }, jwtSecret, { expiresIn: "24h" });
  return `JWT ${jwtToken}`;
};

export const generateRefreshJwtToken = (id: string): string => {
  const jwtToken = jwt.sign({ id }, jwtRefreshSecret, { expiresIn: "30 days" });
  return `JWT ${jwtToken}`;
};

const verifyJwtTokenUsingSecret = async (
  token: string,
  secret: string
): Promise<string | null> => {
  const verifyToken = token.substring(4);
  const decodedToken: Jwt = await jwt.verify(verifyToken, secret, {
    complete: true,
    ignoreExpiration: false,
  });

  const payload: JwtPayload = decodedToken.payload as JwtPayload;

  return payload.id;
};

export const verifyJwtToken = async (token: string): Promise<string | null> => {
  try {
    return await verifyJwtTokenUsingSecret(token, jwtSecret);
  } catch (err) {
    return null;
  }
};

export const verifyRefreshJwtToken = async (
  token: string
): Promise<string | null> => {
  try {
    return await verifyJwtTokenUsingSecret(token, jwtRefreshSecret);
  } catch (err) {
    return null;
  }
};

export const verifyApiKey = async (apiKey: string) => {
  const space = await Space.findOne({
    apiKeys: { $elemMatch: { key: apiKey } },
  });
  const result = {
    profileId: space ? space.profileId : null,
    spaceId: space ? space._id.toString() : null,
  };
  return result;
};

/**
 * Higher-order function that adds authentication guard to a given function.
 * The returned function checks if the user is authenticated before calling the original function.
 * If the user is not authenticated, it throws an AuthenticationError.
 *
 * @param functionToCall - The function to be guarded with authentication.
 * @returns A new function that includes the authentication guard.
 */
export function withAuthGuard<T, S, V>(
  functionToCall: (authContext: Context, args: S) => V
) {
  return function (_: T, args: S, context: Context) {
    if (!context.profileId) {
      if (!context.spaceId) {
        throw new Error("Please provide a valid API key");
      } else {
        throw new Error("Unauthorized");
      }
    }

    const authContext = {
      profileId: context.profileId,
      spaceId: context.spaceId,
    };

    return functionToCall(authContext, args);
  };
}
