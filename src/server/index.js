const express = require('express');
var bodyParser = require('body-parser')

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', function(req, res) {
    res.sendfile('./dist/index.html');
});
app.post('/api/hello', (req, res) => {
    console.log(req.body);
    return res.send(req.body);
});

app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080}!`),
);
