const { nextTick } = require('async');
var Category = require('../models/category');
var Item = require('../models/item');
var async = require('async');

// Display overview with stats
exports.overview = function (req, res){
    res.render('index', {title: 'Overview'});
}

// Display list of all items in specific category
exports.category_list = function (req, res, next){
    Category.findOne({ 'name': req.params.category }, function (err, docs) { 
        if (err) {
            return next(err);
        }
        else{ 
            async.series({
                allItems: function (callback) {
                    Item.find({ 'category': docs.id })
                    .exec(callback);
                }            
            }, function (err, results) {
                if (err) { 
                    var err = new Error('Item not found');
                    err.status = 404;
                    return next(err);
                }
                if (results.allItems == null) {
                    var err = new Error('Not found');
                    err.status = 404;
                    return next(err);
                }
                res.render('category_list', { item_list: results.allItems });
                }
            );
        } 
    });
}