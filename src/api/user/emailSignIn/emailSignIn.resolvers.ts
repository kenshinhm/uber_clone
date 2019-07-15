import { Resolvers } from "../../../types/resolver";
import User from "../../../entities/user";
import { EmailSignInMutationArgs, EmailSignInResponse } from "src/types/graph";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        // check user with email
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            error: "no user with email",
            token: null
          };
        }
        // check password
        const checkPassword = await user.comparePassword(password);
        if (checkPassword) {
          return {
            ok: true,
            error: null,
            token: "coming soon"
          };
        } else {
          return {
            ok: false,
            error: "wrong password",
            token: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
