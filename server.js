const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const auth = require('./utils/auth');
const isHost = require('./utils/isHost');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// const http = require('http').Server(app);
// const io = require('socket.io')(http);

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ auth, isHost });

// Cookie information, probably shouldn't have the secret in plaintext
const sess = {
  secret: 'BT Bandits',
  cookie: {},
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// io.on('connection', () => {console.log('a user has connected')})

// app.use(function(req, res, next) {
//   req.io = io;
//   next();
// })

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Gathering tools... Identifying target... Waiting for breaktime... BANDITS ONLINE'));
});
