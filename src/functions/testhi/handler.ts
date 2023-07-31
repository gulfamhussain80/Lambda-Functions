import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const testhi = async (event) => {
  return formatJSONResponse({
    message: "Test Response",
    event,
  });
};

export const main = middyfy(testhi);
