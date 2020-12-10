
var express = require('express');
var app = express();
const request = require('request');
const router = express.Router()
const bodyParser = require('body-parser');
const sanitizer = require('sanitizer');

// Import in the sql libraries
const { sql, poolPromise } = require('./DB/dbPool')

//const routes = require( "./routes" );

// Set up the server
// process.env.PORT is related to deploying on AWS
var server = app.listen(process.env.PORT || 5000, listen);
module.exports = server;
path = require('path');

//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Inject your routes in here
app.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('');
    //console.table(result.recordset);
    res.render('public/index.ejs', { movies: result.recordset });

  }
  catch (err) {
    res.status(500);
    res.send(err.message);
  }
});
app.get('/movieSelection', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('EXEC [dbo].[getMovieName]');
    // console.table(result.recordset);
    res.render('Public/movieSelection', { movies: result.recordset });
  }
  catch (err) {
    res.status(500);
    res.send(err.message);
  }
});
app.post('/movieSelection', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('input_param', sql.NVarChar, '%' + req.body.txtSearch + '%')
      .query('EXEC dbo.MovieSearchByText @input_param;');
    //console.table(result.recordset);
    res.render('Public/movieSelection', { search: true, movies: result.recordset });
  }
  catch (err) {
    res.status(500);
    res.send(err.message);
  }
});
app.get('/movieDescription/:id', async (req, res) => {
  try {
    const inputVal = sanitizer.sanitize(req.params.id);
    const pool = await poolPromise;
    const result = await pool.request()
      .input('input_parameter', sql.Int, inputVal)
      .query('EXEC [dbo].[getMoviebyID] @input_parameter;');
    //console.table(result.recordset);
    res.render('public/movieDescription', { movie: result.recordset[0] });

  }
  catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// gets for all the movie genre tabs
app.get('/Action', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('EXEC [dbo].[getMovieActionGenre]');
    //console.table(result.recordset);
    res.render('public/movieSelection', { movies: result.recordset });

  }
  catch (err) {
    res.status(500);
    res.send(err.message);
  }

});

app.get('/Comedy', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('EXEC [dbo].[getMovieComedyGenre]');
    //console.table(result.recordset);
    res.render('public/movieSelection', { movies: result.recordset });

  }
  catch (err) {
    res.status(500);
    res.send(err.message);
  }

});

app.get('/Horror', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('EXEC [dbo].[getMovieHorrorGenre]');
    //console.table(result.recordset);
    res.render('public/movieSelection', { movies: result.recordset });

  }
  catch (err) {
    res.status(500);
    res.send(err.message);
  }

});

app.get('/Drama', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('EXEC [dbo].[getMovieDramaGenre]');
    //console.table(result.recordset);
    res.render('public/movieSelection', { movies: result.recordset });

  }
  catch (err) {
    res.status(500);
    res.send(err.message);
  }

});

app.get('/Anime', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('EXEC [dbo].[getMovieAnimeGenre]');
    //console.table(result.recordset);
    res.render('public/movieSelection', { movies: result.recordset });

  }
  catch (err) {
    res.status(500);
    res.send(err.message);
  }

});

app.post('/movieDescription', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('EXEC [dbo].[getMovieName]');
    // console.table(result.recordset);
    res.render('public/movieDescription', { movies: result.recordset });
  }
  catch (err) {
    res.status(500);
    res.send(err.message);
  }
});
// End routes
// Set the folder for public items
publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir))
app.set('views', __dirname);
app.use(express.urlencoded({ extended: true }))

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://' + host + ':' + port);
}
