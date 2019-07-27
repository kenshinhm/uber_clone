import {withFilter} from "graphql-yoga";
import User from "../../../entities/user";

const resolvers = {
    Subscription: {
        DriverSubscription: {
            subscribe: withFilter(
                (_, __, {pubSub}) => pubSub.asyncIterator("driverUpdate"),
                (payload, _, {context}) => {
                    const user: User = context.currentUser;
                    const {
                        DriverSubscription: {
                            lat: driverLat,
                            lng: driverLng,
                        }
                    } = payload;
                    const {lat: userLat, lng: userLng} = user;

                    return (
                        driverLat >= userLat - 0.05 &&
                        driverLat <= userLat + 0.05 &&
                        driverLng >= userLng - 0.05 &&
                        driverLng <= userLng + 0.05
                    )
                })
        }
    }
};

export default resolvers;