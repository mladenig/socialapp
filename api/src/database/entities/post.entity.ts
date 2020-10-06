import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Entity('posts')
export class Post {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('nvarchar', {length: 200})
    public title: string;

    @Column('nvarchar', {length: 2000})
    public description: string;

    @Column({ type: 'nvarchar', nullable: true })
    public img: string;

    @Column({ type: 'int', default: 0 })
    public allLikes: number;

    @Column({type: 'boolean', default: true})
    public isPublic: boolean;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: number;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: number;

    @ManyToOne(type => User, user => user.posts, { eager: true })
    public user: User;

    @OneToMany(type => Like, like => like.post, { eager: true })
    public likes: Like[];

    @OneToMany(type => Comment, comments => comments.post, { eager: true})
    public comments: Comment[];
}
