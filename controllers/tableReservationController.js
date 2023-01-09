require("dotenv").config();
const logger = require("../config/logger");
const Table = require("../models/table");
const TableReservation = require("../models/tableReservation");

const QRCode = require("qrcode");

module.exports = {
  create: async (req, res) => {

    const {restaurant_id} = req.params;
    const table_ids = req.body.table_ids;
    const customer_name = req.body.customer_name;
    const customer_phone = req.body.customer_phone;
    const customer_email = req.body.customer_email;
    const guests_count = req.body.guests_count;
    const reservation_date = req.body.reservation_date;
    const reservation_from = req.body.reservation_from;
    const reservation_to = req.body.reservation_to;
    const note = req.body.note;

    let data = {
      restaurant_id: restaurant_id,
      table_ids: JSON.stringify(table_ids),
      customer_name: customer_name,
      customer_phone: customer_phone,
      customer_email: customer_email,
      guests_count: guests_count,
      reservation_date: reservation_date,
      reservation_from: reservation_from,
      reservation_to: reservation_to,
      note: note,
      status: "booked"
    };

    let reservationData = JSON.stringify(data);

    try {
      const newReservation = new TableReservation({
        restaurant_id:restaurant_id,
        table_ids: JSON.stringify(table_ids),
        customer_name: customer_name,
        customer_phone: customer_phone,
        customer_email: customer_email,
        guests_count: guests_count,
        reservation_date: reservation_date,
        reservation_from: reservation_from,
        reservation_to: reservation_to,
        note: note,
        status: "booked"
      })

      await newReservation.save()

      if(newReservation){
        //Generate QR Code
        QRCode.toDataURL(reservationData,  (err, code) => {
          if(err){
            res.json({response: "success", message: "Successfully reserved.", qrcode: ""})
          }else{
            res.json({response: "success", message: "Successfully reserved.", qrcode: code})
          }
        })
        
      }else{
        res.json({response: "error", message: "Reservation failure."})
      }
    } catch (error) {
      res.send({ response: "error", message: error.message });
    }
  },

  // edit : async(req, res) => {
  //     const  { id } = req.params;
  //     const table_no = req.body.table_no;
  //     const table_type = req.body.table_type;
  //     const seat_count = req.body.seat_count;

  //     try {
  //         const newTable = await Table.update({
  //             table_no: table_no,
  //             table_type: table_type,
  //             seat_count: seat_count
  //         },
  //         {
  //             where: {
  //                 id: id
  //             }
  //         })

  //         if(newTable[0] > 0)
  //             res.send({response: "success", message : "Table updated successfully."});
  //         else
  //             res.send({response : "error", message : "Sorry, failed to update table!"});
  //     } catch(error) {
  //         res.send({response : "error", message : error.message})
  //     }
  // },

  // getAll: async (req, res) => {
  //     const {restaurant_id} = req.params;

  //     try{
  //         const table = await Table.findAll({
  //             where:{
  //                 restaurant_id:restaurant_id
  //             }
  //         })
  //         if(table.length > 0){
  //             res.send({"response": "success", data: table})
  //         }else{
  //             res.send({response: "error", message : "No table found!"})
  //         }
  //     }catch(error) {
  //         res.send({response: "error", message : error.message});
  //     }
  // },

  // getByid: async (req, res) => {
  //     const {id} = req.params;
  //     try {
  //         const table = await Table.findOne({
  //             where: {
  //                 id: id
  //             }
  //         })
  //         if(table)
  //             res.send({"response": "success", data:table})
  //         else
  //             res.send({response: "error", message : "Table not found"})
  //     } catch(error) {
  //         res.send({response: "error", "message" : error.message});
  //     }
  // },

  // delete : async(req, res) => {
  //     const  { id } = req.params;

  //     try {
  //         const table = await Table.destroy({
  //             where: {
  //                 id: id
  //             }
  //         })
  //         if(table > 0)
  //             res.send({response: "success", message : "Successfully deleted."})
  //         else
  //             res.send({response : "error", message : "Sorry, failed to delete!"})
  //     } catch(error) {
  //         res.send({response: "error", message : error.message});
  //     }
  // },
};
