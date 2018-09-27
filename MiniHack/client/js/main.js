$(document).ready(function () {
    // console.log(this.location.href);
    // $('#submit').on('click', function (e) {
    let rowEnd = 0;
    let url = new URL(window.location.href);
    let gameId = new URLSearchParams(url.search.slice(1)).get('id');
    console.log(gameId);
    $.ajax({
        url: `http://localhost:6969/game/${gameId}`,
        // url: 'http://localhost:6969/newgame',
        method: 'GET',
        success: function (data) {
            if (gameId != null) {


                $("#myTable").attr("data-id", data.game._id);
                $("#myTable").append(`
              
                <tr class="bg-danger">
            <th>    </th>
            <th>${data.game.name[0]}</th>
            <th>${data.game.name[1]}</th>
            <th>${data.game.name[2]}</th>
            <th>${data.game.name[3]}</th>
            </tr>
            <tr>
            <td>Sum of score(0)</td>
            <td class="total1">0</td>
            <td class="total2">0</td>
            <td class="total3">0</td>
            <td class="total4">0</td>  
            </tr>
           
            `);

                let round = data.game.round;
                for (var i = 1; i < round.length; i++) {
                    let a = round[i].roundId;

                    appendRow(a,round[i].score1,round[i].score2,round[i].score3,round[i].score4);

                }
                //setTxt total
                setTotal(round);
                //find row end
                rowEnd = round[round.length - 1].roundId == null ? 0 : round[round.length - 1].roundId;

                console.log("success!", data);
            }
        },
        error: function () {

            console.log("ERROR");
        }
    });
    $('#newRow').on('click', function () {
        ++rowEnd;

        appendRow(rowEnd,"","","","");
  
        console.log("12412213");
    });


    $("#myTable ").on('change', 'input', function (e) {
        let roundId = $(e.target).attr('data-id');
        let gameId = $("#myTable").attr('data-id');
        let score1 = $(`#score1${roundId}`).val();
        let score2 = $(`#score2${roundId}`).val();
        let score3 = $(`#score3${roundId}`).val();
        let score4 = $(`#score4${roundId}`).val();
        // console.log(gameId + " " + roundId + " " + score1 + " " + score2 + " " + score3 + " " + " " + score4);
        let dataScore = {
            gameId: gameId,
            roundId: roundId,
            score1: score1,
            score2: score2,
            score3: score3,
            score4: score4
        }
        $.ajax({

            url: 'http://localhost:6969/changeScore',
            method: 'PUT',
            // dataType:'html',
            data: dataScore,
            success: function (data) {
                setTotal(data.game.round);
                console.log("success!", data);

            },
            error: function (error) {

                console.log(error);
            }
        });



    });



});

function appendRow(a, score1, score2, score3, score4) {
    $("#myTable").append(`
                 
    <tr id="${a}">
    <td>round ${a}</td>
    <td><input class="score form-control" id="score1${a}" data-id="${a}" type='text' value="${score1}"></td>
    <td><input class="score form-control" id="score2${a}" data-id="${a}" type='text' value="${score2}"></td>
    <td><input class="score form-control" id="score3${a}" data-id="${a}" type='text' value="${score3}"></td>
    <td><input class="score form-control" id="score4${a}" data-id="${a}" type='text' value="${score4}"></td>  
    </tr>
   `);
}

function setTotal(round) {
    let totalScore1 = 0;
    let totalScore2 = 0;
    let totalScore3 = 0;
    let totalScore4 = 0;
    for (var i = 1; i < round.length; i++) {
        let a = round[i].roundId;
        totalScore1 += Number(round[i].score1 == "" ? 0 : round[i].score1);
        totalScore2 += Number(round[i].score2 == "" ? 0 : round[i].score2);
        totalScore3 += Number(round[i].score3 == "" ? 0 : round[i].score3);
        totalScore4 += Number(round[i].score4 == "" ? 0 : round[i].score4);
    }
    //setTxt total
    $(".total1").text("" + totalScore1);
    $(".total2").text("" + totalScore2);
    $(".total3").text("" + totalScore3);
    $(".total4").text("" + totalScore4);
}