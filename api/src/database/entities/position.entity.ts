import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany} from 'typeorm';
import { User } from './user.entity';
import {Post} from './post.entity';

@Entity('positions')
export class Position {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({ type: 'nvarchar', nullable: true })
    public position: string;

    @Column({ type: 'boolean', default: false })
    public isDeleted: boolean;

    @OneToMany( type => User, user => user.position)
    public users: Promise<User[]>;
}
