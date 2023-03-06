import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import SQS, { SendMessageRequest } from 'aws-sdk/clients/sqs';

import config from './config';

const isValidUrl = (url: string) => {
	const regex =
		/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
	return regex.test(url);
};

const sqs = new SQS({
	apiVersion: '2012-11-05',
	region: 'us-east-1',
	credentials: {
		accessKeyId: config.AWS_ACCESS_KEY_ID,
		secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
	},
});

export const handler: APIGatewayProxyHandlerV2 = async event => {
	const url = event.body!;
	if (!url) return serializeResponse('No URL provided', 400);
	if (!isValidUrl(url)) return serializeResponse('Invalid URL', 400);

	const params: SendMessageRequest = {
		MessageBody: url,
		QueueUrl: config.SQS_QUEUE_URL,
	};

	const sendMessageResult = await sqs.sendMessage(params).promise();

	return serializeResponse(sendMessageResult);
};

const serializeResponse = (result: unknown, statusCode = 200) => ({
	statusCode,
	body: JSON.stringify(result, null, 2),
});
