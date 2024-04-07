const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/book.routes')

const app = express();
app.listen(3000)

// register view engine
app.set('view engine', 'ejs')

// middleware and static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse application/json

app.get('/', (req, res) => {
	res.redirect('/books')
})

// books routes
app.use('/books', bookRoutes)

// 404 page
app.use((req, res) => {
	res.status(404).render('404', { title: '404' })
})