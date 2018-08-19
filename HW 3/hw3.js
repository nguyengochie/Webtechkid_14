const express = require('express');
const path = require('path');
let app = express();
app.get('/', (request, respone) => {
    respone.send('hello '+request.query.name);
});

app.get('/:n', (request, respone) => {
  
    var name = request.params.n;
	respone.send('hello '+ name);
});
app.listen(6969, (err) => {
    if (err) console.log(err);
    else {
        console.log('Server is listening at port 6969!');
    }
});