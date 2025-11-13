//Ryan Lambert (c3397980) SENG4400 Assignment 2 App Cognito Authentication
/*
const express = require('express');
const session = require('express-session');
const { Issuer, generators } = require('openid-client');

const authentication = express();
const PORT = 3000; 

let client;

//Initialize OpenID Client with your Cognito values
async function initializeClient() 
{
  const issuer = await Issuer.discover('https://cognito-idp.us-east-1.amazonaws.com/us-east-1_kcK9B6URI'); 
  client = new issuer.Client({
    client_id: '6484utddfeuah9dvq7len621v9',
    client_secret: 'b6jdislv8mcflhobsplu3veplfl381fdn7vi7l6i9mdb1ia6dgi',
    redirect_uris: ['http://localhost:3000/callback'], 
    response_types: ['code']
  });
}

initializeClient().catch(console.error);

//Session middleware
authentication.use(session({
  secret: '93jd90s!sdf93jnv9$gdfgndf9323k',
  resave: false,
  saveUninitialized: false
}));


const checkAuth = (req, res, next) =>
{
  req.isAuthenticated = !!req.session.userInfo;
  next();
};

//Home route
authentication.get('/', checkAuth, (req, res) => 
{
  if (req.isAuthenticated)
  {
    res.send(`
      <h1>Welcome, ${req.session.userInfo.email}</h1>
      <pre>${JSON.stringify(req.session.userInfo, null, 2)}</pre>
      <a href="/logout">Logout</a>
    `);
  } 
    else 
    {
      res.send(`
        <h1>Login</h1>
        <a href="/login">Sign In with Cognito</a>
    `);
    }
});

//Login route
authentication.get('/login', (req, res) =>
{
  const nonce = generators.nonce();
  const state = generators.state();

  req.session.nonce = nonce;
  req.session.state = state;

  const authUrl = client.authorizationUrl({
    scope: 'openid profile email',
    state: state,
    nonce: nonce
  });

  res.redirect(authUrl);
});

//Callback route 
authentication.get('/callback', async (req, res) => 
{
  try
  {
    const params = client.callbackParams(req);
    const tokenSet = await client.callback(
      'http://localhost:3000/callback', 
      params,
      {
        nonce: req.session.nonce,
        state: req.session.state
      }
    );

    const userInfo = await client.userinfo(tokenSet.access_token);
    req.session.userInfo = userInfo;

    res.redirect('https://studyplannerapp.s3.us-east-1.amazonaws.com/calendar.html');
  } 
     catch (err)
     {
       console.error('Callback error:', err);
       res.send('Authentication error');
     }
});

//Logout route
authentication.get('/logout', (req, res) => 
{
  req.session.destroy();
  const logoutUrl = `https://us-east-1kck9b6uri.auth.us-east-1.amazoncognito.com/logout?client_id=6484utddfeuah9dvq7len621v9&logout_uri=http://localhost:3000`;

  res.redirect(logoutUrl);
});

authentication.listen(PORT, () => 
{
  console.log(`Listening at http://localhost:${PORT}`);
});
/*