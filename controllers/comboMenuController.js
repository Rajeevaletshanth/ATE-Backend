require('dotenv').config();
const logger = require('../config/logger');
const ComboMenu = require('../models/comboMenu');

module.exports = {


    create: async (req, res) => {
        const restaurant_id = req.body.restaurant_id;
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const avatar = req.body.avatar;
        const discount = req.body.discount;

        try {

            const newComboMenu = new ComboMenu({
                name: name,
                description: description,
                price: price,
                avatar: avatar,
                restaurant_id: restaurant_id,
                discount: discount
            })
            await newComboMenu.save();

            if (newComboMenu) {
                res.send({ "response": "success", "message": "ComboMenu added Successfully." })
            } else {
                res.send({ "response": "error", "message": "Sorry, failed to save!" })
            }

        } catch (error) {
            res.send({ "response": "error", "message": error.message });
        }

    },

    getAll: async (req, res) => {

        try {
            const comboMenu = await ComboMenu.findAll()
            if (comboMenu.length > 0) {
                res.send({ "response": "success", comboMenu })
            } else {
                res.send({ "response": "error", "message": "ComboMenu doesn't exist" })
            }
        } catch (error) {
            res.send({ "response": "error", "message": error.message });
        }
    },

    getByid: async (req, res) => {
        const id = req.params.id
        try {
            const comboMenu = await ComboMenu.findAll({
                where: {
                    id: id
                }
            })
            if (comboMenu.length > 0)
                res.send({ "response": "success", comboMenu })
            else
                res.send({ "response": "error", "message": "category doesn't exist" })
        } catch (error) {
            res.send({ "response": "error", "message": error.message });
        }
    },

    

    delete: async (req, res) => {
        const { id } = req.params;

        try {
            const comboMenu = await ComboMenu.destroy({
                where: {
                    id: id
                }
            })
            if (comboMenu > 0)
                res.send({ "response": "success", "message": "Successfully deleted." })
            else
                res.send({ "response": "error", "message": "Sorry, failed to delete!" })
        } catch (error) {
            res.send({ "response": "error", "message": error.message });
        }
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const avatar = req.body.avatar;
        const discount = req.body.discount;

        try {
            const comboMenu = await ComboMenu.update({
                name: name,
                description: description,
                price: price,
                avatar: avatar,
                discount: discount
            },
                {
                    where: {
                        id: id
                    }
                })
            if (comboMenu[0] > 0)
                res.send({ "response": "success", "message": "Successfully updated." })
            else
                res.send({ "response": "error", "message": "Sorry, failed to update!" })
        } catch (error) {
            res.send({ "response": "error", "message": error.message })
        }
    },


}