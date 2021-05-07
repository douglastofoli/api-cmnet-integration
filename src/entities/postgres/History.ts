import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import { Length } from 'class-validator';

import User from './User';

@Entity('histories')
export default class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public history: string;

  @ManyToOne(() => User, (user) => user.histories)
  user: User;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}
