import { Exclude, Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, TableForeignKey, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import uploadConfig from '@config/upload';
import Adress from '@modules/adress/infra/typeorm/entities/Adress';

@Entity('users')
class User{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  cpf_cnpj: string;

  @Column()
  is_rental: boolean;

  @Column()
  adress_id: string;

  @ManyToOne(() => Adress)
  @JoinColumn({ name: 'adress_id' })
  adress: Adress;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "avatar_url"})
  getAvatar_url(): string | null {
    if (!this.avatar){
      return null;
    }

    switch(uploadConfig.driver){
      case 'diskStorage':
        return `${process.env.APP_BACKEND_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.avatar}`;
      default: 
        return null;
    }
  }
}

export default User;
