import { Router } from 'express';
import { authRequired, adminOnly } from "../middlewares/authMiddleware.js";
import { signup, login } from '../controllers/authController.js';
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import {
  createRental,
  listRentals,
  getRental,
  getInvoice,
  payRental,
  returnRental,
} from '../controllers/rentalController.js';
import { getStats, getUsers } from '../controllers/adminController.js';

const router = Router();

router.post('/auth/signup', signup);
router.post('/auth/login', login);

router.get('/products', listProducts);
router.post('/products', authRequired, adminOnly, createProduct);
router.put('/products/:id', authRequired, adminOnly, updateProduct);
router.delete('/products/:id', authRequired, adminOnly, deleteProduct);

router.post('/rentals', authRequired, createRental);
router.get('/rentals', authRequired, listRentals);
router.get('/rentals/:id/invoice', authRequired, getInvoice);
router.get('/rentals/:id', authRequired, getRental);
router.post('/rentals/:id/pay', authRequired, payRental);
router.put('/rentals/:id/return', authRequired, adminOnly, returnRental);

router.get('/admin/stats', authRequired, adminOnly, getStats);
router.get('/admin/users', authRequired, adminOnly, getUsers);

export default router;