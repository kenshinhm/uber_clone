import User from "../../../entities/user";
import {
    FacebookConnectMutationArgs,
    FacebookConnectResponse
} from "../../../types/graph";
import {Resolvers} from "../../../types/resolver";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
    Mutation: {
        FacebookConnect: async (
            _,
            args: FacebookConnectMutationArgs
        ): Promise<FacebookConnectResponse> => {

            const {facebookId} = args;

            // Find Existing User with FacebookId
            try {
                const existingUser = await User.findOne({facebookId});
                if (existingUser) {
                    // Return if User Found
                    const token = createJWT(existingUser.id);
                    return {
                        ok: true,
                        error: null,
                        token
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
                const newUser = await User.create({
                    ...args,
                    profilePhoto: `http://graph.facebook.com/${facebookId}/picture?type=square`
                }).save();

                const token = createJWT(newUser.id);

                // Return with New User
                return {
                    ok: true,
                    error: null,
                    token
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
