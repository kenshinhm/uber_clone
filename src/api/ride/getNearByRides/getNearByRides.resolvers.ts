import {Between, getRepository} from "typeorm";
import Ride from "../../../entities/ride";
import User from "../../../entities/user";
import {GetNearByRidesResponse} from "../../../types/graph";
import {Resolvers} from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Query: {
        GetNearByRides: privateResolver(
            async (_, __, {req}): Promise<GetNearByRidesResponse> => {
                const user: User = req.user;
                if (user.isDriving) {
                    const {lat, lng} = user;
                    try {
                        const rides = await getRepository(Ride).find({
                            status: "REQUESTING",
                            pickUpLat: Between(lat - 0.05, lat + 0.05),
                            pickUpLng: Between(lng - 0.05, lng + 0.05),
                        });
                        return {
                            ok: true,
                            error: null,
                            rides
                        }
                    } catch (error) {
                        return {
                            ok: false,
                            error: error.message,
                            rides: null
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: "You are not a driver",
                        rides: null
                    }
                }
            }
        )
    }
};

export default resolvers;
