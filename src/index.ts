import { APIGatewayProxyHandler } from 'aws-lambda';

import logger from '@/logger';

// import config from './config';

export const handler: APIGatewayProxyHandler = async event => {
	const result = {
		statusCode: 200,
		body: event.body!,
		headers: { 'Content-Type': 'application/json' },
	};

	logger.debug(JSON.stringify(result));
	return result;
};
