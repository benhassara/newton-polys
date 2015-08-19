
function makeTable(parent, xVals) {
  // generate table for iterations of Newton's method

  var iterations = [];
  var values = [];

  for (var i = 0; i < xVals.length; i++) {
    iterations.push($('<td><var>x<sub>' + i + '</sub></var></td>'));
    values.push($('<td><var>' + xVals[i] + '</var></td>'));
  }

  for (i = 0; i < iterations.length; i++) {
    var tr = $('<tr>');
    tr.append(iterations[i]);
    tr.append(values[i]);
    parent.append(tr);
  }

  return parent;
}

function getColor(){
  // generate random hexadecimal color val

  var chars = '0123456789ABCDEF'.split('');
  var out = "#";

  for (var i = 1; i <= 6; i++) {
    var choice = Math.floor(Math.random() * chars.length);
    out += chars[choice];
  }

  return out;
}
