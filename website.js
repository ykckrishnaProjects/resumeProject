var express = require('express');
var nodeMailer = require('nodemailer');
var bodyParser = require('body-parser');
var flash = require('express-flash-messages');
var app = express();
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

app.post('/send-email', function (req, res) {

	nodeMailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodeMailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
     let mailOptions = {
          from: req.body.email, // sender address
          to: '"Krishna" <ykc.krishna.projects@gmail.com>', // list of receivers
          subject:"Message from:" + req.body.nameOfSender, // Subject line
          text: req.body.comment, // plain text body
          html: "<b>Hurray!Email from Personal Website</b>" // html body
      };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
   
          res.setHeader('Content-Type', 'application/json');

			//mimic a slow network connection
			setTimeout(function(){

			res.send(JSON.stringify({
			message: req.body.nameOfSender || null
			}));
		    }, 1000)
      
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

app.use('*',function(req,res) {
res.send('Error 404:Not Found!');
});

app.listen(3000, function() {
console.log('Example App Listening on port 3000!');
});
