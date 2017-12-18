var morgan  = require('morgan');
Object.assign=require('object-assign');
var express = require('express');
var app = express();
app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";
var bodyParser = require('body-parser');
var router = express.Router();
var accountSid = 'ACaa0f7962a43faa226c1541ff3586f4a0'; 
var authToken = '7c347e3afb0105dd9ae483399dec10e2'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
//var fs = require('file-system');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var path = __dirname + '/views/';
app.use('/',router);
app.use(express.static(__dirname + '/public'));

router.get('/', function (req, res) {
	res.sendFile(path + 'index.html');
});

router.get('/contact', function (req, res) {
        res.sendFile(path + 'contact.html');
});

router.get('/download', function (req, res) {
        var file = __dirname + '/files/YKC_Resume.pdf';
  		res.download(file); ;
});


app.post('/send-sms', function (req, res) {
	client.messages.create({ 
    to: "+15158173243", 
    from: "+15154200101", 
    body: "Email:"+req.body.email+";Name:"+req.body.nameOfSender+";Message:"+req.body.comment, 
	}, function(err, message) { 
		if (err) {
            return console.log(err);
        }
        console.log(message.sid); 
	});

	 res.setHeader('Content-Type', 'application/json');

			//mimic a slow network connection
			setTimeout(function(){

			res.send(JSON.stringify({
			message: req.body.nameOfSender || null
			}));
		    }, 1000)

});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.use('*',function(req,res) {
res.send('Error 404:Not Found!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
