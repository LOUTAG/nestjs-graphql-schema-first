import { Injectable } from '@nestjs/common';
import * as GraphQLTypes from 'src/graphql-types';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Coffee } from './entities/coffee.entity';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>
    ){}
    async findAll():Promise<Coffee[]>{
        return await this.coffeeRepository.find();
    }

    async findOne(id:string):Promise<Coffee>{
        const coffee = await this.coffeeRepository.findOne({where:{_id:id}});
        if (!coffee){
            throw new UserInputError(`Coffee #${id} does not exist`)
        }
        return coffee;
    }

    async create(createCoffeeInput:GraphQLTypes.CreateCoffeeInput):Promise<Coffee>{
        const coffee = this.coffeeRepository.create();
        coffee.name= createCoffeeInput.name;
        coffee.brand = createCoffeeInput.brand;
        coffee.flavors = createCoffeeInput.flavors;
        return this.coffeeRepository.save(coffee);
    }
    async update(id:string, updateCoffeeInput:GraphQLTypes.UpdateCoffeeInput):Promise<Coffee>{
        const coffee = await this.coffeeRepository.preload({_id:id, ...updateCoffeeInput});
        if(!coffee){
            throw new UserInputError(`Coffee #${id} does not exist`);
        }
        return coffee;
    }

    async remove(id:string):Promise<GraphQLTypes.Coffee>{

        const coffee = await this.coffeeRepository.findOne({where:{_id:id}});
        if(!coffee){
            throw new UserInputError(`Coffee #${id} does not exist`);
        }
        return coffee;
    }
}
