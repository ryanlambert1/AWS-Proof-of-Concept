//Ryan Lambert (c3397980) SENG4400 Assignment 2 Send Notification function

const https = require('https');

exports.handler = async () =>
{
  const emailData = 
  {
    sender: { name: "StudyPlanner", email: "ryan.lambert10@uon.edu.au" },
    to: [{ email: "rlambert2016@gmail.com", name: "User" }],
    subject: "📚 Reminder: You have a task due tomorrow!",
    htmlContent: "<p>Hi! This is your daily reminder to check your study tasks.</p>"
  };

  const options = 
  {
    hostname: 'api.brevo.com',
    path: '/v3/smtp/email',
    method: 'POST',
    headers: 
    {
      'api-key': "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",
      'Content-Type': 'application/json',
    }
  };

  const sendEmail = () =>
    new Promise((resolve, reject) => 
    {
      const req = https.request(options, (res) => 
      {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      });

      req.on('error', reject);
      req.write(JSON.stringify(emailData));
      req.end();
    });

  try 
  {
    const result = await sendEmail();
    console.log("Email sent:", result);
    return { statusCode: 200, body: "Email sent" };
  } 
    catch (err) 
    {
      console.error("Email failed:", err);
      return { statusCode: 500, body: "Failed to send email" };
    }
};
  