const mongoose = require('mongoose')    //memanggil mongoose untuk mongodb
const {Schema} = mongoose       //Schema = struktur table

//Struktur Tabel User
const userSchema = new Schema({
    name: String,
    email: String,
    password: String
},{
    timestamps:true
})

//Jadikan Model
//Nama tabel otomatis User
const User = mongoose.model('User', userSchema)
module.exports = User