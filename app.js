const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('INDEX SAYFASI');

});

const port = 8000;
app.listen(port, () => {
    console.log(`Uygulama ${port} nolu port üzerinden başlatıldı!`);
});