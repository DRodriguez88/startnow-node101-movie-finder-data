const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
var dataCache = [
    ['title', {'dataObj':'objData'}]
];

const app = express();
app.use(morgan('dev'));

app.get('/',function(req,res){
    if (req.query.i){
        var movieId = req.query.i
        for (let i=0; i<dataCache.length; i++){
            if (movieId == dataCache[i][0]){
                res.send(dataCache[i][1]);
            }
            else{
                axios.get('http://www.omdbapi.com/?i=' + encodeURI(movieId) + '&apikey=8730e0e')
                    .then(function(response){
                        res.send(response.data);
                        newData = [];
                        newData.push(movieId);
                        newData.push(response.data);
                        dataCache.push(newData)
                    });
            }
        }
    }
    else if (req.query.t){
        var movieTitle = req.query.t;
        for (let i=0; i<dataCache.length; i++){
            if(movieTitle == dataCache[i][0]){
                res.send(dataCache[i][1]);
            }
            else{
                axios.get('http://www.omdbapi.com/?t=' + encodeURI(movieTitle) + '&apikey=8730e0e')
                    .then(function(response){
                        res.send(response.data);
                        newData = [];
                        newData.push(movieTitle);
                        newData.push(response.data);
                        dataCache.push(newData)
                    })
            }
        }
    }
    else{
        res.send('Query Unrecognized')
    }
});

module.exports = app;