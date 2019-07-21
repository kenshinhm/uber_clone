import Place from "../../../entities/place";
import User from "../../../entities/user";
import {AddPlaceMutationArgs, AddPlaceResonse} from "../../../types/graph";
import {Resolvers} from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Mutation: {
        AddPlace: privateResolver(
            async (_, args: AddPlaceMutationArgs, {req})
                : Promise<AddPlaceResonse> => {
                const user: User = req.user;
                try {
                    await Place.create({...args, user}).save();
                    return {
                        ok: true,
                        error: null
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