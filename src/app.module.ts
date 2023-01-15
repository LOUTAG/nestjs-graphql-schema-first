import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloDriverConfig } from '@nestjs/apollo/dist/interfaces';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mongodb',
      host:'localhost',
      port:27017,
      database:'nestjs-schema',
      synchronize: true,
      logging:false,
      entities:[
        __dirname + "/coffees/entities/*.js"
      ],
      useUnifiedTopology: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    typePaths: ['./**/*.graphql'],
  }), CoffeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
