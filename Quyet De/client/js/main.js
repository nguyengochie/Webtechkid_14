$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:6969/question',
        method: 'GET',
        success: function (data) {
            $('#questionContent').text(data.question.content);
            $('.answer').attr("data-id", data.question._id);
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
        // console.log(dataAnswer.YN, questionId);
        $.ajax({
            
            url: 'http://localhost:6969/answer',
            method: 'PUT',
            // dataType:'html',
            data: dataAnswer,
            success: function (data) {
                if (data.question) {
                    let totalVote = data.question.yes + data.question.no;
                    $('#vote').text(totalVote);
                    $('#voteYes').text(((data.question.yes / totalVote) * 100).toFixed(2));
                    $('#voteNo').text(((data.question.no / totalVote) * 100).toFixed(2));
                    $('.questionInfo').css('display', 'block');
                    $('.answers').css('display', 'none');
                }
                console.log("success!", data);
            },
            error: function (error) {

                console.log(error);
            }
        });

    });
    $('#viewQuestionInfo').on('click', function (e) {
        let questionId = $('.answer:first-child').attr('data-id');
        $.ajax({
            url: `http://localhost:6969/question/${questionId}`,
            method: 'GET',
            success: function (data) {
                if (data.question) {
                    let totalVote = data.question.yes + data.question.no;
                    $('#vote').text(totalVote);
                    $('#voteYes').text(((data.question.yes / totalVote) * 100).toFixed(2));
                    $('#voteNo').text(((data.question.no / totalVote) * 100).toFixed(2));
                    $('.questionInfo').css('display', 'block');
                    $('.answers').css('display', 'none');
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    });
});