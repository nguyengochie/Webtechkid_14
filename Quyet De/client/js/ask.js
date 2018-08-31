// const questionInput = document.getElementById('questioninput');
// const count = document.getElementById('count');

// questionInput.addEventListener("input",function(){
//     // console.log(questionInput.nodeValue,questionInput.nodeValue.length);
//     count.innerText = 200 - questionInput.value.length ;

// });
$(document).ready(function () {

    $('#questioninput').on("input", function () {
        var length = $(this).val().length;
        var length = 200 - length;
        $('#count').text(length);

    });
});