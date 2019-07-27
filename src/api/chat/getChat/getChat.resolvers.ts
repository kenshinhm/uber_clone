import Chat from "../../../entities/chat";
import User from "../../../entities/user";
import {GetChatQueryArgs, GetChatResponse} from "../../../types/graph";
import {Resolvers} from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Query: {
        GetChat: privateResolver(
            async (_, args: GetChatQueryArgs, {req})
                : Promise<GetChatResponse> => {
                const user: User = req.user;
                try {
                    const chat = await Chat.findOne({
                        id: args.chatId
                    }, {relations: ["messages"]});
                    if (chat) {
                        if (chat.passengerId === user.id || chat.driverId === user.id) {
                            return {
                                ok: true,
                                error: null,
                                chat
                            }
                        } else {
                            return {
                                ok: false,
                                error: "Not authorized",
                                chat
                            }
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Not found",
                            chat: null
                        }
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        chat: null
                    }
                }
            }
        )
    }
};

export default resolvers;