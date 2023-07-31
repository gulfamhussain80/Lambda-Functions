// src/entities/NameAge.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'name_age' })
export class name_age {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' }) 
  name: string;

  @Column({ type: 'int' })
  age: number;
}
