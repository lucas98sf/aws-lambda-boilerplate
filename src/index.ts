import { APIGatewayProxyHandler } from 'aws-lambda';
import httpStatus from 'http-status';

import logger from '@/logger';

// import config from './config';

export const handler: APIGatewayProxyHandler = async event => {
	try {
		const result = { statusCode: httpStatus.OK, body: event.body! };

		logger.debug(JSON.stringify(result));

		return result;
	} catch (err) {
		logger.error(err);
		throw err;
	}
};
