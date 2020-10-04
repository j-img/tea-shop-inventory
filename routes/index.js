var express = require('express');
const category = require('../models/category');
var router = express.Router();

var categoryController = require('../controllers/categoryController');
var itemController = require('../controllers/itemController');


router.get('/', categoryController.overview);
// tea, coffee, yerba, accessories

router.get('/item/:id', itemController.detail);

router.get('/create', itemController.item_create_get);
router.post('/create', itemController.item_create_post);

router.get('/item/:id/update', itemController.item_update_get);
router.post('/item/:id/update', itemController.item_update_post);

router.get('/item/:id/delete', itemController.item_delete_get);
router.post('/item/:id/delete', itemController.item_delete_post);

router.get('/category/:category', categoryController.category_list);

module.exports = router;
