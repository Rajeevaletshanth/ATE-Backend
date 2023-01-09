const bcrypt = require("bcrypt");
const saltRounds = 10;
const db = require('../db_connect');
const logger = require('../config/logger');
const jwt = require('jsonwebtoken');
const transporter = require('../services/nodemailer/mailer');
require('dotenv').config();

const {generateKitchenAccessToken} = require('../auth/kitchen_authentication')

const Restaurant = require('../models/restaurant');


module.exports = {
    register: async (req, res) => {
        const name = req.body.name;   
        const authority = JSON.stringify(req.body.authority);      
        const email = req.body.email;        
        const phone_no = req.body.phone_no;       
        const password = req.body.password; 
        const description = req.body.description;
        const avatar = req.body.avatar;

        try {
                bcrypt.hash(password, saltRounds, async (err, hash) => {
                    if (err) {
                        res.send({"response": "error", "message" : "Encryption error!"});
                    } else {   
                        try { 
                            const newRestaurant = new Restaurant({
                                name: name,
                                authority: authority,
                                email: email,
                                phone_no: phone_no,
                                password: hash,
                                description: description,
                                avatar: avatar
                            })
                            await newRestaurant.save()
                            res.send({ "response": "success", restaurant: newRestaurant });
                        } catch(error) { 
                            console.log(error.message)
                            res.send({"response": "error", "message" : "This email is already registered. Please login!"});
                        }         
                    }
                });
        } catch (error) {
            res.send({"response": "error", "message" : error.message});
        }
    },

    login : async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const signedIn = req.body.signedIn;
      
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            logger.log({
                level: 'error',
                message: `${email} : encryption error!`
            });
            res.send({"response": "error", "message" : "Encryption error!"});
          } else {
            try {
                const restaurant = await Restaurant.findAll({
                    where: {
                        email: email                        
                    }
                })
                if(restaurant.length > 0){  
                    if(!restaurant[0].is_deleted) {               
                        bcrypt.compare(password, restaurant[0].password, (err,response) => {
                            if(response){                               
                                    logger.log({
                                        level: 'info',
                                        message: `${email} logged in...`
                                    });
                                    
                                    let access_role = restaurant[0].authority;
                                    //jwt
                                    const user = {id: restaurant[0].id, avatar: restaurant[0].avatar, username:restaurant[0].name, email:restaurant[0].email, authority: access_role}  
                                    let access_token = generateKitchenAccessToken(user, signedIn);
                                    let roles = JSON.parse(restaurant[0].authority).role;
                                                                 
                                    res.json({
                                        user: user,
                                        token: access_token,
                                        isLoggedIn : true
                                    });
                            }else{
                                logger.log({
                                    level: 'error',
                                    message: `${email} : Wrong Email/ Password combination!`
                                });
                                res.send({"response": "error", "message" : "Wrong Email/ Password combination"});                                
                            }
                        })
                    }else{
                        res.send({"response": "error", "message" : "This account is suspended"});
                    }
                }else{
                    res.send({"response": "error", "message" : "User doesn't exist"});
                }
            }catch(error){
                res.send({response: "error", message : "500 Internal Server Error", error: [error]});
            }
          }
        });
      },

    getAll: async (req, res) => {
        try {
            const restaurant = await Restaurant.findAll()
            if(restaurant.length > 0)
                res.send({"response": "success", restaurant})
            else
                res.send({"response": "error", "message" : "No restaurant found"})
        } catch(error) {
            res.send({response: "error", message : "Undefined error occured!", error: [error]})
        }
    },

    getByid: async (req, res) => {
        const id = req.params.id
        try {
            const restaurant = await Restaurant.findAll({
                where: {
                    id: id
                }
            })
            if(restaurant.length > 0)
                res.send({"response": "success", restaurant})
            else
                res.send({"response": "error", "message" : "User doesn't exist"})
        } catch(error) {
            res.send({response: "error", message : "Undefined error occured!", error: [error]})
        }
    },

    getByEmail: async (req, res) => {
        const email = req.body.email;
        try {
            const restaurant = await Restaurant.findAll({
                where: {
                    email: email
                }
            })
            if(restaurant.length > 0)
                res.send({"response": "success", restaurant})
            else
                res.send({"response": "error", "message" : "User doesn't exist"})
        } catch(error) {
            res.send({"response": "error", "message" : "User doesn't exist", error: [error]})
        }
    },

    editProfile : async(req, res) => {
        const  { id } = req.params;
        const name = req.body.name;              
        const phone_no = req.body.phone_no;       
        const description = req.body.description;
        const avatar = req.body.avatar;

        try {
            const restaurant = await Restaurant.update({
                name: name,
                phone_no: phone_no,
                description: description,
                avatar: avatar
            },
            {
                where: {
                    id: id
                }
            })
            if(restaurant[0] > 0)
                res.send({"response": "success", "message" : "Successfully updated."})
            else
                res.send({"response" : "error", "message" : "Sorry, failed to update!"})
        } catch(error) {
            res.send({"response" : "error", "message" : error.message})                     
        }         
    },

    forgot_password : async(req, res) => {
        const email = req.body.email;
        try {
            const restaurant = await Restaurant.findAll({
                where: {
                    email: email
                }
            })
            if(restaurant.length > 0){
                const secret = process.env.JWT_SECRET + restaurant[0].password;
                const payload = {
                    email: restaurant[0].email,
                    id: restaurant[0].id
                }
                const token = jwt.sign(payload, secret, {expiresIn: '15m'});
                const link = `${process.env.CLIENT_URL}/reset_password/${restaurant[0].id}/${token}`;

                let mailOptions = {
                    from: `AnyTimeEat <${process.env.MAILER_USER}>`, 
                    to: restaurant[0].email,
                    subject: 'Reset Password', 
                    html: `<b> Click here to reset password : </b> <br/> ${link}`
                }

                transporter.sendMail(mailOptions, (err, info) => {
                    if(err){
                        res.send({"response" : "error", "message" : err})
                    }else{
                        res.send({"response" : "success", "message" : info})
                    }
                })
            }else{
                res.send({"response" : "error", "message" : "Email not found!"})
            }
        } catch (error) {
            res.send({"response" : "error", "message" : error})
        }
    },

    change_password: async (req, res) => {
        const { id } = req.params;
        const currentPassword = req.body.currentPassword;
        const newPassword = req.body.newPassword;

        bcrypt.hash(currentPassword, saltRounds, async (err, hash) => {
            if (err) {
              res.send({"response": "error", "message" : "Encryption error!"});
            } else {
              try {
                  const restaurant = await Restaurant.findAll({
                      where: {
                          id: id
                      }
                  })
                  if(restaurant.length > 0){
                      bcrypt.compare(currentPassword, restaurant[0].password, (err,response) => {
                          if(response){
                            bcrypt.hash(newPassword, saltRounds, async (hashErr, newHash) => {
                                if (hashErr) {
                                    res.send({"response": "error", "message" : "Encryption error!"});
                                } else {   
                                    try { 
                                        await Restaurant.update({
                                            password: newHash
                                        },{
                                            where: {
                                                id: id
                                            }
                                        })
                                        res.send({ "response": "success", "message": "Password successfully updated." });
                                    } catch(error) { 
                                        res.send({"response": "error", "message" : "Sorry, password not updated. Please try again later!"});
                                    }         
                                }
                            });
                          }else{
                              res.send({"response": "error", "message" : "Current password is wrong!"});
                          }
                      })
                  }else{
                      res.send({"response": "error", "message" : "This account is deleted or suspended!"});
                  }
              }catch(error){
                res.send({"response": "error", "message" : error.message });
              }
            }
          });
    },

    reset_password : async(req ,res) => {
        const { id, token } = req.params;
        const password = req.body.password;

        try {
            const restaurant = await Restaurant.findAll({
                where: {
                    id: id
                }
            })
            if(restaurant.length > 0){
                const secret = process.env.JWT_SECRET + restaurant[0].password;
                try{
                    jwt.verify(token, secret);
                    bcrypt.hash(password, saltRounds, async (err, hash) => {
                        if (err) {
                            res.send({"response": "error", "message" : "Encryption error!"});
                        } else {   
                            try { 
                                await Restaurant.update({
                                    password: hash
                                },{
                                    where: {
                                        id: id
                                    }
                                })
                                res.send({"response": "success", "message": "Password updated!"})
                            } catch(error) { 
                                res.send({"response": "error", "message" : "Unable to update password! Please try again later."});
                            }         
                        }
                    });
                }catch(error){
                    res.send({"response": "error", "message" : "Token expired. Please request again."})
                }
            }
        } catch (error) {
            res.send({"response": "error", "message" : error.message })
        }
    },

    // //Soft delete and activate
    access_control : async(req, res) => {
        const  { id } = req.params;
        const is_deleted = req.body.is_deleted;

        try {
            const restaurant = await Restaurant.update({
                is_deleted : is_deleted
            },
            {
                where: {
                    id: id
                }
            })
            if(restaurant[0] > 0)
                if(is_deleted)
                    res.send({"response": "success", "message" : "Successfully suspended."})
                else
                    res.send({"response": "success", "message" : "Successfully activated."})
            else
                if(is_deleted)
                    res.send({"response": "error", "message" : "Sorry, failed to suspend!"})
                else
                    res.send({"response": "error", "message" : "Sorry, failed to activate!"})
        } catch(error) {
            res.send({"response": "error", "message" : error.message })                     
        }         
    },

    // //Hard delete
    delete : async(req, res) => {
        const  { id } = req.params;

        try {
            const restaurant = await Restaurant.destroy({
                where: {
                    id: id
                }
            })
            if(restaurant > 0)
                res.send({"response": "success", "message" : "Successfully deleted."})
            else
                res.send({"response" : "error", "message" : "Sorry, failed to delete!"})
        } catch(error) {
            res.send({"response": "error", "message" : error.message })                       
        }
    }
}