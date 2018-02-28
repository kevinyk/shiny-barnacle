var Users = require('./../controllers/users.js');
module.exports = function(app){
    app.post('/api/users', Users.create);
    app.post('/api/login', Users.login);
    app.get('/api/users/current', Users.getCurrent);
    app.all('*', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/breakout-app/dist/index.html'));
    })
}