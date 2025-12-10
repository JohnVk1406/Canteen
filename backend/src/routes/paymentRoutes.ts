import express from 'express';
import {
  processPayment,
  getPaymentByOrderId,
  getAllPayments,
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/process', processPayment);
router.get('/order/:orderId', getPaymentByOrderId);
router.get('/', getAllPayments);

export default router;
