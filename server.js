const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('dist'));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});

app.get('*', function(req, res) {
    res.redirect('/');
});
