const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const can = require('socketcan');

var channel = can.createRawChannel("can0", true);

// Log any message
channel.addListener("onMessage", function(msg) { console.log(msg); } );

// Reply any message
channel.addListener("onMessage", channel.send, channel);

channel.start();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'www')));

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

const port = 3000;

app.post('/form', function (req, res) {
  var cansignal = req.body.cansignal;
});

app.post('/connect', function (req, res) {
  ssh.connect({
    host: 'localhost',
    username: 'pi',
    privateKey: '/home/pi/.ssh/id_rsa'
  })
});

app.post('/resetCan', function (req, res) {
});

app.post('/dump', function (req, res) {
});

app.get('/', (req, res) => {
  res.render('home', {
    name: 'Master'
  });
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`)
});
