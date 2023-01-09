require('dotenv').config();
const logger = require('../config/logger');
const Cuisines = require('../models/cuisines');

module.exports = {

    create: async (req, res) => {

        const name = req.body.name;
        const avatar = req.body.avatar;

        try{
            const newCuisines = new Cuisines({
                name: name,
                avatar: avatar,
            })
            await newCuisines.save()

            if(newCuisines)
                res.send({"response": "success", "message" : "Cuisines add Successfully."})
            else
                res.send({"response" : "error", "message" : "Sorry, failed to save!"})

        } catch (error) {
            res.send({"response": "error", "message" : error.message});
        }
    },


    getAll: async (req, res) => {
        try{
            const cuisines = await Cuisines.findAll()
            if(cuisines.length > 0){
                res.send({"response": "success", cuisines})
            }else{
                res.send({"response": "error", "message" : "cuisines doesn't exist"})
            }
        }catch(error) {
            res.send({"response": "error", "message" : error.message});
        }
    },


    getByid: async (req, res) => {
        const id = req.params.id
        try {
            const cuisines = await Cuisines.findAll({
                where: {
                    id: id
                }
            })
            if(cuisines.length > 0)
                res.send({"response": "success", cuisines})
            else
                res.send({"response": "error", "message" : "cuisines doesn't exist"})
        } catch(error) {
            res.send({"response": "error", "message" : error.message});
        }
    },

    delete : async(req, res) => {
        const  { id } = req.params;

        try {
            const cuisines = await Cuisines.destroy({
                where: {
                    id: id
                }
            })
            if(cuisines > 0)
                res.send({"response": "success", "message" : "Successfully deleted."})
            else
                res.send({"response" : "error", "message" : "Sorry, failed to delete!"})
        } catch(error) {
            res.send({"response": "error", "message" : error.message});                     
        }
    },

    edit : async(req, res) => {
        const  { id } = req.params;
        const name = req.body.name;
        const avatar = req.body.avatar;

        try {
            const cuisines = await Cuisines.update({
                name: name,
                avatar: avatar
            },
            {
                where: {
                    id: id
                }
            })
            console.log(cuisines)
            if(cuisines[0] > 0)
                res.send({"response": "success", "message" : "Successfully updated."})
            else
                res.send({"response" : "error", "message" : "Sorry, failed to update!"})
        } catch(error) {
            res.send({"response" : "error", "message" : error.message})                     
        }         
    },
}