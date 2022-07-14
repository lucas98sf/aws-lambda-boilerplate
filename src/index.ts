import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

// import config from './config';

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
	console.log({ event, context });
	return 'testing';
};
