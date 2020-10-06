import { UserRoles } from '../../common/enums/user-roles';
import {
  Entity,
  Column,
  OneToMany,
  JoinTable,
  ManyToMany,
  RelationCount,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn, ManyToOne,
} from 'typeorm';
import { Post } from './post.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
import {Length} from 'class-validator';
import {Position} from './position.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column('nvarchar', { nullable: false })
  @Length(5, 20)
  public username: string;

  @Column({type: 'nvarchar', nullable: false})
  @Length(5, 20)
  public password: string;

  @Column({ type: 'nvarchar', nullable: false})
  @Length(5, 20)
  public email: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.Basic})
  public role: UserRoles;

  @Column({ type: 'nvarchar', nullable: true, length: 50})
  @Length(0, 2000)
  public bio: string;

  @Column({ type: 'nvarchar', nullable: true})
  @Length(26, 200)
  public profilePic: string;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: number;

  @ManyToOne( type => Position, position => position.users, { eager: true })
  public position: Position;

  @OneToMany( type => Post, post => post.user)
  public posts: Post[];

  @OneToMany(type => Like, like => like.user)
  public likes: Promise<Like[]>;

  @ManyToMany(type => User, user => user.following)
  @JoinTable()
  followers: User[];

  @ManyToMany(type => User, user => user.followers)
  following: User[];

  @RelationCount((user: User) => user.followers)
  followersCount: number;

  @RelationCount((user: User) => user.following)
  followingCount: number;

  @OneToMany(type => Comment, comment => comment.user)
  public comments: Promise<Comment[]>;
}
