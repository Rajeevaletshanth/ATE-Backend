require('dotenv').config();
const { Op } = require("sequelize");
const logger = require('../config/logger');
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user')
const Addons = require('../models/addons');
const { response } = require('express');



module.exports = {
    create: async (req, res) => {
        const restaurant_id = req.body.restaurant_id;
        const user_id = req.body.user_id;
        const products = JSON.stringify(req.body.products);
        const delivery_fee = req.body.delivery_fee;
        const total_amount = req.body.total_amount;
        const status = req.body.status;
        const order_type = req.body.order_type;
        const delivery_address = req.body.delivery_address;
        const phone_no = req.body.phone_no;

        //Current Time
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, "0");
        const minutes = currentTime.getMinutes().toString().padStart(2, "0");
        const time = `${hours}:${minutes}`;

        try{
            const newOrder = new Order({
                restaurant_id: restaurant_id,
                user_id: user_id,
                products:products,
                order_date: new Date().toISOString().slice(0,10),
                order_time: time,
                delivery_fee: delivery_fee,
                total_amount: total_amount,
                status: status,
                order_type:order_type,
                delivery_address:delivery_address,
                phone_no:phone_no
            })
            await newOrder.save();

            if(newOrder){
                res.send({response: "success", "message" : "Order add Successfully."})
            }else{
                res.send({response : "error", "message" : "Sorry, failed to save!"})
            }

        }catch(error){
            res.send({response: "error", "message" : error.message});
        }

    },

    createBulk: async (req, res) => {
        try {
          const orders = req.body.orders; // an array of orders
          const groupedOrders = orders.reduce((acc, order) => {
            const { restaurant_id } = order;
            if (!acc[restaurant_id]) {
              acc[restaurant_id] = [];
            }
            acc[restaurant_id].push(order);
            return acc;
          }, {});
      
          const result = await Promise.all(Object.keys(groupedOrders).map(async (restaurant_id) => {
            const restaurantOrders = groupedOrders[restaurant_id];
            const currentTime = new Date();
            const hours = currentTime.getHours().toString().padStart(2, "0");
            const minutes = currentTime.getMinutes().toString().padStart(2, "0");
            const time = `${hours}:${minutes}`;
      
            const bulkOrders = restaurantOrders.map(order => {
              const { user_id, products, delivery_fee, total_amount, status, order_type, delivery_address, phone_no } = order;
              return {
                restaurant_id: restaurant_id,
                user_id: user_id,
                products: JSON.stringify(products),
                order_date: new Date().toISOString().slice(0, 10),
                order_time: time,
                delivery_fee: delivery_fee,
                total_amount: total_amount,
                status: status,
                order_type: order_type,
                delivery_address: delivery_address,
                phone_no: phone_no
              }
            });
            
            return await Order.bulkCreate(bulkOrders);
          }));
      
          if (result) {
            res.send({ response: "success", message: "Orders added successfully.", data: result });
          } else {
            res.send({ response: "error", message: "Sorry, failed to save!" });
          }
        } catch (error) {
          res.send({ response: "error", message: error.message });
        }
    },
      

    edit: async (req, res) => {
        const { id } = req.params;
        const status = req.body.status;

        try {
            const order = await Order.update({
                status: status
            },
                {
                    where: {
                        id: id
                    }
                })
            if (order[0] > 0)
                res.send({ "response": "success", message: `Status updated to ${status}` })
            else
                res.send({ response: "error", message: "Order not found!" })
        } catch (error) {
            res.send({ response: "error", message: error.message })
        }
    },

    getByid: async (req, res) => {
        const id = req.params.id
        try {
            const order = await Order.findOne({ 
                where: {
                    id: id
                }
            })
            if(order !== null){
                if(order.products !== null){
                    const order_dets = JSON.parse(order.products);
                    const productArr = order_dets.map(({product_id: id}) => ({id}))

                    await Product.findAll({
                        where:{
                            [Op.or] : productArr
                        }
                    }).then((resp) => {
                        if(resp.length > 0){
                            let items = [];
                            resp.map((item, key) => {
                                let quantity = order_dets[key].quantity
                                let addons = order_dets[key].addons
                                items[key] = {
                                        product_det : resp[key],
                                        quantity : quantity,
                                        addons : addons
                                }
                            })

                            res.send({response: "success", data: {order_dets: order, items: items} })
                        }else{
                            res.send({response: "success", data: {order_dets: order, product_dets: []} })
                        }
                    }).catch((err) => {
                        res.send({"response": "error", "message" : err.message})
                    })
      
                }else{
                    res.send({"response": "error", "message" : "Products empty"})
                }    
            }else
                res.send({"response": "error", "message" : "Order doesn't exist"})
        } catch(error) {
            res.send({"response": "error", "message" : error.message});
        }
    },

    getAllrestarantOrders: async(req, res) => {
        const {restaurant_id} = req.params
        try {
            const order = await Order.findAll({
                where: {
                    restaurant_id: restaurant_id,
                    order_date: new Date().toISOString(),
                    is_deleted: false
                },
                attributes: ['id']
            })
            if(order.length > 0){
                let results = [];
                await Promise.all(order.map(async(item, key) => {
                        const order = await Order.findOne({ 
                            where: {
                                id: item.id
                            }
                        })
                        if(order !== null){
                            if(order.products !== null){
                                const order_dets = JSON.parse(order.products);
                                const productArr = order_dets.map(({product_id: id}) => ({id}))
            
                                await Product.findAll({
                                    where:{
                                        [Op.or] : productArr
                                    }
                                }).then(async(resp) => {
                                    if(resp.length > 0){
                                        let items = [];
                                        resp.map(async(item, key) => {
                                            let quantity = order_dets[key].quantity
                                            let addons = order_dets[key].addons
                                            items[key] = {
                                                    product : resp[key],
                                                    quantity : quantity,
                                                    addons : addons
                                            }
                                        })

                                        let user_details = {};
                                        await User.findOne({
                                            where:{
                                                id: order.user_id
                                            }
                                        }).then((user_resp) => user_details = user_resp)

                                        results[key] = {
                                            order_id: order.id,
                                            customer_id: order.user_id,
                                            customer_name: user_details? user_details.username : "",
                                            customer_phone: user_details? user_details.phone_no : "",
                                            customer_email: user_details? user_details.email : "",
                                            restaurant_id: order.restaurant_id,
                                            order_date: order.order_date,
                                            order_time: order.order_time,
                                            delivery_fee: order.delivery_fee,
                                            total_amount: order.total_amount,
                                            status: order.status,
                                            items: items
                                        }                                       
                                    }
                                })                 
                            }   
                        }
                }))
                res.send({"response": "success", data : results })
            }else
                res.send({"response": "error", "message" : "Order doesn't exist"})
        } catch(error) {
            res.send({"response": "error", "message" : error.message});
        }
    },

    getStatusByid: async (req, res) => {
        const { id } = req.params;

        try {
            await Order.findOne({
                where: {
                    id: id
                },
                attributes:['status']
            }).then((response) => {
                if(response){
                    res.json({response: "success", status: response.status, order_id: id})
                }else
                    res.json({response: "empty", status: "undefined"})
            })
        } catch (error) {
            res.send({"response": "error", "message" : error.message});
        }
        
    },

    getOrdersByUserId: async (req, res) => {
        const {user_id} = req.params
        try {
            const order = await Order.findAll({
                where: {
                    user_id: user_id
                },
                attributes: ['id']
            })
            if(order.length > 0){
                let results = [];
                await Promise.all(order.map(async(item, key) => {
                        const order = await Order.findOne({ 
                            where: {
                                id: item.id
                            }
                        })
                        if(order !== null){
                            if(order.products !== null){
                                const order_dets = JSON.parse(order.products);
                                const productArr = order_dets.map(({product_id: id}) => ({id}))
            
                                await Product.findAll({
                                    where:{
                                        [Op.or] : productArr
                                    }
                                }).then((resp) => {
                                    if(resp.length > 0){
                                        let items = [];
                                        resp.map((item, key) => {
                                            let quantity = order_dets[key].quantity
                                            let addons = order_dets[key].addons
                                            items[key] = {
                                                    product : resp[key],
                                                    quantity : quantity,
                                                    addons : addons
                                            }
                                        })
                                        results[key] = {
                                            order_id: order.id,
                                            user_id: order.user_id,
                                            restaurant_id: order.restaurant_id,
                                            order_date: order.order_date,
                                            order_time: order.order_time,
                                            delivery_fee: order.delivery_fee,
                                            total_amount: order.total_amount,
                                            order_type: order.order_type,
                                            delivery_address: order.delivery_address,
                                            phone_no: order.phone_no,
                                            status: order.status,
                                            items: items
                                        }                                       
                                    }
                                })                 
                            }   
                        }
                }))
                res.send({"response": "success", data : results })
            }else
                res.send({"response": "error", "message" : "Order doesn't exist"})
        } catch(error) {
            res.send({"response": "error", "message" : error.message});
        }
    },

    archive: async (req, res) => {
        const { id } = req.params;

        try {
            const order = await Order.update({
                is_deleted: true
            },
                {
                    where: {
                        id: id
                    }
                })
            if (order[0] > 0)
                res.send({ "response": "success", message: `Order archived.` })
            else
                res.send({ response: "error", message: "Order not found!" })
        } catch (error) {
            res.send({ response: "error", message: error.message })
        }
    },

    delete : async(req, res) => {
        const  { id } = req.params;

        try {
            const order = await Order.destroy({
                where: {
                    id: id
                }
            })
            if(order > 0)
                res.send({"response": "success", "message" : "Successfully deleted."})
            else
                res.send({"response" : "error", "message" : "Sorry, failed to delete!"})
        } catch(error) {
            res.send({"response": "error", "message" : error.message});                     
        }
    }


}