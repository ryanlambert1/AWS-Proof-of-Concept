//Ryan Lambert (c3397980) SENG4400 Assignment 2 Update Reminder function

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const TABLE = "Reminders";

exports.handler = async (event) => 
{  
  try 
  {
    const { userID, dueDate } = event.pathParameters;
    const body = JSON.parse(event.body);
    const { newDueDate, title, progress } = body;

    if (dueDate === newDueDate) 
    {
      let updateExpression = "set title = :t";
      let expressionValues = { ":t": title };

      if (progress !== undefined) 
      {
        updateExpression += ", progress = :p";
        expressionValues[":p"] = progress;
      }

      const params = 
      {
        TableName: TABLE,
        Key: { userID, dueDate },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionValues,
        ReturnValues: "UPDATED_NEW",
      };

    const result = await db.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(
      {
        message: "Reminder updated.",
        updatedAttributes: result.Attributes,
      }),
    };

  } 

   const deleteParams = 
   {
     TableName: TABLE,
     Key: { userID, dueDate },
    };

    const putParams = 
    {
      TableName: TABLE,
      Item: { userID, dueDate: newDueDate, title, progress },
    };

    await db.delete(deleteParams).promise();
    await db.put(putParams).promise();

    return {
      statusCode: 200,
      headers: 
      {
        //Try to avoid access errors
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
     body: JSON.stringify({ message: 'Reminder updated' }),
   };
  } 
    catch (error) 
    {
      console.error("Update failed:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({
        message: "Error updating reminder",
        error: error.message,
      }),
    };
  }
};