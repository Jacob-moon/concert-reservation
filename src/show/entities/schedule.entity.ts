import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany,JoinColumn } from 'typeorm';
import { Show } from './show.entity';
import { Theater } from './theater.entity';
import { Ticket } from './ticket.entity';
import { ScheduledSeat } from './scheduled-seat.entity';

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    scheduleId: number;

    @Column({type:'timestamp'})
    showinData: Date;

    @ManyToOne(()=>Show,(show)=>show.schedules)
    @JoinColumn({name:'showId'})
    show:Show;

    @ManyToOne(()=>Theater,(Theater)=>Theater.schedules)
    @JoinColumn({name:'theaterId'})
    theater:Theater;

    @OneToMany(()=>Ticket,(ticket)=>ticket.schedule)
    tickets:Ticket[];

    @OneToMany(()=>ScheduledSeat,(scheduledSeat)=>scheduledSeat.schedule)
    scheduledSeats:ScheduledSeat[];

}