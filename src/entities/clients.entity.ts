import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contact } from "./contact.entity";
import { getRounds, hashSync } from "bcryptjs";

export enum ClientGender {
  MALE = "male",
  FEMALE = "female",
  NOBINARY = "no binary",
  DEFAULT = "I prefer not to say",
}

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 127 })
  name: string;

  @Column({ type: "varchar", length: 127, unique: true })
  email: string;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @Column({ type: "varchar", length: 45 })
  phone: string;

  @Column({ type: "text", nullable: true })
  image?: string | undefined | null;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  registerDate: Date;

  @Column({ type: "enum", enum: ClientGender, default: ClientGender.DEFAULT })
  gender: ClientGender;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }

  @OneToMany(() => Contact, (contact) => contact.client)
  contact: Contact[];
}
