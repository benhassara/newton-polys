// || ******************* TODO'S ******************* ||
// - deal with guesses oscillating between 2 values  ||
// - catch when derivative will evaluate to zero     ||
// - determine which tangent lines to display        ||
// - use MathJax to display polys nicely             ||
// || ********************************************** ||

var expr = math.parse('x^3-3*x^2-2*x');
var guesses = [];
var tanSlopes = [];

console.log(curveData('x^3-3*x^2-2*x', 'x^3-3*x^2-2*x', '#ff7f0e'));

lineData(1, 'x^3-3*x^2-2*x', math.diff(expr, 'x').toString(), null, null);
newton('x^3-3*x^2-2*x', math.diff(expr, 'x').toString(), 3);
console.log(makeLines(guesses, 'x^3-3*x^2-2*x', math.diff(expr, 'x').toString()));


function newton(func, dydx, guess) {
  // calculate next guess for root using Newton's method

  // accuracy
  var eps = 0.0001;
  var val = {x: guess};

  // append prev guess to array of slopes
  guesses.push(guess);
  tanSlopes.push(math.eval(dydx, val));

  // calc next guess
  var nextGuess = guess - (math.eval(func, val) / math.eval(dydx, val));

  // if within accuracy, return guess
  if ((Math.abs(guess - nextGuess) * 1 / eps) === 0) {
    return guess;
  }
  // check for wildly diverging guesses
  else if (Math.abs(guess - nextGuess) >= 100000) {
    return "Iterations diverging. Start over with a different initial guess.";
  }
  else {
    return newton(func, dydx, nextGuess);
  }
}

function testDerivative(dydx, val) {
  // test derivative value to avoid zero division

  if (math.eval(dydx, {x: val}) === 0)
    return false;
  return true;
}

function curveData(func, name, colorIn){
  /* return obj with data for nvd3 line chart

  func: string representing the polynomial

  return fmt: {
    values: [{x: val, y: val}, ...] - (x, y) coordinate pts
    key: 'Poly'              - the name for the series, displayed on chart
    color: '#ff7f0e'         - line color, optional
  }
  */

  var points = [];

  // loop through domain creating points
  for (var i = -4; i < 6; i+=0.25) {
    points.push({x: i, y: math.eval(func, {x: i})});
  }

  return {
    values: points,
    key: name,
    color: colorIn
  };
}

function lineData(xVal, func, dydx, name, colorIn) {
  // draw a straight line

  var points = [];
  var parser = math.parser();
  var slope = math.eval(dydx, {x: xVal});
  var f = math.eval(func, {x: xVal});

  // set vars in parsers scope
  parser.set('slope', slope);
  parser.set('fx', f);
  parser.set('x', xVal);


  // loop through domain creating points
  for (var i = -4; i < 6; i+=0.25) {
    parser.set('i', i);
    var yVal = parser.eval('slope * (i - x) + fx');
    points.push({x: i, y: yVal});
  }

  return {
    values: points,
    key: name,
    color: colorIn
  };
}

function makeLines(xVals, func, dydx) {
  var lines = [];

  for (i = 0; i < xVals.length; i++) {
    lines.push(lineData(xVals[i], func, dydx, 'x'+i, '#303340'));
  }

  return lines;
}

