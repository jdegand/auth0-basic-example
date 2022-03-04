const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://tenant.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:5000',
  issuer: 'https://tenant.us.auth0.com/',
  algorithms: ['RS256']
});

app.get('/public', (req,res)=> {
    res.json({
        type: 'Public'
    })
})

app.get('/private', jwtCheck, (req,res)=> {
    res.json({
        type: 'Private'
    })
})

app.listen(5000, console.log('Server running'));