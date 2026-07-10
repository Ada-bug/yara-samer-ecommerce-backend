const express = require('express');
const router = express.Router();

const categoriesContoller = require('../controllers/categoriescontroller');

router.post('/', categoriesContoller.createCategory)
router.get('/', categoriesContoller.getCategories);
router.get('/:id', categoriesContoller.getCategoryById);
router.patch('/:id', categoriesContoller.updateCategory);
router.delete('/:id', categoriesContoller.deleteCategory);

module.exports = router;
