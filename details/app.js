const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const hbs = require('hbs');
const myModel1 = require('./models/mvc1');
const url = 'mongodb://0.0.0.0:27017/myNewDb1';
const upload = multer({ dest: 'uploads/' }); // specify the upload directory

app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(url).then(() => {
  console.log('Connected successfully');
}).catch((err) => {
  console.log(`Error is ${err}`);
});

app.get('/', (req, res) => {
  res.render('index');
});

// add the upload middleware to the post route
app.post('/users', upload.single('pdf'), async (req, res) => {
  const comingData = new myModel1({
    name: req.body.name,
    age: req.body.age,
    pdf: {
      data: req.file.buffer, // use the binary data buffer of the uploaded file
      contentType: req.file.mimetype // set the content type based on the uploaded file type
    }
  });
  try {
    const savedData = await comingData.save();
    res.json(savedData);
  } catch (err) {
    console.log(`Error is: ${err}`);
  }
});

app.listen(8000);
