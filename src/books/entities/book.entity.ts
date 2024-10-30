import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

    @Entity('books')
    export class Book {
        @PrimaryGeneratedColumn()
        bookId: number;
        
        @Column()
        userId: number;

        @Column()
        scheduleId: number;
    
        @CreateDateColumn()
        createdAt: Date;
      
        @UpdateDateColumn()
        updatedAt: Date;
    }


