import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany,JoinColumn } from 'typeorm';
import { Show } from './show.entity';
import { Theater } from './theater.entity';
import { Ticket } from './ticket.entity';
import { ScheduleSeat } from './scheduled-seat.entity';
import { join } from 'path';

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    scheduleId: number;

    @Column({type:'datatime'})
    showinData: Data;

    @ManyToOne(()=>Show,(show)=>show.schedules)
    @JoinColumn({name:'showId'})
    show:Show;

    @ManyToOne(()=>Theater,(Theater)=>Theater.schedule)
    @JoinColumn({name:theaterId})
    theater:Theater;

    @OneToMany(()=>Ticket,(ticket)=>ticket.schedule)
    tickets:Ticket[];

    @OneToMany(()=>ScheduledSeat,(scheduledSeat)=>scheduledSeat.schedule)
    scheduledSeats:ScheduleSeat[];

}