const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
let app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

app.listen(6969, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("server is listening at port 6969!");
    }
});

app.get('/', (req, res) => {
    res.send("Hello World");

});

app.use(cors()); // request cho nhau

app.get('/question', (req, res) => {
    fs.readFile('./questions.txt', (err, fileData) => {
        if (err) console.log(err);
        else {
            try {
                let questions = JSON.parse(fileData);
                let randomNum = Math.floor(Math.random() * questions.length);
                let randomQuestion = questions[randomNum];
                res.send({
                    message: "success!",
                    question: randomQuestion
                });
            } catch (error) {
                console.log("ERROR", err);
            }
        }
    })
});

app.put('/answer', (req, res) => {
    // console.log("hihi vao roi");
    // console.log(req.body.ID);
    fs.readFile('./questions.txt', (err, data) => {
        if (err) console.log(err);
        else {
            try {
                // console.log("file data : " + data);

                let questions = [];
                if (data != "" && JSON.parse(data).length) {
                    questions = JSON.parse(data);
                }
            
                for (var i = 0; i < questions.length; i++) {
                    if (questions[i].id == req.body.ID) {
                      
                        if ((req.body.YN) == "yes") {
                            questions[i].yes += 1;
                        }
                        if (req.body.YN == "no") {
                            // console.log(questions[i].no);
                            questions[i].no += 1;
                        }
                    }
                }


                // console.log("hi:", newQuestion);
                fs.writeFile('./questions.txt', JSON.stringify(questions), (err) => {
                    if (err) console.log(err);
                    else {
                        res.redirect('http://localhost:8080');
                        console.log("Success write!");
                    }

                    //http://localhost:6969/


                });
            } catch (error) {
                console.log(error);
            }
        }
    });


});

app.post('/ask', (req, res) => {
    console.log("Hihi vao roi!");
    // req.on('data',(data)=>{

    // });
    fs.readFile('./questions.txt', (err, data) => {
        if (err) console.log(err);
        else {
            try {
                console.log("file data : " + data);

                let questions = [];
                if (data != "" && JSON.parse(data).length) {
                    questions = JSON.parse(data);
                }
                const newQuestion = {
                    id: questions.length + 1,
                    questionContent: req.body.question,
                    yes: 0,
                    no: 0

                }
                questions.push(newQuestion);
                // console.log("hi:", newQuestion);
                fs.writeFile('./questions.txt', JSON.stringify(questions), (err) => {
                    if (err) console.log(err);
                    else res.redirect('http://localhost:8080/ask.html');
                    //http://localhost:6969/


                });
            } catch (error) {
                console.log(error);
            }
        }
    });
    // console.log("Question : ", req.body.question);
});