import { APIGatewayProxyHandler } from 'aws-lambda';

import logger from '@/logger';

// import config from './config';

export const handler: APIGatewayProxyHandler = async event => {
	try {
		const result = { statusCode: 204, body: event.body! };

		logger.info(JSON.stringify(result));

		return result;
	} catch (err) {
		logger.error(err);
		return { statusCode: 500, body: JSON.stringify(err) };
	}
};
