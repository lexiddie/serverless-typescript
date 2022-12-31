import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  Generated,
  JoinColumn
} from 'typeorm';
import UserEntity from '../../user/entities/user.entity';

@Entity({ name: 'products' })
class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  productId: string;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('double')
  price: number;

  @Column({ type: 'json', default: null })
  metadata: string;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}

export default ProductEntity;
