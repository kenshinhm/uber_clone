import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import User from "./user";

@Entity()
class Place extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text"})
    name: string;

    @Column({type: "double precision", default: 0})
    lat: number;

    @Column({type: "double precision", default: 0})
    lng: number;

    @Column({type: "text"})
    address: string;

    @Column({type: "boolean", default: false})
    isFav: boolean;

    // automatically saves id of user
    @Column({type: "int", nullable: true})
    userId: number;

    @ManyToOne(type => User, user => user.places)
    user: User;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}

export default Place;
