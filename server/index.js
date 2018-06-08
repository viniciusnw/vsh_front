var express = require('express');

var port = process.env.PORT || 3000;
var path = __dirname + '/../src/views';

var app = express();

app.use(express.static(path, {
    maxAge: 24 * 60 * 60 * 1000
}));

app.listen(process.env.PORT || 3000, function () {
    console.log('Server running on port: %s', port)
});
