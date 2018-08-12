'use strict'

function generate(testLengthArray) {

  var array = [];
  for (var i = 0; i < testLengthArray.length; i++) {
    var input = [];
    for (var j = 0; j < testLengthArray[i]; j++) {
      input.push(Math.floor(Math.random() * 20000));
    }

    var target;
    if (i == 0) {
      target = input[0];
    } else if (i == 2) {
      target = input[input.length - 1];
    } else {
      target = Math.floor(Math.random() * 2000);
    }
    var output = search(input, target);
    var object = { "input": input, "target": target, "output": output };
    array.push(object);
  }
  return array;
}

function search(input, target) {
  for (var i = 0; i < input.length; i++) {
    if (input[i] == target) {
      return i;
    }
  }
  return -1;
}

module.exports = generate
