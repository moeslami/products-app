const AWS = require('aws-sdk');

const dynamoDBConfig = {
  region: 'us-east-1',
  apiVersion: '2012-08-10',
  endpoint: 'http://localhost:8000' // endpoint url for the locally running dynamo db
};

const dynamodb = new AWS.DynamoDB(dynamoDBConfig);

const docClient = new AWS.DynamoDB.DocumentClient(dynamoDBConfig);

/**
 * this function sets up the Products table and seeds it with initial products
 */
function up() {
  return new Promise((resolve, reject) => {
    var params = {
      AttributeDefinitions: [
        {
          AttributeName: "Name",
          AttributeType: "S"
   }
  ],
      KeySchema: [
        {
          AttributeName: "Name",
          KeyType: "HASH"
   }
  ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      },
      TableName: "Products"
    };
    dynamodb.createTable(params, done);

  });
}

function down() {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: "Products"
    };
    dynamodb.deleteTable(params, done);
  });
}

function done(err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(data);
  }
}

module.exports = {
  db: docClient,
  up,
  down
}
