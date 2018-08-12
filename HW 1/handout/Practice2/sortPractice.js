'use strict'

function sort(input) {

  
  var swapped;
    do {
        swapped = false;
        for (var i=0; i < input.length-1; i++) {
            if (input[i] > input[i+1]) {
                var temp = input[i];
                input[i] = input[i+1];
                input[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
  return input;
  // return input.sort((a,b) => a-b); 
}

module.exports = sort
