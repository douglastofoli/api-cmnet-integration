import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import { Length } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity('users')
@Unique(['email'])
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public email: string;

  @Column()
  @Length(6, 32)
  public password: string;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;

  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordIsValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
