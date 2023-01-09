require('dotenv').config();
const logger = require('../config/logger');
const RestaurantSettings = require('../models/restaurantSettings');

module.exports = {

    create: async (req, res) => {

        const website = req.body.website;
        const email = req.body.email; 
        const phone_no = req.body.phone_no;
        const restaurant_id = req.body.restaurant_id;
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;
        const avatar = req.body.avatar;
        const currency = req.body.currency;
        const cuisines = req.body.cuisines;
        const vegetarian = req.body.vegetarian;
        const service_type = req.body.service_type;
        const default_language = req.body.default_language;
        const opening_hours = req.body.opening_hours;
        const terms_and_conditions = req.body.terms_and_conditions;
        const bank_name = req.body.bank_name;
        const iban = req.body.iban;
        const delivery_fee = req.body.delivery_fee;
        const orderlimit_min = req.body.orderlimit_min;
        const facebook = req.body.facebook;
        const instagram = req.body.instagram;
        const pinterest = req.body.pinterest;
        const vimeo = req.body.vimeo;
        const youtube = req.body.youtube;

        try {
            const newSettings = new RestaurantSettings({
                website: website,
                email: email,
                phone_no: phone_no,
                restaurant_id: restaurant_id,
                longitude: longitude,
                latitude: latitude,
                avatar: avatar,
                currency: currency,
                cuisines: cuisines,
                vegetarian: vegetarian,
                service_type: service_type,
                default_language: default_language,
                opening_hours: opening_hours,
                terms_and_conditions: terms_and_conditions,
                bank_name: bank_name,
                iban: iban,
                delivery_fee: delivery_fee,
                orderlimit_min: orderlimit_min,
                facebook: facebook,
                instagram: instagram,
                pinterest: pinterest,
                vimeo: vimeo,
                youtube: youtube
            })
            await newSettings.save()

            if (newSettings)
                res.send({ "response": "success", "message": "Settings added Successfully." })
            else
                res.send({ "response": "error", "message": "Sorry, failed to save!" })

        } catch (error) {
            res.send({ "response": "error", "message": error.message });
        }
    },


    getAll: async (req, res) => {
        try {
            const settings = await RestaurantSettings.findAll()
            if (settings.length > 0) {
                res.send({ "response": "success", settings })
            } else {
                res.send({ "response": "error", "message": "Settings doesn't exist" })
            }
        } catch (error) {
            res.send({ "response": "error", "message": error.message });
        }
    },


    getByid: async (req, res) => {
        const id = req.params.id
        try {
            const settings = await RestaurantSettings.findAll({
                where: {
                    id: id
                }
            })
            if (settings.length > 0)
                res.send({ "response": "success", settings })
            else
                res.send({ "response": "error", "message": "Settings doesn't exist" })
        } catch (error) {
            res.send({ "response": "error", "message": error.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;

        try {
            const settings = await RestaurantSettings.destroy({
                where: {
                    id: id
                }
            })
            if (settings > 0)
                res.send({ "response": "success", "message": "Successfully deleted." })
            else
                res.send({ "response": "error", "message": "Sorry, failed to delete!" })
        } catch (error) {
            res.send({ "response": "error", "message": error.message });
        }
    },

    edit: async (req, res) => {
        
        const website = req.body.website;
        const email = req.body.email; 
        const phone_no = req.body.phone_no;
        const restaurant_id = req.body.restaurant_id;
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;
        const avatar = req.body.avatar;
        const currency = req.body.currency;
        const cuisines = req.body.cuisines;
        const vegetarian = req.body.vegetarian;
        const service_type = req.body.service_type;
        const default_language = req.body.default_language;
        const opening_hours = req.body.opening_hours;
        const terms_and_conditions = req.body.terms_and_conditions;
        const bank_name = req.body.bank_name;
        const iban = req.body.iban;
        const delivery_fee = req.body.delivery_fee;
        const orderlimit_min = req.body.orderlimit_min;
        const facebook = req.body.facebook;
        const instagram = req.body.instagram;
        const pinterest = req.body.pinterest;
        const vimeo = req.body.vimeo;
        const youtube = req.body.youtube;

        try {
            const settings = await RestaurantSettings.update({
                website: website,
                email: email,
                phone_no: phone_no,
                restaurant_id: restaurant_id,
                longitude: longitude,
                latitude: latitude,
                avatar: avatar,
                currency: currency,
                cuisines: cuisines,
                vegetarian: vegetarian,
                service_type: service_type,
                default_language: default_language,
                opening_hours: opening_hours,
                terms_and_conditions: terms_and_conditions,
                bank_name: bank_name,
                iban: iban,
                delivery_fee: delivery_fee,
                orderlimit_min: orderlimit_min,
                facebook: facebook,
                instagram: instagram,
                pinterest: pinterest,
                vimeo: vimeo,
                youtube: youtube
            },
                {
                    where: {
                        id: id
                    }
                })
            if (settings[0] > 0)
                res.send({ "response": "success", "message": "Successfully updated." })
            else
                res.send({ "response": "error", "message": "Sorry, failed to update!" })
        } catch (error) {
            res.send({ "response": "error", "message": error.message })
        }
    },
}