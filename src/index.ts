import { APIGatewayProxyHandler } from 'aws-lambda';
import httpStatus from 'http-status';

import logger from '@/logger';

// import config from './config';

export const handler: APIGatewayProxyHandler = async event => {
	const result = {
		statusCode: httpStatus.OK,
		body: event.body!,
		headers: { 'Content-Type': 'application/json' },
	};

	logger.debug(JSON.stringify(result));
	return result;
};
