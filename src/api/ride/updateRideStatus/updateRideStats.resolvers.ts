import Ride from "../../../entities/ride";
import User from "../../../entities/user";
import {UpdateRideStatusMutationArgs, UpdateRideStatusResponse} from "../../../types/graph";
import {Resolvers} from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";
import Chat from "../../../entities/chat";

const resolvers: Resolvers = {
    Mutation: {
        UpdateRideStatus: privateResolver(
            async (_, args: UpdateRideStatusMutationArgs, {req, pubSub})
                : Promise<UpdateRideStatusResponse> => {
                const user: User = req.user;
                if (user.isDriving) {
                    try {
                        let ride: Ride | undefined;
                        if (args.status === "ACCEPTED") {
                            ride = await Ride.findOne({
                                id: args.rideId,
                                status: "REQUESTING"
                            }, {relations: ["passenger"]});
                            if (ride) {
                                // update ride
                                ride.driver = user;
                                // update user
                                user.isTaken = true;
                                await user.save();
                                // create chat
                                const chat = await Chat.create({
                                    driver: user,
                                    passenger: ride.passenger
                                }).save();
                                ride.chat = chat;
                                await chat.save();
                            }
                        } else {
                            ride = await Ride.findOne({
                                id: args.rideId,
                                driver: user
                            })
                        }
                        if (ride) {
                            ride.status = args.status;
                            await ride.save();
                            pubSub.publish("rideUpdate", {RideStatusSubscription: ride});
                            return {
                                ok: true,
                                error: null
                            }
                        } else {
                            return {
                                ok: false,
                                error: "Can't update ride"
                            }
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
                        error: "User is not driving"
                    }
                }
            }
        )
    }
};

export default resolvers;