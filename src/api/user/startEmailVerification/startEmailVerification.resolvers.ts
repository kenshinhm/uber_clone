import User from "../../../entities/user";
import Verification from "../../../entities/verification";
import {StartEmailVerificationResponse} from "../../../types/graph";
import {Resolvers} from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";
import {sendVerificationEmail} from "../../../utils/sendEmail";

const resolvers: Resolvers = {
    Mutation: {
        StartEmailVerification: privateResolver(
            async (_, __, {req}): Promise<StartEmailVerificationResponse> => {
                const user: User = req.user;
                if (user.email && !user.verifiedEmail) {
                    try {
                        const oldVerification = await Verification.findOne({
                            payload: user.email
                        });
                        if (oldVerification) {
                            oldVerification.remove();
                        }
                        const newVerification = await Verification.create({
                            payload: user.email,
                            target: "EMAIL"
                        }).save();

                        await sendVerificationEmail(user.email, user.fullName, newVerification.key);

                        return {
                            ok: true,
                            error: null,
                        }
                    } catch (error) {
                        return {
                            ok: false,
                            error: error.message
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: "Your user has no email to verify"

                    }
                }
            })
    }
};

export default resolvers;
