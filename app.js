const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('express-flash');

const keys = require('./config/keys');
const { formatDate, editIcon, truncate, stripTags, select } = require('./helpers/hbs');

////// DBへ接続
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
};

mongoose.connect(keys.mongoURI, options)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err.message));

////// モデルの読み込み
require('./models/User');
require('./models/Story');

require('./config/passport')(passport);


////// ルートの読み込み
const index = require('./routes/index');
const stories = require('./routes/stories');
const auth = require('./routes/auth');

const app = express();


////// CSSファイルの設定
app.use(express.static(path.join(__dirname, '/public')));


////// handlebarsを使用
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    formatDate: formatDate,
    editIcon: editIcon,
    truncate: truncate,
    stripTags: stripTags,
    select: select
  }
}));
app.set('view engine', 'handlebars');


////// 環境設定
app.use(methodOverride());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(flash());


////// グローバル変数の設定
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});


////// ルートの設定
app.use('/', index);
app.use('/stories', stories);
app.use('/auth', auth);

////// サーバーの設定
const myPort = process.env.PORT || 8080;
app.listen(myPort, () => {
  console.log(`Server started on port ${myPort}`);
});