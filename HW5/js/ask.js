// const questionInput = document.getElementById('questioninput');
// const count = document.getElementById('count');

// questionInput.addEventListener("input",function(){
//     // console.log(questionInput.nodeValue,questionInput.nodeValue.length);
//     count.innerText = 200 - questionInput.value.length ;

// });
$(document).ready(function () {

    var maxlength = 200;

    $('#questioninput').on({
        keyup: function () {
            var length = $(this).val().length;
            var length = maxlength - length;
            $('#count').text(length);
        },
        mouseleave: function () {
            var length = $(this).val().length;
            var length = maxlength - length;
            $('#count').text(length);
        }
    });

});