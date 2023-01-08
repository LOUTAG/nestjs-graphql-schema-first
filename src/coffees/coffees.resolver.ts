import { ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import * as GraphQLTypes from 'src/graphql-types';
import { CoffeesService } from './coffees.service';

@Resolver()
export class CoffeesResolver {
    constructor(private readonly coffeesService: CoffeesService){}
    @Query('coffees')
    async findAll():Promise<GraphQLTypes.Coffee[]>{
        return await this.coffeesService.findAll();
    }

    @Query('coffee')
    async findOne(@Args('id', ParseIntPipe ) id:number):Promise<GraphQLTypes.Coffee>{
        return await this.coffeesService.findOne(id);
    }

    @Mutation('createCoffee')
    async create(
        @Args('createCoffeeInput') createCoffeeInput:GraphQLTypes.CreateCoffeeInput,
    ):Promise<GraphQLTypes.Coffee>{
        return await this.coffeesService.create(createCoffeeInput);
    }


}
