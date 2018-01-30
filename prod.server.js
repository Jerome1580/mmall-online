var express = require('express');
var axios = require('axios');

let port = process.env.PORT || 8088;

const app = express();
const apiRouter = express.Router();

// 获取登录校验，修改host
app.use('/user', function (req, res) {
    const host = 'www.happymmall.com';

    let url = host + '/user' + req.path;

    axios.post(url, {params: req.query}).then((response) => {
        res.json(response)
    }).catch((e) => {
        console.log(e)
    });
    res.end()

});

app.use(express.static('./dist'));

app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
});