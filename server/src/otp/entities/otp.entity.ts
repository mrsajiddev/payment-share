import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/users/user.entity";

@Entity("otps")
export class Otp {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    otp_hash: string; // store hashed OTP

    @Column({ type: "timestamp" })
    expires_at: Date;

    @Column({ default: 0 })
    attempts: number;

    @Column({ default: false })
    used: boolean; 

    @Column({ type: "enum", enum: ["email", "sms"], default: "email" })
    channel: "email" | "sms"; 

    @CreateDateColumn({ name: "created_at" })
    created_at: Date;
}
