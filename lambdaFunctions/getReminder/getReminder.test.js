//Ryan Lambert (c3397980) SENG4400 Assignment 2 Get Reminder Test for CI

const AWS = require('aws-sdk');
const AWSMock = require('aws-sdk-mock');

AWSMock.setSDKInstance(AWS); //Mocks test before moving to AWS


  AWSMock.mock('DynamoDB.DocumentClient', 'query', (params, callback) => 
  {
    callback(null, 
    {
      Items: [
      {
        userID: 'user1',
        dueDate: '2025-05-21T10:30:21Z',
        title: 'Study for SENG4400 Midterm',
      }
     ]
    });
  });

  const { handler } = require('./index'); 

  describe('getReminder Lambda', () => 
  {
    afterAll(() => 
    {
      AWSMock.restore('DynamoDB.DocumentClient');
    });

  test('Should return 201 when reminder is successfully retrieved', async () => 
  {
    const event = 
    {
      queryStringParameters: 
      {
        userID: 'user1'
      }
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual([
      {
        userID: 'user1',
        dueDate: '2025-05-21T10:30:21Z',
        title: 'Study for SENG4400 Midterm'
      }
    ]);
  });
});
