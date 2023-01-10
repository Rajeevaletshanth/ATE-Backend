require('dotenv').config();
const { Op } = require("sequelize");
const logger = require('../config/logger');
// const Favourite = require('../models/favourite');
const TopOffers = require('../models/topOffers')
const Product = require('../models/product')
const ComboMenu = require('../models/comboMenu')


module.exports = {

    create: async (req, res) => {        
        const item_id = req.body.item_id;
        const type = req.body.type;

        try{
            const newTopOffer = new TopOffers({
                item_id:item_id,
                type:type
            })

            await newTopOffer.save();
            if(newTopOffer)
                res.send({response: "success", message : "Added to top offers."})
            else
                res.send({response : "error", "message" : "Sorry, failed to add!"})

        }catch(error){
            res.send({response: "error", "message" : error.message});
        }
    },

    getAll: async (req, res) => {
        try{
            let top_products_array = [];
            let top_combo_menu_array = [];

            //Top Products
            const top_products = await TopOffers.findAll({
                where:{
                    top_offer: true,
                    type: "product"
                },
                attributes:['item_id']
            })
            const productArr = top_products.map(({item_id: id}) => ({id}))
            await Product.findAll({
                where:{
                    [Op.or]: productArr
                }
            }).then((top_offers) => {
                top_products_array = top_offers
            })

            //Top Combo Menu
            const top_combo_menu = await TopOffers.findAll({
                where:{
                    top_offer: true,
                    type: "combo menu"
                },
                attributes:['item_id']
            })
            const comboArr = top_combo_menu.map(({item_id: id}) => ({id}))
            await ComboMenu.findAll({
                where:{
                    [Op.or]: comboArr
                }
            }).then((top_offers) => {
                top_combo_menu_array = top_offers
            })

            res.send({response:"success", top_products: top_products_array, top_combo_menu: top_combo_menu_array })
            
        }catch(error){
            res.send({response: "error", "message" : error.message});
        }
    },

    delete : async(req, res) => {
        const  { id } = req.params;

        try {
            const remove = await TopOffers.destroy({
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