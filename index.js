const express = require('express')
const app = express()
const  { Client }  = require('pg')
const bp = require('body-parser')

app.use(bp.json())
app.use(bp.urlencoded({extended:true}))

const db = new Client({
    host: 'localhost',
    user: 'postgres',
    database: 'unhan-backend-app2',
    port: 5432,
    password: 'postgres'
})

db.connect((err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log(`connected to database ${db.database}`)
})

app.get('/',(req,res)=>{
    db.query(`SELECT * FROM links`,(err,results)=>{
        if(err){
            console.log(err)
            return
        }
        res.send(results.rows)
    })

})

app.post('/insert',(req,res)=>{
    db.query(`INSERT INTO links(url,name,description) 
        values('${req.body.url}','${req.body.name}','${req.body.description}')`
    ,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.send(`URL berhasil ditambahkan ke database`)
    })
})

app.put('/update',(req,res)=>{
    db.query(`UPDATE links set name='${req.body.name}' where url='${req.body.url}' `,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.send(`URL dengan nama ${req.body.name} berhasil diupdate`)
    })
})

app.delete('/delete',(req,res)=>{
    db.query(`DELETE FROM links where url='${req.body.url}'`,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.send(`URL berhasil dihapus`)
    })
})

app.listen(5000,()=>{
    console.log(`Server berjalan di port 5000`)
})

