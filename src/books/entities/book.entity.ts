import { IsNotEmpty, IsNumber } from 'class-validator';
import { Schedule } from 'src/show/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

    @Entity('books')
    export class Book {
        @PrimaryGeneratedColumn({unsigned:true})
        bookId: number;
        
        @Column({unsigned:true})
        userId: number;

        /**
         * 공연회차 ID
         * @param 5
         */
        @IsNumber()
        @IsNotEmpty({message:'공연회차 ID를를 입력해 주세요.'})
        @Column({unsigned:true})
        scheduleId: number;
    
        @CreateDateColumn()
        createdAt: Date;
      
        @UpdateDateColumn()
        updatedAt: Date;

      @ManyToOne(() => User,(user) => user.books,{onDelete:'CASCADE'})
      user:User;

      @ManyToOne(() => Schedule, (schedule) => schedule.books, { onDelete: 'CASCADE' })
      schedule: Schedule;
    }
