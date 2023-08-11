const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/sbDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// More code will go here

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}...`));


const jobSeekerSchema = new mongoose.Schema({
    name: String,
    education: String,
    country: String,
    region: String,
    email: String,
    phone: String,
    skills: String,
    cv: String, // Path to the uploaded CV file
  });
  
  const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);

  const companySchema = new mongoose.Schema({
    company_name: String,
    industry: String,
    country: String,
    region: String,
    email: String,
    phone: String,
    website: String,
    description: String,
    certificate: String, // Path to the uploaded business certificate
  });
  
  const Company = mongoose.model('Company', companySchema);
  
  const multer = require('multer');
const upload = multer({ dest: 'uploads/' });





  app.post('/submit-job-seeker', upload.single("cv"), async(req, res) => {
    console.log("We are here");
    console.log(req.body, req.body.name);
    const jobSeeker = new JobSeeker({
        name: req.body.name,
        education: req.body.education,
        country: req.body.country,
        region: req.body.region,
        email: req.body.email,
        phone: req.body.phone,
        skills: req.body.skills,
        cv: req.file.path, // Path to the uploaded CV file
      });
      jobSeeker.save()
    .then(() => res.send('Registration successful!'))
    .catch(err => res.status(400).send(err.message));
});
      
  // app.post('/submit-job-seeker', upload.single('cv'), (req, res) => {
  //   // req.file contains information about the uploaded CV
  // });
  app.post('/submit-company', (req, res) => {
    const company = new Company({
        company_name: req.body.company_name,
        industry: req.body.industry,
        country: req.body.country,
        region: req.body.region,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website,
        description: req.body.description,
        certificate: req.file.path, // Path to the uploaded business certificate
      });
      company.save()
  .then(() => res.send('Registration successful!'))
  .catch(err => res.status(400).send(err.message));

      

  });
  app.post('/submit-company', upload.single('certificate'), (req, res) => {
    // req.file contains information about the uploaded business certificate
  });
    