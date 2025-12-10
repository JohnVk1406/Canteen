import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController.js';

const router = express.Router();

// CRUD Routes
router.post('/', createOrder);                    // CREATE
router.get('/', getAllOrders);                    // READ ALL
router.get('/:id', getOrderById);                 // READ ONE
router.get('/user/:userId', getOrdersByUserId);   // READ BY USER
router.put('/:id/status', updateOrderStatus);     // UPDATE
router.delete('/:id', deleteOrder);               // DELETE

export default router;
