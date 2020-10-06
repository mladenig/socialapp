import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('comments')
export class Comment {

  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'nvarchar', nullable: true })
  public comment: string;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  @CreateDateColumn({type: 'timestamp'})
  public createdAt: number;

  // Comments to user relation;
  @ManyToOne( type => User, user => user.comments, { eager: true })
  public user: User;

  // Comments to post relation;
  @ManyToOne(type => Post, post => post.comments)
  public post: Promise<Post>;
}
