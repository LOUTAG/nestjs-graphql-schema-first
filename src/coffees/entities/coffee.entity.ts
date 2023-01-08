import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Coffee as CoffeeGraphQLType } from 'src/graphql-types';
@Entity()
export class Coffee implements CoffeeGraphQLType {
    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column({type: "json"})
    flavors: string[];
}
