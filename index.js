var express = require('express')
var app = express();
var AWS = require('aws-sdk');
var bodyParser = require('body-parser')
const multer  = require('multer')

var port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const upload = multer({ dest: 'uploads/' })
app.post('/s3',upload.single('fileData'), (req, res)=> {

    const s3 = new AWS.S3({
        accessKeyId: '',
        secretAccessKey: ''
    })

    console.log('file data', req.file);

    // const filename = 'the-file-name'
    //const fileContent = fs.readFileSync(fileName)
   // var aa = 'AA'
   // var bb ="bb"

    const params = {
    Bucket: 'laljibucket',
    Key: req.file.originalname,
    Body: req.file.path,
    //ACL:'public-read'
    }

    s3.upload(params, (err, data) => {
    if (err) {
        console.log('error', err);
    }
    //resolve(data.Location)
    console.log('data', data);
    })

})

app.post('/user', async(req,res)=> {
    
    try {

        console.log('running application------new-------------')

        return res.json({
            statusCode:200,
            message:"Data find successfully"
        })
        
    } catch (error) {

        return res.json({
            error:error,
            statusCode:500
        })
        
    }
})



// AWS Notes------------------------------------------------------

// Lambda Function-
// DynamoDB-
// Rest Api Gateway-

// -------------Post request in lambda function dynamoDb Api gateway---------------------

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  try {
    const { body } = event;
    const params = {
      TableName: 'MyTable',
      Item: JSON.parse(body)
    };
    await docClient.put(params).promise();
    return {
      statusCode: 200,
      body: 'Item saved successfully'
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Error saving item'
    };
  }
};



import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const ddbClient = new DynamoDBClient();

exports.handler = async (event) => {
  try {
    const { body } = event;
    const params = {
      TableName: 'MyTable',
      Item: JSON.parse(body)
    };
    await ddbClient.send(new PutItemCommand(params));
    return {
      statusCode: 200,
      body: 'Item saved successfully'
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Error saving item'
    };
  }
};

// -------------Get request in lambda function dynamoDb Api gateway---------------------

const AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const params = {
    TableName: 'my-table-name'
  };

  try {
    const data = await dynamodb.scan(params).promise();
    return data.Items;
  } catch (err) {
    console.log('Error', err);
  }
};

// -------------Update request in lambda function dynamoDb Api gateway---------------------

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const params = {
    TableName: 'my-table-name',
    Key: {
      'id': '123'
    },
    UpdateExpression: 'set attribute1 = :val1',
    ExpressionAttributeValues: {
      ':val1': 'new value'
    }
  };

  try {
    const data = await dynamodb.update(params).promise();
    console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.log('Error')
}
}





app.listen(port,()=> {
    console.log('running on port',`${port}`);
})
