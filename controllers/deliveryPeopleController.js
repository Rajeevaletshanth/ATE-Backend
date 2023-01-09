require('dotenv').config();
const logger = require('../config/logger');
const DeliveryPeople = require('../models/deliveryPeople');

module.exports = {

    create: async (req, res) => {
        const restaurant_id = req.body.restaurant_id;
        const name = req.body.name;
        const email = req.body.email;
        const address = req.body.address;
        const avatar = req.body.avatar;
        const phone_no  = req.body.phone_no;
        const device_id = req.body.device_id;
        const device_os = req.body.device_os;

        try {

            const newDeliverProple = new DeliveryPeople({
                restaurant_id: restaurant_id,
                name: name,
                email: email,
                address: address,
                avatar: avatar,
                phone_no: phone_no,
                device_id: device_id,
                device_os: device_os
            })
            await newDeliverProple.save()

            if (newDeliverProple)
                res.send({ "response": "success", "message": "Delivery people added Successfully." })
            else
                res.send({ "response": "error", "message": "Sorry, failed to save!" })

        } catch (error) {
            res.send({ "response": "error", "message": error.message });
        }
    },

    getAll: async (req, res) => {
        try{
            const deliveryPeople = await DeliveryPeople.findAll()
            if(cuisines.length > 0){
                res.send({"response": "success", deliveryPeople})
            }else{
                res.send({"response": "error", "message" : "Delivery People doesn't exist"})
            }
        }catch(error) {
            res.send({"response": "error", "message" : error.message});
        }
    },

    getByid: async (req, res) => {
        const id = req.params.id
        try {
            const deliveryPeople = await DeliveryPeople.findAll({
                where: {
                    id: id
                }
            })
            if(cuisines.length > 0)
                res.send({"response": "success", deliveryPeople})
            else
                res.send({"response": "error", "message" : "delivery People doesn't exist"})
        } catch(error) {
            res.send({"response": "error", "message" : error.message});
        }
    },


    delete : async(req, res) => {
        const  { id } = req.params;

        try {
            const deliveryPeople = await DeliveryPeople.destroy({
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
        const email = req.body.email;
        const address = req.body.address;
        const avatar = req.body.avatar;
        const phone_no  = req.body.phone_no;
        const device_id = req.body.device_id;
        const device_os = req.body.device_os;

        try {
            const deliveryPeople = await DeliveryPeople.update({
                name: name,
                email: email,
                address: address,
                avatar: avatar,
                phone_no: phone_no,
                device_id: device_id,
                device_os: device_os
            },
            {
                where: {
                    id: id
                }
            })
            if(deliveryPeople[0] > 0)
                res.send({"response": "success", "message" : "Successfully updated."})
            else
                res.send({"response" : "error", "message" : "Sorry, failed to update!"})
        } catch(error) {
            res.send({"response" : "error", "message" : error.message})                     
        }         
    },

}