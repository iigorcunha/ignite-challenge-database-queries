import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Game } from './Game';

@Entity('genre')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  genre: string;

  @ManyToMany(() => Game, (game) => game.genres)
  @JoinTable()
  games: Game[];

  @CreateDateColumn()
  created_at: Date;
}