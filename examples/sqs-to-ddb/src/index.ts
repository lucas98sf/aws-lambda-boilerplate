import { SQSHandler } from 'aws-lambda';
import DDB from 'aws-sdk/clients/dynamodb';
import axios from 'axios';
import { v4 } from 'uuid';

import config from './config';

const ddb = new DDB({
	apiVersion: '2012-08-10',
	region: 'us-east-1',
	credentials: {
		accessKeyId: config.AWS_ACCESS_KEY_ID,
		secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
	},
});

const shortenUrl = async (url: string): Promise<string> => {
	const { data } = await axios.post(
		'https://api-ssl.bitly.com/v4/shorten',
		{
			domain: 'bit.ly',
			long_url: url,
		},
		{
			headers: {
				Authorization: `Bearer ${config.BITLY_ACCESS_TOKEN}`,
			},
		}
	);
	return data.link;
};

export const handler: SQSHandler = async event => {
	for await (const { body } of event.Records) {
		console.log(`Received SQS message: '${body}'`);

		const shortenedUrl = await shortenUrl(body);

		console.log(`Shortened URL: '${shortenedUrl}'`);

		const Item = {
			id: { S: v4() },
			url: { S: shortenedUrl },
			created_at: { S: new Date().toISOString() },
		};

		await ddb
			.putItem({
				TableName: config.DDB_TABLE_NAME,
				Item,
			})
			.promise();

		console.log('Added item to DynamoDB');
	}
};
