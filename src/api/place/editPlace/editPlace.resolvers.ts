import Place from "../../../entities/place";
import User from "../../../entities/user";
import {EditPlaceMutationArgs, EditPlaceResonse} from "../../../types/graph";
import {Resolvers} from "../../../types/resolver";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Mutation: {
        EditPlace: privateResolver(
            async (_, args: EditPlaceMutationArgs, {req})
                : Promise<EditPlaceResonse> => {
                const user: User = req.user;
                try {
                    // const place = await Place.findOne({id: args.placeId}, {relations: ["user"]});
                    const place = await Place.findOne({id: args.placeId});
                    if (place) {
                        if (place.userId === user.id) {
                            const notNull = cleanNullArgs(args);
                            await Place.update({id: args.placeId}, {...notNull});
                            return {
                                ok: true,
                                error: null,
                            }
                        } else {
                            return {
                                ok: false,
                                error: "not authorized"
                            }
                        }
                    } else {
                        return {
                            ok: false,
                            error: "place not found"
                        }
                    }

                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    }
                }

            }
        )
    }
};

export default resolvers;

