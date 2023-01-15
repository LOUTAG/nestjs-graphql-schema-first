import { Entity, ObjectID, Column, ObjectIdColumn } from 'typeorm';
import * as GraphQLTypes from 'src/graphql-types';
@Entity()
export class Coffee implements GraphQLTypes.Coffee {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column({type: "json"})
    flavors: string[];
}
