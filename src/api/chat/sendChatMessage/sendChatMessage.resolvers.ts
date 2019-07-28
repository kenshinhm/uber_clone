import Chat from "../../../entities/chat";
import Message from "../../../entities/message";
import User from "../../../entities/user";
import {SendChatMessageMutationArgs, SendChatMessageResponse} from "../../../types/graph";
import {Resolvers} from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Mutation: {
        SendChatMessage: privateResolver(
            async (_, args: SendChatMessageMutationArgs, {req})
                : Promise<SendChatMessageResponse> => {
                const user: User = req.user;
                try {
                    const chat = await Chat.findOne({id: args.chatId});
                    // check chat
                    if (!chat) {
                        return {
                            ok: false,
                            error: "chat is not found for this message",
                            message: null,
                        }
                    }
                    // check authorization
                    if (!(chat.passengerId === user.id || chat.driverId === user.id)) {
                        return {
                            ok: false,
                            error: "unauthorized",
                            message: null,
                        }
                    }
                    const message = await Message.create({
                        text: args.text,
                        chat,
                        user
                    }).save();
                    return {
                        ok: true,
                        error: null,
                        message
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        message: null
                    }
                }
            }
        )
    }
};

export default resolvers;