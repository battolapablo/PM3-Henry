import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Matches } from "class-validator";

@Entity({
  name: "appointments",
})
export class Appointments {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  date: String;
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha debe tener el formato YYYY-MM-DD",
  })
  @Column()
  time: string;
  @Column()
  reason: string;
  @Column()
  status: "Activo" | "Cancelado";
  userId: number;
  @ManyToOne(() => User, (user) => user.appointment)
  @JoinColumn()
  user: User;
}
