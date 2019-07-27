import Ride from "../../../entities/ride";
import User from "../../../entities/user";
import {RequestRideMutationArgs, RequestRideResponse} from "../../../types/graph";
import {Resolvers} from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Mutation: {
        RequestRide: privateResolver(
            async (_, args: RequestRideMutationArgs, {req, pubSub})
                : Promise<RequestRideResponse> => {
                const user: User = req.user;
                if (!user.isRiding) {
                    try {
                        const ride = await Ride.create({
                            ...args,
                            status: "REQUESTING",
                            passenger: user
                        }).save();
                        pubSub.publish("rideRequest", {NearByRideSubscription: ride});
                        user.isRiding = true;
                        await user.save();
                        return {
                            ok: true,
                            error: null,
                            ride
                        }
                    } catch (error) {
                        return {
                            ok: false,
                            error: error.message,
                            ride: null,
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: 'You are already riding!',
                        ride: null,
                    }
                }
            })
    }
};

export default resolvers;