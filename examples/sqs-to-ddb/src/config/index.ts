import dotenv from 'dotenv';
dotenv.config();

const config = {
	AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
	AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
	DDB_TABLE_NAME: process.env.DDB_TABLE_NAME!,
	BITLY_ACCESS_TOKEN: process.env.BITLY_ACCESS_TOKEN!,
};

export default config;
