var express = require ('express');
var router = express.Router();

var connection = require ("../config/database");
const Model_Kategori = require('../model/model_kategori');

router.get('/', async function(req, res, next){
    let rows = await Model_Kategori.getAll();
    res.render ('kategori/index',{
        data : rows
    })
})

router.get('/create', function(req,res){
    res.render('kategori/create', {
        nama: ''
    })
})

router.post ('/store', async function (req, res, next){
    try {
        let {nama_kategori} = req.body;
        let Data = {
            nama_kategori
        }
        await Model_Kategori.Store(Data);
        req.flash('success','berhasil menyimpan data');
        res.redirect('/kategori')
    } catch {
        req.flash('error','gagal menyimpan');
        res.redirect('/kategori')
    }

})

router.get('/edit/(:id)', async function (req, res, next){
    let id = req.params.id;
    let rows = await Model_Kategori.getId(id);
    res.render('kategori/edit',{
        id : rows[0].id_kategori,
        nama_kategori : rows[0].nama_kategori
    })

})

router.post('/update/(:id)', function(req, res, next){
    try {
        let id = req.params.id;
        let {nama_kategori} = req.body;
        let data = {
            nama_kategori : nama_kategori
        }
        connection.query('update kategori set ? where id_kategori =' + id,data, function(err){
            if (err){
                req.flash('error','gagal menyimpan');
            }else{
                req.flash('success','berhasil menyimpan data');
            }
            res.redirect('/kategori');
        } )
    } catch {
        req.flash('error','terjadi kesalahan di fungsi');
        res.render('/kategori');

    }
})

 router.get('/delete/(:id)', async function(req, res, next){
    let id = req.params.id;
    await Model_Kategori.Delete(id);
    req.flash('success','berhasil menghapus');
    res.redirect('/kategori')
 })

module.exports = router;