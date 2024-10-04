const express = require('express');
const mongoose = require('mongoose');
const route = require('./route');

const app = express();


mongoose.connect('mongodb://localhost/smartedu-db').then(()=> {
    console.log('DB Connected Successfuly')
}).catch((err) => {
    console.log(err)
 });;


app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use('/',route);




// app.post('/courses',async (req, res) => {

//     // console.log('tamam');
   
//     // console.log(req.body);
       
//     res.status(201).json({
//               status: 'success',
               
//              })

// });





const port = 8000;
app.listen(port, () => {
    console.log(`Uygulama ${port} nolu port üzerinden başlatıldı!`);
});