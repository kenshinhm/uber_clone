import {
    BaseEntity, Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import Message from "./message";
import User from "./user";

@Entity()
class Chat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Message, message => message.chat)
    messages: Message[];

    @Column({nullable: true})
    passengerId: number;

    @Column({nullable: true})
    driverId: number;

    @ManyToOne(type => User, user => user.chatsAsPassenger)
    passenger: User;

    @ManyToOne(type => User, user => user.chatsAsDriver)
    driver: User;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}

export default Chat;
