const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const short = require('shortid');
const path = require('path');
const scrape = require('html-metadata');
require('dotenv').config();

const app = express();
const router = express.Router();
const port = process.env.API_PORT || 3001;

mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const Schema = mongoose.Schema;
const AssessmentSchema = new Schema({
  text: String,
  url: String,
  title: String,
  shortId: String,
  checkValues: Array,
  checkedItems: Array,
  checkedFilters: Array,
  notApplicable: Array,
  notes: Object,
  team: String,
  owners: Object,
  createdAt: Date,
  updatedAt: Date
});
const TeamSchema = new Schema({
  name: String,
  url: String,
  shortId: String,
  createdAt: Date
});
const AssessmentDefaults = {
  checkValues: [ 'onlyBLAR', 'phase1', 'phase2', 'phase3', 'phase4', 'dev', 'UX', 'production', 'editorial', 'live' ],
  title: 'New Assessment'
};

const Assessment = mongoose.model('Assessment', AssessmentSchema);
const Team = mongoose.model('Team', TeamSchema);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
router.get('/', (req, res) => {
  Team.find({}, (error, teams) => {
    Assessment.find({}, (err, docs) => {
      console.log('err', err);
      res.json({
        docs, teams
      });
    });
  });
});

router.post('/new', (req, res) => {
  const {
    url,
    title,
    checkValues,
    notes
  } = req.body;
  const shortId = short.generate();
  const assessment = new Assessment({
    url,
    title,
    shortId,
    checkValues,
    notes
  });
  assessment.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.json(assessment);
    }
  });
});

router.get('/delete/:id', (req, res) => {
  Assessment.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/');
    }
  });
});

router.post('/update/:id', (req, res) => {
  Assessment.findOneAndUpdate({ shortId: req.params.id }, req.body, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('successfully updated');
    }
  });
});
router.post('/create', (req, res) => {
  const shortId = short.generate();
  const now = Date.now();
  const { url, team } = req.body;

  const newAssessment = Object.assign({}, AssessmentDefaults, {
    shortId,
    updatedAt: now,
    createdAt: now,
    team,
    url
  });

  scrape(url).then((metadata) => {
    const assessmentWithTitle = Object.assign({}, newAssessment, {
      title: metadata.general.title
    });
    const assessment = new Assessment(assessmentWithTitle);

    assessment.save((err) => {
      if (err) res.send(err);
      res.redirect(`/${shortId}`);
    });
  }).catch((err) => {
    console.log(err);
    // Passed value is not a URL, use as title
    const assessmentWithTitle = Object.assign({}, newAssessment, {
      title: url
    });
    const assessment = new Assessment(assessmentWithTitle);
    assessment.save((saveErr) => {
      if (saveErr) res.send(saveErr);
      res.redirect(`/${shortId}`);
    });
  });
});
router.get('/create', (req, res) => {
  const shortId = short.generate();
  const now = Date.now();
  const newAssessment = Object.assign({}, AssessmentDefaults, {
    shortId,
    updatedAt: now,
    createdAt: now
  });
  const assessment = new Assessment(newAssessment);
  assessment.save((err) => {
    if (err) res.send(err);
    res.redirect(`/${shortId}`);
  });
});
router.post('/team/new', (req, res) => {
  console.log('new team created:', req.body.name);
  const shortId = short.generate();
  const now = Date.now();
  const team = new Team({
    shortId,
    name: req.body.name,
    createdAt: now
  });
  team.save((err) => {
    if (err) res.send(err);
    res.json(team);
  });
});


router.get('/:id', (req, res) => {
  Assessment.findOne({ shortId: req.params.id }, (error, doc) => {
    Team.find({}, (err, teamData) => {
      const docObj = Object.assign({}, { teams: teamData }, doc.toObject());
      res.json(docObj);
    });
  });
});
app.use('/api', router);

const mainPage = (req, res) => res.sendFile(path.resolve(__dirname, '.', './build', 'index.html'));

app.use('/', express.static(path.join(__dirname, './build')));
app.get('/', mainPage);
app.get('/:id', mainPage);

app.listen(port, () => {
  console.log('api running on port', port);
});
