import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users") // Table name
export class User {
  @PrimaryGeneratedColumn() // Auto-incrementing primary key
  id: number;

  @Column({ unique: true }) // Unique username
  username: string;

  @Column({ unique: true }) // Unique email
  email: string;

  @Column() // Password column
  password: string;

  @Column({ default: false }) // Admin flag with default value false
  isAdmin: boolean;
}
