var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hotel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', function () {
    console.log("Database Sudah Terkoneksi");
});

const Kamar = mongoose.model('kamar', {
    noKamar: String,
    jmlKasur: String,
    fasilitas: String,
    harga : String
});


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
     Kamar.find((err, resData) => {
        let data = {
            layout: 'dashboard',
            title: 'MyHotel | Kelola-Kamar',
            kamar: resData
        };
        res.render('admin/kamarHotel/index', data);
    });
});


// Kelola Kamar Tambah
router.get('/tambah-data', function (req, res, next) {

    let data = {
        layout: 'dashboard',
        title: 'MyHotel | Tambah-Data',
    };
    res.render('admin/kamarHotel/add', data);
});

router.post('/tambah-data', function (req, res, next) {
    let dataKamar = req.body;
    let kamar = new Kamar(dataKamar);
    kamar.save().then(resData => {
        res.redirect('/admin/kamarHotel');
    }).catch(err => {
        res.status(400).send('Simpan Kamar Gagal!');
    });
});


// Kelola Kamar Ubah
router.get('/ubah-data/:id', function (req, res, next) {
    Kamar.findById(req.params.id, (err, resData) => {
        let data = {
            layout: 'dashboard',
            title: 'MyHotel | Ubah-Data',
            kamar: resData
        };
        res.render('admin/kamarHotel/edit', data);
    });
});

router.post('/ubah-data/:id/update', function (req, res, next) {
    let dataKamar = req.body;
    Kamar.findById(req.params.id, function (err, resData) {
        if (!resData) {
            res.status(404).send("data tidak ditemukan!");
        } else {
            resData.noKamar = dataKamar.noKamar;
            resData.jmlKasur = dataKamar.jmlKasur;
            resData.fasilitas = dataKamar.fasilitas;
            resData.harga = dataKamar.harga;
            
            resData.save().then(resData => {
                res.redirect('/admin/kamarHotel');
            })
        }
    });
});


// Kelola Kamar Hapus
router.get('/hapus-data/:id', function (req, res, next) {
    Kamar.findById(req.params.id, function (err, resData) {
        if (!resData) {
            res.status(404).send("data tidak ditemukan!");
        } else {            
            resData.delete().then(resData => {
                res.redirect('/admin/kamarHotel');
            })
        }
    });
});



module.exports = router;