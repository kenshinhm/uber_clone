import {Between, getRepository} from "typeorm";
import User from "../../../entities/user";
import {GetNearByDriversResponse} from "../../../types/graph";
import {Resolvers} from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Query: {
        GetNearByDrivers: privateResolver(
            async (_, __, {req}): Promise<GetNearByDriversResponse> => {
                const user: User = req.user;
                const {lat, lng} = user;
                try {
                    const drivers: User[] = await getRepository(User).find({
                        isDriving: true,
                        lat: Between(lat - 0.05, lat + 0.05),
                        lng: Between(lng - 0.05, lng + 0.05),
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