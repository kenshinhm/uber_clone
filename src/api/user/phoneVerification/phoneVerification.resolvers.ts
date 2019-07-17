import { Resolvers } from "../../../types/resolver";
import { sendVerificationSMS } from "../../../utils/sendSMS";
import Verification from "../../../entities/verification";

import {
    PhoneVerificationMutationArgs,
    PhoneVerificationResponse
} from "../../../types/graph";

const resolvers: Resolvers = {
    Mutation: {
        PhoneVerification: async (
            _,
            args: PhoneVerificationMutationArgs
        ): Promise<PhoneVerificationResponse> => {
            try {
                const { phoneNumber } = args;
                const existingVerification = await Verification.findOne({
                    payload: phoneNumber
                });
                if (existingVerification) {
                    existingVerification.remove();
                }
                const newVerification = await Verification.create({
                    payload: phoneNumber,
                    target: "PHONE"
                }).save();
                // test
                console.log(newVerification);
                await sendVerificationSMS(
                    newVerification.payload,
                    newVerification.key
                );
                return {
                    ok: true,
                    error: null
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                };
            }
        }
    }
};

export default resolvers;
