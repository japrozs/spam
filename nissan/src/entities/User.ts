import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => [Post])
    @OneToMany(() => Post, (post) => post.creator)
    posts: Post[];

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column({ default: "light" })
    theme!: string;

    @Field()
    @Column({ default: false })
    confirmed!: boolean;

    @Field()
    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
