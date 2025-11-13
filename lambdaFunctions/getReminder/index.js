//Ryan Lambert (c3397980) SENG4400 Assignment 2 Get Reminder function

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const TABLE = "Reminders";

exports.handler = async (event) => 
{
  try
  {
    const userID = event.queryStringParameters?.userID;

    if (!userID) 
    {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ message: "Missing userID" }),
      };
    }

    const params = 
    {
      TableName: TABLE,
      KeyConditionExpression: "userID = :uid",
      ExpressionAttributeValues: 
      {
        ":uid": userID,
      },
    };

    const data = await db.query(params).promise();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data.Items),
    };
  } 
    catch (error) 
    {
      console.error("Error:", error);
      return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Error retrieving reminders", error: error.message }),
    };
  }
};