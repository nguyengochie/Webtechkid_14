
// funtionName(6);
// function funtionName(age){
//     console.log("hihi: "+age);
// }

// const hihi = function(age){
//     console.log("hoho:"+age);
// }


// const hihi = (age) => {
//     console.log("hoho:"+age);
// }
// var a =6;
// function print(num){
//     var b = 10;
//     console.log(a);
//     console.log(b);
// }
function count(num){
    for(let i = num;i>=0;i--){
        setTimeout(function(){
            console.log(i);
        },1000*(num-i));
        

        // (function(n) {
        //     setTimeout(function(){
        //         console.log(n);
        //     }, 1000*(num-i));
        // }
        // (i));

    }
}
var hihi  = count;
hihi(6);
count(5);