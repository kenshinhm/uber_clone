import User from "../../../entities/user";
import Verification from "../../../entities/verification";
import { Resolvers } from "../../../types/resolver";
import {
    CompletePhoneVerificationMutationArgs,
    CompletePhoneVerificationResponse
} from "../../../types/graph";

const resolvers: Resolvers = {
    Mutation: {
        CompletePhoneVerification: async (
            _,
            args: CompletePhoneVerificationMutationArgs
        ): Promise<CompletePhoneVerificationResponse> => {
            const { phoneNumber, key } = args;
            // Find Verification and return if is not found
            try {
                const verification = await Verification.findOne({
                    payload: phoneNumber,
                    key
                });
                if (!verification) {
                    return {
                        ok: false,
                        error: "Verification key not valid",
                        token: null
                    };
                } else {
                    verification.verified = true;
                    verification.save();
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }
            // Find User that matches verification
            try {
                const user = await User.findOne({ phoneNumber });
                if (user) {
                    user.verifiedPhoneNumber = true;
                    user.save();
                    return {
                        ok: true,
                        error: null,
                        token: "Coming Soon"
                    };
                } else {
                    return {
                        ok: true,
                        error: null,
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
