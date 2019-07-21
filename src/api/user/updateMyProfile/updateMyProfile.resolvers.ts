import {Resolvers} from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";
import {UpdateMyProfileMutationArgs} from "../../../types/graph";
import User from "../../../entities/user";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
    Mutation: {
        UpdateMyProfile: privateResolver(
            async (_, args: UpdateMyProfileMutationArgs, {req}) => {
                // only get not null args
                const user: User = req.user;
                const notNull: any = cleanNullArgs(args);

                if (notNull.password !== null) {
                    user.password = notNull.password;
                    await user.save();
                    delete notNull.password
                }
                // update user
                try {

                    await User.update({id: user.id}, {...notNull});
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
            })
    }
};

export default resolvers;