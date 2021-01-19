import { Exclude, Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import Insurance from '@modules/insurance/infra/typeorm/entities/Insurance';
import Cars from '@modules/cars/infra/typeorm/entities/Cars';

@Entity('rentals')
class Rentals{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  car_id: string;

  @ManyToOne(() => Cars)
  @JoinColumn({ name: 'car_id' })
  car: Cars;

  @Column()
  insurance_id: string;

  @ManyToOne(() => Insurance)
  @JoinColumn({ name: 'insurance_id' })
  insurance: Insurance;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  car_rental_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'car_rental_id' })
  car_rental: User;

  @Column()
  total_value: number;

  @Column()
  is_active: boolean;
  
  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Rentals;
