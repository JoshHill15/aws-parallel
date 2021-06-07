/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "createProblem";
// if(process.env.ENV && process.env.ENV !== "NONE") {
//   tableName = tableName + '-' + process.env.ENV;
// }

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "instructor_email";
const partitionKeyType = "S";
const sortKeyName = "problemID";
const sortKeyType = "N";
const hasSortKey = sortKeyName !== "";
const path = "/instructorProblems";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}
<<<<<<< HEAD
console.log("path: ", path, "hashkeypath", hashKeyPath)
=======
console.log("path: ", path, "hashkeypath", hashKeyPath, "sorkeypath", sortKeyPath)
>>>>>>> ac9ad56685deea00dea024d9de8c74a2e5917913

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get(path + hashKeyPath, function(req, res) {
  var condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  } else {
    try {
      console.log("try else")
      condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], partitionKeyType) ];
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition
  }



  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.json(data.Items);
    }
  });
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/
<<<<<<< HEAD

app.get(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
=======
console.log("THIS", path + "/object" + hashKeyPath + sortKeyPath)
app.get(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  console.log("if")
>>>>>>> ac9ad56685deea00dea024d9de8c74a2e5917913

  var params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
<<<<<<< HEAD
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
=======
    console.log("first if", params)
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    console.log("first else", params)
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
      console.log("try", params)
    } catch(err) {
      res.statusCode = 500;
      console.log("catch")
>>>>>>> ac9ad56685deea00dea024d9de8c74a2e5917913
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
<<<<<<< HEAD
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
=======
    console.log("hi")
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
      console.log("try")
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
      console.log("catch")
>>>>>>> ac9ad56685deea00dea024d9de8c74a2e5917913
    }
  }

  let getItemParams = {
    TableName: tableName,
<<<<<<< HEAD
    Key: params
  }

  dynamodb.get(getItemParams,(err, data) => {
    if(err) {
=======
    Key: {'instructor_email': 'josh_hil15@me.com', 'problemID': 2}
  }

  console.log("getitemparams", getItemParams)

  dynamodb.get(getItemParams,(err, data) => {
    if(err) {
      console.log("dynamo if", err.message)
>>>>>>> ac9ad56685deea00dea024d9de8c74a2e5917913
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
<<<<<<< HEAD
        res.json(data.Item);
      } else {
        res.json(data) ;
=======
        console.log("dynamo else if")
        res.json(data.Item);
      } else {
        res.json(data) ;
        console.log("else else dynamo")
>>>>>>> ac9ad56685deea00dea024d9de8c74a2e5917913
      }
    }
  });
});


/************************************
* HTTP put method for insert object *
*************************************/

app.put(path, function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else{
      res.json({success: 'put call succeed!', url: req.url, data: data})
    }
  });
});

/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else{
      res.json({success: 'post call succeed!', url: req.url, data: data})
    }
  });
});

/**************************************
* HTTP remove method to delete object *
***************************************/

app.delete(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  var params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
     try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params
  }
  dynamodb.delete(removeItemParams, (err, data)=> {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url});
    } else {
      res.json({url: req.url, data: data});
    }
  });
});
app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
