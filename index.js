const express = require("express");
const path = require("path");
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members')


const PORT = process.env.PORT || 5000;
/* about process.env.PORT
In many environments (e.g. Heroku), and as a convention, you can set the environment variable PORT to tell your web server what port to listen on.

So process.env.PORT || 3000 means: whatever is in the environment variable PORT, or 3000 if there's nothing there.

So you pass that to app.listen, or to app.set('port', ...), and that makes your server able to accept a "what port to listen on" parameter from the environment.

If you pass 3000 hard-coded to app.listen(), you're always listening on port 3000, which might be just for you, or not, depending on your requirements and the requirements of the environment in which you're running your server.
*/


// Initialize middleware
//app.use(logger);

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname,'public', 'index.html'));
// });

const x =10;


//initializing express object
const app = express();


// Handlebars Middleware
app.engine('handlebars', exphbs.engine({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Homepage Route
app.get('/',(req,res)=> res.render('index',{
    title: "Member App",
    members
}));

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//Members api routes
app.use('/api/members',require('./routes/api/members'));// routing 

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
