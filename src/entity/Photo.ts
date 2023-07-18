import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Peca } from "./Peca";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    size!: number

    @Column()
    name!: string

    @Column()
    precisao!: number

    @ManyToOne(() => Peca, (peca) => peca.photo)
    peca!: Peca
}