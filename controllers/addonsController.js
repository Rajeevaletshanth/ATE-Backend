require('dotenv').config();
const logger = require('../config/logger');
const Addons = require('../models/addons');

module.exports = {


    create: async (req, res) => {
        
        const restaurant_id = req.body.restaurant_id;
        const name = req.body.name;
        const price = req.body.price;

        try{

            const newAddons = new Addons({
                restaurant_id: restaurant_id,
                name: name,
                price: price,
            })
            await newAddons.save();

            if(newAddons){
                res.send({"response": "success", "message" : "Addons add Successfully."})
            }else{
                res.send({"response" : "error", "message" : "Sorry, failed to save!"})
            }

        }catch(error){
            res.send({"response": "error", "message" : "Undefined error occured! $"});
        }

    },

    getAll: async (req, res) => {

        try{
            const addons = await Addons.findAll()
            if(addons.length > 0){
                res.send({"response": "success", addons})
            }else{
                res.send({"response": "error", "message" : "addons doesn't exist"})
            }
        }catch(error) {
            res.send({"response": "error", "message" : "Undefined error occured!"});
        }
    },

    getByid: async (req, res) => {
        const id = req.params.id
        try {
            const addons = await Addons.findAll({
                where: {
                    id: id
                }
            })
            if(addons.length > 0)
                res.send({"response": "success", addons})
            else
                res.send({"response": "error", "message" : "addons doesn't exist"})
        } catch(error) {
            res.send({"response": "error", "message" : "Undefined error occured!"});
        }
    },

    delete : async(req, res) => {
        const  { id } = req.params;

        try {
            const addons = await Addons.destroy({
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

    edit : async(req, res) => {
        const  { id } = req.params;

        const restaurant_id = req.body.restaurant_id;
        const name = req.body.name;
        const price = req.body.price;

        try {
            const addons = await Addons.update({
                restaurant_id: restaurant_id,
                name: name,
                price: price
            },
            {
                where: {
                    id: id
                }
            })
            if(addons[0] > 0)
                res.send({"response": "success", "message" : "Successfully updated."})
            else
                res.send({"response" : "error", "message" : "Sorry, failed to update!"})
        } catch(error) {
            res.send({"response" : "error", "message" : "Sorry, User is deleted or suspended!"})                     
        }         
    },


}