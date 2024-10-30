import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('seats')
export class Schedule {
    @PrimaryGeneratedColumn()
    seatsId: number;

    @Column()
    scheduleId: number;

    @Column({unsigned:true})
    availableSeats: number;
    
    @Column({unsigned:true})
    totalSeats:number;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}