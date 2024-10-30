import { Schedule } from 'src/show/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

    @Entity('books')
    export class Book {
        @PrimaryGeneratedColumn({unsigned:true})
        bookId: number;
        
        @Column({unsigned:true})
        userId: number;

        @Column({unsigned:true})
        scheduleId: number;
    
        @CreateDateColumn()
        createdAt: Date;
      
        @UpdateDateColumn()
        updatedAt: Date;

      @ManyToOne((type):typeof User=>User,(user):Book[]=>user.books,{onDelete:'CASCADE'})
      user:User;

      @ManyToOne((type):typeof Schedule=>Schedule,{onDelete:'CASCADE'})
      schedule:Schedule;
    }