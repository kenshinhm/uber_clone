import Chat from "./chat";
import User from "./user";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text"})
    text: string;

    @Column({nullable: true})
    chatId: number;

    @ManyToOne(type => Chat, chat => chat.messages)
    chat: Chat;

    @ManyToOne(type => User, user => user.messages)
    user: User;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}

export default Message;
