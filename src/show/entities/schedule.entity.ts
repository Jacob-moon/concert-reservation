import { Entity,PrimaryGeneratedColumn,Column ,CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('schedules')
export class Schedule {
    @PrimaryGeneratedColumn()
    scheduleId: number;

    @Column()
    showId: number;

    @Column({type:'date'})
    date: Date;
    
    @Column({type:'time'})
    time:string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

}