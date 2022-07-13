import { APIGatewayProxyHandler } from 'aws-lambda';

import config from './config';

export const handler: APIGatewayProxyHandler = async event => {
	try {
		return { statusCode: 204, body: JSON.stringify(event) };
	} catch (err) {
		return { statusCode: 500, body: JSON.stringify(err) };
	}
};
