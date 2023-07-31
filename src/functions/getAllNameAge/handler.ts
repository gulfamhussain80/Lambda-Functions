// src/functions/getAllNameAges.ts
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { NameAgeService } from 'src/services/nameAgeService';

const getAllNameAge = async (event) => {
  
  const service: NameAgeService = new NameAgeService()
  try {
    const res = await service.GetNameAge();
    return formatJSONResponse({
        message: "Test Response",
        body: res,
        event,
      });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error occurred: " + error.message }),
    };
  }
};

export const main = middyfy(getAllNameAge);

