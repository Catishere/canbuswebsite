const path = require('path');
const express = require('express');
const shell = require('shelljs');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

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
  shell.exec("cansend can0 " + cansignal);
});

app.post('/resetCan', function (req, res) {
  shell.exec("sudo ip link set can0 down");
  shell.exec("sudo ip link set can0 up");
});

app.post('/dump', function (req, res) {
  res.send(shell.exec("candump can0"));
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
