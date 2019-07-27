import {withFilter} from "graphql-yoga";
import User from "../../../entities/user";

const resolvers = {
    Subscription: {
        NearByRideSubscription: {
            subscribe: withFilter(
                (_, __, {pubSub}) => pubSub.asyncIterator("rideRequest"),
                async (payload, _, {context}) => {
                    const user: User = context.currentUser;
                    const {
                        NearByRideSubscription: {
                            pickUpLat,
                            pickUpLng,
                        }
                    } = payload;
                    const {lat: userLat, lng: userLng} = user;
                    return (
                        pickUpLat >= userLat - 0.05 &&
                        pickUpLat <= userLat + 0.05 &&
                        pickUpLng >= userLng - 0.05 &&
                        pickUpLng <= userLng + 0.05
                    )
                }
            )
        }
    }
};

export default resolvers;