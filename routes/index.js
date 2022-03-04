const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const axios = require('axios');

router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express', 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user
  });
});

router.get('/secured', requiresAuth(), async function(req, res, next) {

  let data = {};

  const {token_type, access_token } =  req.oidc.accessToken;

  try {
    const apiResponse = await axios.get('http://localhost:5000/private', 
    {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    });

    data = apiResponse.data;
  } catch(err){
    console.error(err)
  }

  res.render('secured', { 
    title: 'Secure Page', 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});

module.exports = router;
