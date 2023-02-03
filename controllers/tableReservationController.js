require("dotenv").config();
const logger = require("../config/logger");
const Table = require("../models/table");
const TableReservation = require("../models/tableReservation");
const { Op } = require("sequelize");
const QRCode = require("qrcode");
const Order = require("../models/order");
const User = require("../models/user")

module.exports = {
  create: async (req, res) => {
    const { restaurant_id } = req.params;
    const table_ids = req.body.table_ids;
    const user_id = req.body.user_id;
    const guests_count = req.body.guests_count;
    const reservation_date = req.body.reservation_date;
    const reservation_from = req.body.reservation_from;
    const reservation_to = req.body.reservation_to;
    const note = req.body.note;

    let data = {
      restaurant_id: restaurant_id,
      table_ids: JSON.stringify(table_ids),
      user_id: user_id,
      guests_count: guests_count,
      reservation_date: reservation_date,
      reservation_from: reservation_from,
      reservation_to: reservation_to,
      note: note,
      status: "booked",
    };

    let reservationData = JSON.stringify(data);

    try {
      const newReservation = new TableReservation({
        restaurant_id: restaurant_id,
        table_ids: JSON.stringify(table_ids),
        user_id: user_id,
        guests_count: guests_count,
        reservation_date: reservation_date,
        reservation_from: reservation_from,
        reservation_to: reservation_to,
        note: note,
        status: "booked",
      });

      await newReservation.save();

      if (newReservation) {
        //Generate QR Code
        QRCode.toDataURL(reservationData, (err, code) => {
          if (err) {
            res.json({
              response: "success",
              message: "Successfully reserved.",
              qrcode: "",
            });
          } else {
            res.json({
              response: "success",
              message: "Successfully reserved.",
              qrcode: code,
            });
          }
        });
      } else {
        res.json({ response: "error", message: "Reservation failure." });
      }
    } catch (error) {
      res.send({ response: "error", message: error.message });
    }
  },

  getAll: async (req, res) => {
    const { restaurant_id } = req.params;
    const date = req.body.date;

    try {
      await TableReservation.findAll({
        where: {
          restaurant_id: restaurant_id,
          reservation_date: {
            [Op.eq]: new Date(date),
          },
        },
        order:[
          ['reservation_from', 'ASC']
        ]
      }).then(async(response) => {
        if(response.length > 0){
          const userIds = response.map(item => {
              return { id: item.user_id };
          });
          const uniqueArray = userIds.filter((obj, index, self) =>
              index === self.findIndex((t) => (
                  t.id === obj.id
              ))
          );
          let userinfo = []
          await User.findAll({
            where: {
              [Op.or]: uniqueArray
            }
          }).then((users) => {
            if(users.length > 0){
              users.map((item, key) =>{
                userinfo[key] = {id: item.id, customer_name: item.username, customer_email: item.email, customer_phone: item.phone_no}
              })
            }
          })

          let reservationData = [];
          response.map((item, key) => {
            let userdet = {};
            userinfo.map((user, userkey) =>{
              if(item.user_id === user.id){
                userdet = user
              }
            })
            reservationData[key] = {
              id: item.id,
              customer: userdet,
              restaurant_id: item.restaurant_id,
              table_ids: item.table_ids,
              guests_count: item.guests_count,
              reservation_date: item.reservation_date,
              reservation_from: item.reservation_from,
              reservation_to: item.reservation_to,
              note: item.note
            }
          })
          res.json({ response: "success", allReservations: reservationData });
        }else{
          res.json({ response: "success", allReservations: [] });
        }
        
      });
    } catch (error) {
      res.json({ response: "error", data: error.message });
    }
  },

  checkAvailability: async (req, res) => {
    const { restaurant_id } = req.params;
    const reservation_date = req.body.reservation_date;
    const reservation_from = req.body.reservation_from;
    const reservation_to = req.body.reservation_to;

    try {
      await TableReservation.findAll({
        where: {
          restaurant_id: restaurant_id,
          reservation_date: reservation_date,
          reservation_from: {
            [Op.lte]: new Date(reservation_from),
            [Op.lte]: new Date(reservation_to)
          },
          reservation_to: {
            [Op.gt]: new Date(reservation_from),
            [Op.gt]: new Date(reservation_to)
          },
        },
      }).then(async (response) => {
        if (response.length > 0) {
          let array = [];
          response.map((item) => {
            array = [...array, ...JSON.parse(item.table_ids)];
          });
          let bookedTables = array.map((id) => ({ table_no: id }));
          await Table.findAll({
            where: {
              restaurant_id: restaurant_id,
              [Op.not]: bookedTables,
            },
          }).then((tab_response) => {
            if (tab_response.length > 0) {
              res.json({
                response: "success",
                message: "Available",
                tables: tab_response,
              });
            } else {
              res.json({
                response: "error",
                message: "No available seats left.",
              });
            }
          });
        } else {
          await Table.findAll({
            where: {
              restaurant_id: restaurant_id,
            },
          }).then((tab_response) => {
            if (tab_response.length > 0) {
              res.json({
                response: "success",
                message: "Available",
                tables: tab_response,
              });
            } else {
              res.json({
                response: "error",
                message: "No available seats left.",
              });
            }
          });
        }
      });
    } catch (error) {
      res.json({ response: "error", data: error.message });
    }
  },

  getByid: async (req, res) => {
    const { id } = req.params;
    try {
      const tableReservation = await TableReservation.findOne({
        where: {
          id: id,
        },
      });
      if (table) res.send({ response: "success", data: tableReservation });
      else res.send({ response: "error", message: "No reservations found!" });
    } catch (error) {
      res.send({ response: "error", message: error.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const tableReservation = await TableReservation.destroy({
        where: {
          id: id,
        },
      });
      if (tableReservation > 0)
        res.send({ response: "success", message: "Successfully deleted." });
      else res.send({ response: "error", message: "Sorry, failed to delete!" });
    } catch (error) {
      res.send({ response: "error", message: error.message });
    }
  },
};
