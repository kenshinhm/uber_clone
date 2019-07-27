import {Between, getRepository} from "typeorm";
import Ride from "../../../entities/ride";
import User from "../../../entities/user";
import {GetNearByRideResponse} from "../../../types/graph";
import {Resolvers} from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Query: {
        GetNearByRide: privateResolver(
            async (_, __, {req}): Promise<GetNearByRideResponse> => {
                const user: User = req.user;
                if (user.isDriving) {
                    const {lat, lng} = user;
                    try {
                        const ride = await getRepository(Ride).findOne({
                            status: "REQUESTING",
                            pickUpLat: Between(lat - 0.05, lat + 0.05),
                            pickUpLng: Between(lng - 0.05, lng + 0.05),
                        });
                        if (ride) {
                            return {
                                ok: true,
                                error: null,
                                ride
                            }
                        } else {
                            return {
                                ok: true,
                                error: "There is no ride",
                                ride: null
                            }
                        }
                    } catch (error) {
                        return {
                            ok: false,
                            error: error.message,
                            ride: null
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: "You are not a driver",
                        ride: null
                    }
                }
            }
        )
    }
};

export default resolvers;
