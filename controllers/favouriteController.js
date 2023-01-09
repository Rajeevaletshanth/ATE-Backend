require('dotenv').config();
const { Op } = require("sequelize");
const logger = require('../config/logger');
const Favourite = require('../models/favourite');
const Product = require('../models/product')


module.exports = {


    create: async (req, res) => {        
        const user_id = req.body.user_id;
        const restaurant_id = req.body.restaurant_id;
        const product_id = req.body.product_id;

        try{
            await Favourite.findAll({
                where:{
                    product_id:product_id
                }
            }).then(async(response) => {
                if(response.length > 0){
                    res.send({"response": "success", "message" : "Already added to favourite."})
                }else{
                    const newFav = new Favourite({
                        user_id: user_id,
                        restaurant_id: restaurant_id,
                        product_id: product_id
                    })
                    await newFav.save();
                    if(newFav){
                        res.send({"response": "success", "message" : " Favourite add Successfully."})
                    }else{
                        res.send({"response" : "error", "message" : "Sorry, failed to save!"})
                    }
                }
            }).catch((err)=> {
                res.send({"response" : "error", "message" : "Sorry, failed to add favourite!"})
            })

        }catch(error){
            res.send({"response": "error", "message" : "Undefined error occured! $"});
        }
    },

    getAll: async (req, res) => {
        const { id } = req.params;
        try{
            const fav = await Favourite.findAll({
                where:{
                    user_id: id
                },
                attributes: ['product_id']
            })
            if(fav.length > 0){
                const productArr = fav.map(({product_id: id}) => ({id}))
                await Product.findAll({
                    where:{
                        [Op.or]: productArr
                    }
                }).then((resp) => {
                    res.send({"response": "success", products: resp})
                }).catch((err)=>{
                    res.send({"response": "error", message:"No favourites."})
                })
                
            }else{
                res.send({"response": "error", "message" : "No favourites"})
            }
        }catch(error) {
            res.send({"response": "error", "message" : "Undefined error occured!"});
        }
    },

    remove: async (req,res) => {
        const  { id } = req.params;
        const restaurant_id = req.body.restaurant_id;
        const product_id = req.body.product_id;

        try {
            await Favourite.destroy({
                where: {
                    user_id: id,
                    restaurant_id:restaurant_id,
                    product_id:product_id
                }
            }).then((response) => {
                res.send({"response": "success", "message" : "Removed from favourite list."})
            }).catch((err) => {
                res.send({"response" : "error", "message" : "Sorry, failed to delete!"})
            })
        } catch(error) {
            res.send({"response": "error", "message" : "Undefined error occured!"});                     
        }
    },

    getByid: async (req, res) => {
        const id = req.params.id
        try {
            const fav = await Favourite.findAll({
                where: {
                    id: id
                }
            })
            if(fav.length > 0)
                res.send({"response": "success", fav})
            else
                res.send({"response": "error", "message" : "Favourite doesn't exist"})
        } catch(error) {
            res.send({"response": "error", "message" : "Undefined error occured!"});
        }
    },

    delete : async(req, res) => {
        const  { id } = req.params;

        try {
            const fav = await Favourite.destroy({
                where: {
                    id: id
                }
            })
            if(addons > 0)
                res.send({"response": "success", "message" : "Successfully deleted."})
            else
                res.send({"response" : "error", "message" : "Sorry, failed to delete!"})
        } catch(error) {
            res.send({"response": "error", "message" : "Undefined error occured!"});                     
        }
    },


}