const express = require('express')
const userRouter = require('./routes/users')    //memanggil modul router user
const app = express()
const mongoose = require('mongoose')    //memanggil mongoose untuk mongodb

//Koneksi Database, otomatis membuat database db_blog
mongoose.connect('mongodb://127.0.0.1:27017/db_blog', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Koneksi Database Berhasil");
  })
  .catch((err) => {
    console.error(`Koneksi Database Gagal\n${err}`);
  });

//AKSES API
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
  next();
})

//Request body / permintaan dari form / Middlewere
app.use(express.json()) //untuk parsing json
app.use(express.urlencoded({extended: true}))   //untuk parsing form
app.get('/', (req, res)=>{
  const home = {
    title:"Home",
    author:"Aditya"
  }
    res.json(home)
})

app.get('/about', (req, res)=>{
    const about = {
      nama:"Aditya",
      umur:'22 Tahun'
    }
    res.json(about)
})

app.use(userRouter)

app.listen(8000, ()=> console.log("Server berjalan di http://localhost:8000"))