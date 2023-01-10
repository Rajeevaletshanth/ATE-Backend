require('dotenv').config();
const { Op } = require("sequelize");
const logger = require('../config/logger');
// const Favourite = require('../models/favourite');
const TopBrands = require('../models/topBrands')
const Kitchen = require('../models/kitchen')


module.exports = {

    create: async (req, res) => {        
        const {restaurant_id} = req.params;

        try{
            const newTopBrand = new TopBrands({
                restaurant_id:restaurant_id
            })

            await newTopBrand.save();
            if(newTopBrand)
                res.send({response: "success", message : "Added to top brands."})
            else
                res.send({response : "error", "message" : "Sorry, failed to add!"})

        }catch(error){
            res.send({response: "error", "message" : error.message});
        }
    },

    getAll: async (req, res) => {
        try{
            await TopBrands.findAll({
                where:{
                    top_brand: true
                },
                attributes:['restaurant_id']
            }).then(async(response) => {
                const restaurantArr = response.map(({restaurant_id: id}) => ({id}))
                await Kitchen.findAll({
                    where:{
                        [Op.or]: restaurantArr
                    }
                }).then((top_brands) => {
                    res.send({response:"success", data: top_brands})
                }).catch((err) => {
                    res.send({response: "error", "message" : err.message});
                })
            })
        }catch(error){
            res.send({response: "error", "message" : error.message});
        }
    },

    delete : async(req, res) => {
        const  { id } = req.params;

        try {
            const remove = await TopBrands.destroy({
                where: {
                    id: id
                }
            })
            if(remove > 0)
                res.send({"response": "success", "message" : "Successfully deleted."})
            else
                res.send({"response" : "error", "message" : "No data found to delete."})
        } catch(error) {
            res.send({"response": "error", "message" : error.message });                     
        }
    },


}