import { Client } from "./clients.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

export enum ContactGender {
  MALE = "male",
  FEMALE = "female",
  NOBINARY = "Not binary",
  DEFAULT = "Not informed",
}

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 127 })
  fullName: string;

  @Column({ type: "varchar", length: 127 })
  email: string;

  @Column({ type: "varchar", length: 45 })
  phone: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  registerDate: Date;

  @Column({ type: "enum", enum: ContactGender, default: ContactGender.DEFAULT })
  gender: ContactGender;

  @ManyToOne(() => Client, (client) => client.contact)
  @JoinColumn()
  client: Client;
}
