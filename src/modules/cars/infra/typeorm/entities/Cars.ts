import { Exclude, Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('cars')
class Cars{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  image: string;

  @Column()
  daily_value: number;
  
  @Column()
  category: string;
  
  @Column()
  type: string;
  
  @Column()
  fuel: string;
  
  @Column()
  horsepower: number;

  @Column()
  engine: string;
  
  @Column()
  transmission: string;
  
  @Column()
  quantity: number;

  @Column()
  rental_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'rental_id' })
  rental: User;
  
  @Column()
  color: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "car_image_url"})
  getAvatar_url(): string | null {
    if (!this.image){
      return null;
    }

    switch(uploadConfig.driver){
      case 'diskStorage':
        return `${process.env.APP_BACKEND_URL}/files/${this.image}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.image}`;
      default: 
        return null;
    }
  }
}

export default Cars;
