//Ryan Lambert (c3397980) SENG4400 Assignment 2 Update Reminder Test for CI

const AWS = require('aws-sdk');
const AWSMock = require('aws-sdk-mock');

AWSMock.setSDKInstance(AWS); //Mocks test before moving to AWS


  const mockUpdateResponse = 
  {
    Attributes: 
    {
      title: 'Updated Title',
      progress: 80
    }
  };

  AWSMock.mock('DynamoDB.DocumentClient', 'update', (params, callback) => 
  {
    callback(null, mockUpdateResponse); 
  });

  const { handler } = require('./index'); 

  describe('updateReminder Lambda', () => 
  {
    afterAll(() => 
    {
      AWSMock.restore('DynamoDB.DocumentClient');
    });

  test('Should return 200 and updated info', async () => 
  {
    const event = 
    {
      pathParameters: 
      {
        userID: 'user1',
        dueDate: '2025-05-21T10:30:21Z'
      },
        body: JSON.stringify({
        newDueDate: '2025-05-21T10:30:21Z',
        title: 'Updated Title',
        progress: 80
      })
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    
    expect(body.message).toBe("Reminder updated.");
    expect(body.updatedAttributes).toEqual(mockUpdateResponse.Attributes);
  });
});
