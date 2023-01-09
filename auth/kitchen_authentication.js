const jwt = require('jsonwebtoken');
require('dotenv').config();

const kitchenAuthenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        return res.sendStatus(401);
    }else{
        jwt.verify(token, process.env.SUPERADMIN_ACCESS_TOKEN_SECRET, (err, user) => {
            if(user){
                req.user = user;
                next()
            }else{
                jwt.verify(token, process.env.KITCHEN_ACCESS_TOKEN_SECRET, (err, user) => {
                    if(err){
                        return res.sendStatus(403);
                    } 
                    req.user = user;
                    next()
                })
            }
        })        
    }
}

const generateKitchenAccessToken = (user, signedIn) => {
    if(!signedIn){
        return jwt.sign(user, process.env.KITCHEN_ACCESS_TOKEN_SECRET, { expiresIn: "1h"});
    }else{
        return jwt.sign(user, process.env.KITCHEN_ACCESS_TOKEN_SECRET, { expiresIn: "24h"});
    }
}



module.exports= {kitchenAuthenticateToken, generateKitchenAccessToken}


