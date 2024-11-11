import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Appointments } from "./Appointments";
import { Credential } from "./Credential";
import { Matches } from "class-validator";

@Entity({
  name: "users",
})
export class User {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({
    length: 100,
  })
  name: string;
  @Column()
  email: string;
  @Column()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha debe tener el formato YYYY-MM-DD",
  })
  birthdate: String;
  @Column()
  nDni: number;
  @Column({
    default: false,
  })
  confirmed: boolean;
  @OneToMany(() => Appointments, (appointment) => appointment.user)
  appointment?: Appointments[];

  @OneToOne(() => Credential, (credential) => credential.user)
  @JoinColumn({ name: "credentialId" })
  credentials: Credential;
}
