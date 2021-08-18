//Dummy Data
// let users = [
//     {id:1, name:"Adit", email:"adit@gmail.com"},
//     {id:2, name:"Adit", email:"adit@gmail.com"}
// ]

//Ambil model User
const User = require('../models/user')

module.exports = {
    index: (req, res)=>{
        /*
        //cek data
        if(users.length>0){
            res.json({
                status: true,
                data: users,
                method: req.method,
                url: req.url
            })
        }else{
            res.json({
                status: false,
                message:"Data user tidak ada"
            })
        }
        */

        User.find((erorr, data)=>{
            if(data<=0){
                res.send("Data masih kosong")
            }else{
                if(erorr){
                    console.log(erorr)
                }else{
                    res.json(data)
                }
            }     
        })
    },
    store: (req, res)=>{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        //Simpan
        user.save((error, data)=>{
            if(error){
                console.log(error)
            } else{
                console.log(data)
                res.send({
                    status: true,
                    data: data,
                    message:"Data user berhasil disimpan",
                    method: req.method,
                    url: req.url,
                })
            }
            
        })

        //res.redirect('/users')
        //console.log(req.body)
        /*
        users.push(req.body)
        res.send({
            status: true,
            data: users,
            message:"Data user berhasil disimpan",
            method: req.method,
            url: req.url,
        })
        */
       
    },
    update:  (req, res)=>{
        const id = req.params.id
        const name = req.body.name
        const data  ={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }

        User.findByIdAndUpdate(id,data, (err, result) => {
            if(err){
                res.send(err)
            }else{
                res.send({
                    status: true,
                    data: data,
                    message:"Data user berhasil diedit",
                    method: req.method,
                    url: req.url,
                })
            }
        })
        
        // users.filter(users=>{
        //     if(users.id == id){
        //         users.id = id
        //         users.name = req.body.name
        //         users.email = req.body.email
        //         return users
        //     }
        // })
        // res.json({
        //     status: true,
        //     data: users,
        //     message:"Data user berhasil diedit",
        //     method: req.method,
        //     url: req.url
        // })
    },
    delete: (req, res)=>{
        const id = req.params.userId
        // users = users.filter(users => users.id != id)
        // res.send(users)
            
            User.findByIdAndDelete(id, (err) => {
             if(err){
                console.log(err)
             }else{
                res.send({
                    message:"Data user berhasil dihapus",
                    method: req.method,
                    url: req.url,
                })
             } 
            })
    },
    detail: (req, res) =>{
        const id = req.params.id
        User.findById(id,(err, data)=>{
            if(data<=0){
                res.send("Data tidak ditemukan")
            }else{
                if(err){
                    console.log(err)
                }else{
                    res.send(data)
                }
            }
        })
    }
}