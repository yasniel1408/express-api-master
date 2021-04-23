const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');

router.get('/', productController.productAll)
router.get('/:id', productController.productOne)
router.post('/', productController.productSave)
router.put('/:id', productController.productUpdate)
router.delete('/:id', productController.productDelete)

module.exports = router;