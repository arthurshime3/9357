const express = require('express');

const app = express();

app.use(express.static('dist'));
app.use(express.json());

app.get('*', function(req, res) {
    res.sendfile('./dist/index.html');
});
app.post('/api/create', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080}!`),
);
