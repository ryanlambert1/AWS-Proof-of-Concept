SENG4400 Assignment 2 Ryan Lambert (c3397980)

For this to be ran, the following was required for me when using the Learner Lab:
1. npm install (globally):
   - (--save-dev jest)
   - (aws-sdk-mock)
   - (aws-sdk)
   - (npm init -y *without install*)

2. Run 'npm install aws-sdk' and 'npm init -y' locally in each lambdaFunction folder (besides sendNotification)

3. In lambda runtime settings change handler to 'index.handler'

4. Add 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods', and 'Access-Control-Allow-Origin' under method response
   in Api Gateway with proxy integration switched to on

5. Add the 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', and 'AWS_SESSION_TOKEN' to Github secrets

6. Ensure userID and dueDate in the API Gateway have braces '{}' around them

7. Have the database named Reminders, with userID (case sensitive) as the partition key and dueDate as the sort key
