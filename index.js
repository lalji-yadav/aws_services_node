var express = require('express')
var app = express();
var AWS = require('aws-sdk');
var bodyParser = require('body-parser')
const multer  = require('multer')

var port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const upload = multer({ dest: 'uploads/' })
app.post('/s3',upload.single('fileData'), (req, res)=> {

    const s3 = new AWS.S3({
        accessKeyId: '',
        secretAccessKey: ''
    })

    console.log('file data', req.file);

    // const filename = 'the-file-name'
    //const fileContent = fs.readFileSync(fileName)
   // var aa = 'AA'
   // var bb ="bb"

    const params = {
    Bucket: 'laljibucket',
    Key: req.file.originalname,
    Body: req.file.path,
    //ACL:'public-read'
    }

    s3.upload(params, (err, data) => {
    if (err) {
        console.log('error', err);
    }
    //resolve(data.Location)
    console.log('data', data);
    })

})

app.listen(port,()=> {
    console.log('running on port',`${port}`);
})
