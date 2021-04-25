const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

const NLU = new getNLUInstance();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req, res) => {
    const url = req.query.url;
    const params = {
        'url': url,
        'features': {
            "emotion": {
                'document': true
            }
        }
    }

    NLU.analyze(params)
        .then(response => {
            // console.log('Server side responding:')
            // console.log(response.result);
            res.send(response.result);
        })
        .catch(error => {
            return res.status(500).send({ success: false, message: "Error in /url/emotion" })
        });
});

app.get("/url/sentiment", (req,res) => {
    const url = req.query.url;
    const params = {
        'url': url,
        'features': {
            "sentiment": {
                'document': true
            }
        }
    }

    NLU.analyze(params)
        .then(response => {
            // console.log('Server side responding:')
            // console.log(response.result);
            res.send(response.result);
        })
        .catch(error => {
            return res.status(500).send({ success: false, message: "Error in /url/sentiment" })
        });
});

app.get("/text/emotion", (req,res) => {
    const text = req.query.text;
    const params = {
        'text': text,
        'features': {
            "emotion": {
                'document': true
            }
        }
    }

    NLU.analyze(params)
        .then(response => {
            // console.log('Server side responding:')
            // console.log(response.result);
            res.send(response.result);
        })
        .catch(error => {
            return res.status(500).send({ success: false, message: "Error in /text/emotion" })
        });
});

app.get("/text/sentiment", (req,res) => {
    const text = req.query.text;
    const params = {
        'text': text,
        'features': {
            "sentiment": {
                'document': true
            }
        }
    }

    NLU.analyze(params)
        .then(response => {
            // console.log('Server side responding:')
            // console.log(response.result);
            res.send(response.result);
        })
        .catch(error => {
            return res.status(500).send({ success: false, message: "Error in /text/sentiment" })
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

