require('dotenv').config();
const logger = require('../config/logger');
const Table = require('../models/table');

const QRCode = require("qrcode");

const generateQr = (data) => {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(JSON.stringify(data), { width: 300 }, (err, code) => {
            if(err){
                reject(err)              
            }else{
                resolve(code)
            }
        })
    }) 
}

module.exports = {

    create: async (req, res) => {
        const {restaurant_id} = req.params
        const table_no = req.body.table_no;
        const table_type = req.body.table_type;
        const seat_count = req.body.seat_count;

        const gen_qr = {ri: restaurant_id, tn: table_no}

        try{
            let new_qr = await generateQr(gen_qr);

            const newTable = new Table({
                restaurant_id: restaurant_id,
                table_no: table_no,
                table_type: table_type,
                seat_count: seat_count,
                qr_code: new_qr
            })
            await newTable.save()

            if(newTable){
                res.send({response: "success", message : "Table added Successfully.", qr_code: new_qr})
            }else
                res.send({response : "error", message : "Sorry, failed to add table!"})
        } catch (error) {
            res.send({response: "error", message : error.message });
        }
    },

    edit : async(req, res) => {
        const  { id } = req.params;
        const table_type = req.body.table_type;
        const seat_count = req.body.seat_count;

        try {
            const newTable = await Table.update({
                table_type: table_type,
                seat_count: seat_count
            },
            {
                where: {
                    id: id
                }
            })
            
            if(newTable[0] > 0)
                res.send({response: "success", message : "Table updated successfully."});
            else
                res.send({response : "error", message : "Sorry, failed to update table!"});
        } catch(error) {
            res.send({response : "error", message : error.message})                     
        }         
    },


    getAll: async (req, res) => {
        const {restaurant_id} = req.params;

        try{
            const table = await Table.findAll({
                where:{
                    restaurant_id:restaurant_id
                }
            })
            if(table.length > 0){
                res.send({"response": "success", data: table})
            }else{
                res.send({response: "error", message : "No table found!"})
            }
        }catch(error) {
            res.send({response: "error", message : error.message});
        }
    },


    getByid: async (req, res) => {
        const {id} = req.params;
        try {
            const table = await Table.findOne({
                where: {
                    id: id
                }
            })
            if(table)
                res.send({"response": "success", data:table})
            else
                res.send({response: "error", message : "Table not found"})
        } catch(error) {
            res.send({response: "error", "message" : error.message});
        }
    },

    delete : async(req, res) => {
        const  { id } = req.params;

        try {
            const table = await Table.destroy({
                where: {
                    id: id
                }
            })
            if(table > 0)
                res.send({response: "success", message : "Successfully deleted."})
            else
                res.send({response : "error", message : "Sorry, failed to delete!"})
        } catch(error) {
            res.send({response: "error", message : error.message});                     
        }
    },
    

    
}