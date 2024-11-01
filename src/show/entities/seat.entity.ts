import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('seats')
export class Seat {
    @PrimaryGeneratedColumn({unsigned:true})
    seatsId: number;

    @Column({unsigned:true})
    scheduleId: number;

    @Column({unsigned:true})
    availableSeats: number;

    @Column({type:'boolean', nullable:false,default:false })
    isAvailable: boolean;
    
    @Column({unsigned:true})
    totalSeats:number;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne((type):typeof Schedule=>Schedule,(schedule)=>schedule.seat)
    @JoinColumn({ name: 'scheduleId' })    
    schedule:Schedule;
}