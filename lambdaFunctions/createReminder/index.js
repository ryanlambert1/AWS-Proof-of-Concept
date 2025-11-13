//Ryan Lambert (c3397980) SENG4400 Assignment 2 Create Reminder function

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE = "Reminders";

exports.handler = async (event) =>
{
 try {
    const { userID, title, dueDate } = JSON.parse(event.body);

    const params =
    {
      TableName: TABLE,
      Item:
      {
        userID,
        dueDate,
        title
      }
    };

    await db.put(params).promise();

    return {
      statusCode: 201,
      headers:
      {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ message: "Reminder created." })
    };
  } 
    catch (error) 
    {
      console.error("Error:", error);

      return {
        statusCode: 500,
        headers: 
        {
          "Access-Control-Allow-Origin": "*"
        },
      body: JSON.stringify({ message: "Error creating reminder", error: error.message })
    };
  }
};