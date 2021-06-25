import AWS from 'aws-sdk';

AWS.config.update( {region: 'us-east-1'} );

const dynamo = new AWS.DynamoDB({apiVersion: 'latest'});

const params: AWS.DynamoDB.CreateTableInput = {
	TableName: 'formTable',
	KeySchema: [
		{
			AttributeName: 'formId',
			KeyType: 'HASH'
		}
	],
	AttributeDefinitions: [
		{
			AttributeName: 'formId',
			AttributeType: 'S'
		},
		{
			AttributeName: 'username',
			AttributeType: 'S'
		}
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 3,
		WriteCapacityUnits: 3
	},
	StreamSpecification: {
		StreamEnabled: false
	},
	GlobalSecondaryIndexes: [
		{
			IndexName: 'username',
			KeySchema: [
				{
					AttributeName: 'username',
					KeyType: 'HASH'
				}
			],
			Projection: {
				ProjectionType: 'ALL'
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 2,
				WriteCapacityUnits: 2
			}
		}
	]
};

dynamo.createTable(params, (err, data) => {
	if(err) {
		console.log('error', err);
	} else {
		console.log('Table Created', data);
	}
})