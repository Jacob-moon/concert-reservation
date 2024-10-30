import { Entity,PrimaryGeneratedColumn,Column ,CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { Show } from './show.entity';
import { Seat } from './seat.entity';


@Entity('schedules')
export class Schedule {
    @PrimaryGeneratedColumn({unsigned:true})
    scheduleId: number;

    @Column({unsigned:true})
    showId: number;

    @Column({type:'date'})
    date: Date;
    
    @Column({type:'time'})
    time:string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne((type):typeof Show=>Show,(show):Schedule[]=>show.schedules,{onDelete:'CASCADE'})
    show:Show;
    
    @OneToOne((type):typeof Seat=>Seat,(seat)=>seat.schedule)
    seat:Seat;
}