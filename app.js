const express = require('express');


const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('index', {
        page_name : 'index'
    });

});


app.get('/about', (req, res) => {
    res.render('about' , {
        page_name : 'about'
    });

});


const port = 8000;
app.listen(port, () => {
    console.log(`Uygulama ${port} nolu port üzerinden başlatıldı!`);
});