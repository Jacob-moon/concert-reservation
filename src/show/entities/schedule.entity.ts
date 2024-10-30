import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany,JoinColumn } from 'typeorm';
import { Show } from '../../show/entities/show.entity';
import { Theater } from '../../show/entities/theater.entity';
import { Ticket } from '../../show/entities/ticket.entity';
import { ScheduledSeat } from '../../show/entities/scheduled-seat.entity';
import { IsDateString, IsNotEmpty } from 'class-validator';

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    scheduleId: number;

    @IsNotEmpty({message:'공연 시간과 날짜를 입력해 주세요.'})
    @IsDateString()
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