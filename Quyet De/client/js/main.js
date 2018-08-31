$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:6969/question',
        method: 'GET',
        success: function (data) {
            $('#questionContent').text(data.question.questionContent);
            $('.answer').attr("data-id", data.question.id);
            console.log("success!", data);
        },
        error: function () {

            console.log("ERROR");
        }
    });
    
    $('.answer').on('click', function (e) {
        let answer = $(e.target).attr("data-answer");
        let questionId = $(e.target).attr('data-id');
        let dataAnswer = {
            YN: answer,
            ID: questionId
        };
        console.log(dataAnswer.YN, questionId);
        $.ajax({
            url: 'http://localhost:6969/answer',
            method: 'PUT',
            // dataType:'html',
            data:dataAnswer,
            success: function (data) {
             
                console.log("success!", data);
            },
            error: function () {
    
                console.log("error");
            }
        });
       
    });
});