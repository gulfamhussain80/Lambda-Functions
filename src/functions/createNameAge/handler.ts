// src/functions/createNameAge.ts
import 'reflect-metadata';
import schema from './schema';
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from '@libs/lambda';
import { NameAgeService } from 'src/services/nameAgeService';

const createNameAge : ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    
    const service: NameAgeService = new NameAgeService()
    const name = event.body.name;
    const age = event.body.age;
  
  if (!name || !age) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid input data" }),
    };
  }

  try {
    const res = await service.AddNameAge({name, age})
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error occurred: " + error.message }),
    };
  }
};

export const main = middyfy(createNameAge);
