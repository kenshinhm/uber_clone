import User from "../../../entities/user";
import {Resolvers} from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";
import {GetNearByDriversResponse} from "../../../types/graph";
import {Between, getRepository} from "typeorm";

const resolvers: Resolvers = {
    Query: {
        GetNearByDrivers: privateResolver(
            async (_, __, {req}): Promise<GetNearByDriversResponse> => {
                const user: User = req.user;
                const {lastLat, lastLng} = user;
                try {
                    const drivers: User[] = await getRepository(User).find({
                        isDriving: true,
                        lastLat: Between(lastLat - 0.05, lastLat + 0.05),
                        lastLng: Between(lastLng - 0.05, lastLng + 0.05),
                    });
                    return {
                        ok: true,
                        drivers,
                        error: null,
                    }
                } catch (error) {
                    return {
                        ok: false,
                        drivers: [],
                        error: error.message,
                    }
                }

            }
        )
    }
};

export default resolvers;