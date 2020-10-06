import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('likes')
export class Like {
@PrimaryGeneratedColumn('increment')
public id: number;

@Column({type: 'boolean'})
public liked: boolean;

@ManyToOne(type => Post, post => post.likes)
public post: Promise <Post>;

@ManyToOne(type => User, user => user.likes)
public user: Promise<User>;
}
