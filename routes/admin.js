var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hotel', {useNewUrlParser: true, useUnifiedTopology: true});

var Schema = mongoose.Schema;

var kamarSchema = new Schema({
    noKamar: String,
    jmlKasur: String,
    fasilitas: String,
    harga: String
}, {collection: 'kamar'});

var kamarData = mongoose.model('kamarData', kamarSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  let data = {
  	layout: 'dashboard',
  	title: 'MyHotel',
  };
  res.render('admin/index', data);
});

// Informasi Hotel
router.get('/infoHotel', function(req, res, next) {
    let data = {
    layout: 'dashboard',
    title: 'MyHotel | Info-Hotel',
  };
  res.render('admin/infoHotel/index', data);
});


// Kelola Kamar
router.get('/kamarHotel', function(req, res, next) {
  kamarData.find()
  .then(function(doc){
    res.render('admin/kamarHotel/index', {items: doc});
  });
});


// Kelola Kamar Tambah
router.get('/tambah-data', function(req, res, next) {
    let data = {
    layout: 'dashboard',
    title: 'MyHotel | Tambah-Data',
  };
  res.render('admin/kamarHotel/add', data);
});


// Kelola Kamar Ubah
router.get('/ubah-data', function(req, res, next) {
    let data = {
    layout: 'dashboard',
    title: 'MyHotel | Edit-Data',
  };
  res.render('admin/kamarHotel/edit', data);
});


module.exports = router;