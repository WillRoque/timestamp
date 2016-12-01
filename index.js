var express = require('express');
var app = express();

app.get('/:date', (req, res) => {
    var unixTimestamp = null;
    var naturalLanguage = null;
    
    // The parameter is an Unix timestamp
    if (isNumber(req.params.date)) {
        unixTimestamp = parseInt(req.params.date);
        
        // converts the timestamp (in seconds) to milliseconds
        var date = new Date(unixTimestamp * 1000);
        naturalLanguage = dateToText(date);
        
    // The parameter might be a date in text format
    } else {
        // Verifies if it is a valid date
        var date = new Date(req.params.date);
        
        if (isValidDate(date)) {
            naturalLanguage = dateToText(date);
            
            // converts the time (in milliseconds) to seconds
            unixTimestamp = date.getTime() / 1000; 
        }
    }
    
    res.json({
        'unix': unixTimestamp,
        'natural': naturalLanguage
    });
});

function isNumber(str) {
    return !Number.isNaN(parseInt(str)) && Number.isFinite(parseInt(str));
}

function isValidDate(date) {
    return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
}

function dateToText(date) {
    var month = date.toLocaleDateString('en-us', { month: 'long' });
    return month + ' ' + date.getDate() + ', ' + date.getFullYear();
}

app.listen(process.env.PORT, () => console.log('Timestamp API running on port ', process.env.PORT));