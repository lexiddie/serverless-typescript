import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { SHA256 } from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';

import ProductEntity from '../../product/entities/product.entity';

@Entity({ name: 'users' })
class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ select: true })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ProductEntity, (product) => product.user, { cascade: true })
  products: ProductEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword = (): void => {
    const hash = Base64.stringify(SHA256(this.password));
    console.log(`Before Insert`, hash);
    this.password = hash;
    console.log(`After Passport`, this.password);
  };

  public comparePassword = async (candidatePassword: string) => {
    const currentPassport = Base64.stringify(SHA256(candidatePassword));
    return this.password === currentPassport;
  };
}

export default UserEntity;
