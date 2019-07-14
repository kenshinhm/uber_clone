import { Resolvers } from "../../../types/resolver";
import User from "../../../entities/user";
import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse
} from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      console.log("here");

      const { facebookId } = args;

      // Find Existing User with FacebookId
      try {
        const existingUser = await User.findOne({ facebookId });
        if (existingUser) {
          // Return if User Found
          return {
            ok: true,
            error: null,
            token: "coming soon, existing"
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
      // End of Find Existing User with FacebookId

      // Create New User with FacebookId
      try {
        await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${facebookId}/picture?type=square`
        }).save();

        // Return with New User
        return {
          ok: true,
          error: null,
          token: "coming soon, new"
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
      // End of Create New User with FacebookId
    }
  }
};

export default resolvers;
