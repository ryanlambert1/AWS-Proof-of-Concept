//Ryan Lambert (c3397980) SENG4400 Assignment 2 Delete Reminder function

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE = "Reminders";

exports.handler = async (event) =>
{
 try {
    const { userID, dueDate } = event.pathParameters;

     if (!userID || !dueDate)
     {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ message: "Missing userID or dueDate" })
      };
    }

    const params =
    {
      TableName: TABLE,
      Key: 
      {
        userID,
        dueDate,
      }
    };

    await db.delete(params).promise();

    return {
      statusCode: 201,
      headers:
      {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ message: "Reminder deleted." })
    };
  } 
    catch (error) 
    {
      console.error("Error:", error);

      return {
      statusCode: 200,
      headers: 
      {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
       },
    body: JSON.stringify({ message: 'Reminder deleted' }),
   };
  }
};