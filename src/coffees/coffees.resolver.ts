import { ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import * as GraphQLTypes from 'src/graphql-types';
import { CoffeesService } from './coffees.service';
import mongoose from 'mongoose';

@Resolver()
export class CoffeesResolver {
    constructor(private readonly coffeesService: CoffeesService){}
    @Query('coffees')
    async findAll():Promise<GraphQLTypes.Coffee[]>{
        return await this.coffeesService.findAll();
    }

    @Query('coffee')
    async findOne(@Args('id') id:string):Promise<GraphQLTypes.Coffee>{
        return await this.coffeesService.findOne(id);
    }

    @Mutation('createCoffee')
    async create(
        @Args('createCoffeeInput') createCoffeeInput:GraphQLTypes.CreateCoffeeInput,
    ):Promise<GraphQLTypes.Coffee>{
        return await this.coffeesService.create(createCoffeeInput);
    }

    @Mutation('updateCoffee')
    async update(
        @Args('id') id:string, 
        @Args('updateCoffee') updateCoffeeInput:GraphQLTypes.UpdateCoffeeInput
    ):Promise<GraphQLTypes.Coffee>{
        return await this.coffeesService.update(id, updateCoffeeInput);
    }

    @Mutation('removeCoffee')
    async remove(
        @Args('id') id:string
    ):Promise<GraphQLTypes.Coffee>{
        return await this.coffeesService.remove(id);
    }


}
