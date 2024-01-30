import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    discordId: string

    @Column()
    discordUsername: string

    @Column()
    gillAmount: number

    @Column({
        nullable: true
    })
    lastDaily: Date
}
