//Ryan Lambert (c3397980) SENG4400 Assignment 2 Create Reminder Test for CI

const AWS = require('aws-sdk');
const AWSMock = require('aws-sdk-mock');

AWSMock.setSDKInstance(AWS); //Mocks test before moving to AWS


  AWSMock.mock('DynamoDB.DocumentClient', 'put', (params, callback) => 
  {
    callback(null, {}); 
  });

  const { handler } = require('./index'); 

  describe('createReminder Lambda', () => 
  {
    afterAll(() => 
    {
      AWSMock.restore('DynamoDB.DocumentClient');
    });

  test('Should return 201 when reminder is successfully created', async () => 
  {
    const event = 
    {
      body: JSON.stringify({
      userID: 'user1',
      title: 'Study for SENG4400 Midterm',
      dueDate: '2025-05-21T10:30:21Z',
      }),
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body)).toEqual({ message: "Reminder created." });
  });
});
