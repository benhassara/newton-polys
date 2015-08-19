// || ******************** TODO'S ********************* ||
// || - deal with guesses oscillating between 2 values  ||
// || - catch when derivative will evaluate to zero     ||
// || - determine which tangent lines to display        ||
// || - use MathJax to display polys nicely             ||
// || - generate table for Newton's Method iterations   ||
// || - add functionality for user set domain           ||
// || ************************************************* ||

// var expr = math.parse(' ');
// var guesses = [];
// var tanSlopes = [];

// console.log(curveData('x^3-3*x^2-2*x', 'x^3-3*x^2-2*x', '#ff7f0e'));

// lineData(1, 'x^3-3*x^2-2*x', math.diff(expr, 'x').toString(), null, null);
// newton('x^3-3*x^2-2*x', math.diff(expr, 'x').toString(), 3);
// console.log(makeLines(guesses, 'x^3-3*x^2-2*x', math.diff(expr, 'x').toString()));

function Newton(func, guess, domain) {
  this.func = func;
  this.name = 'f(x)';
  this.expr = math.parse(func);
  this.dydx = math.diff(this.expr, 'x').toString();
  this.dydxExpr = math.diff(this.expr, 'x');
  this.guess = guess;
  this.domain = domain;
  this.guesses = [];
  this.tanSlopes = [];
  this.ans = null;
  this.yRight = null;
  this.yLeft = null;
}

Newton.prototype.roots = function(guess) {
  // calculate root aproximation with Newton-Raphson method

  // accuracy
  var eps = 0.001;
  var val = {x: guess};

  // append prev guess and slope (derivative evaluated at guess)
  this.guesses.push(guess);
  this.tanSlopes.push(math.eval(this.dydx, val));

  // calc next guess
  var nextGuess = guess - (math.eval(this.func, val) / math.eval(this.dydx, val));

  // if within accuracy, return guess
  if ((Math.abs(guess - nextGuess) * 1 / eps) === 0) {
    this.ans = guess;
    return guess;
  }
  else if (Math.abs(guess - nextGuess) >= 100000) {
    return "Iterations diverging. Start over with a different guess.";
  }
  else {
    return this.roots(nextGuess);
  }
};

Newton.prototype.testDerivative = function(val) {
  // test derivative evaluated at val to avoid zero division

  if (math.eval(this.dydx, {x: val}) === 0)
    return false;
  return true;
};

Newton.prototype.curveData = function(name, setColor) {
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
  for (var i = this.domain[0]; i <= this.domain[1]; i+=0.10) {
    points.push({x: i, y: math.eval(this.func, {x: i})});
  }

  // set y boundaries
  this.setYRight();
  this.setYLeft();

  return {
    values: points,
    key: name,
    color: setColor
  };
};

Newton.prototype.lineData = function(xVal, name, setColor) {
  // draw straight line representing 1 iteration of method

  var points = [];
  var parser = math.parser();
  // dydx evaluated at iteration pt
  var slope = math.eval(this.dydx, {x: xVal});
  // fx evaluated at iteration pt
  var f = math.eval(this.func, {x: xVal});

  // set vars in parser's scope
  parser.set('slope', slope);
  parser.set('fx', f);
  parser.set('x', xVal);

  // loop through domain creating points
  for (var i = this.domain[0]; i <= this.domain[1]; i+=0.10) {
    parser.set('i', i);
    var yVal = parser.eval('slope * (i - x) + fx');
    points.push({x: i, y: yVal});
  }

  return {
    values: points,
    key: name,
    color: setColor
  };
};

Newton.prototype.makeLines = function(xVals) {
  // generate lines for iterations of method

  var lines = [];

  for (i = 0; i < xVals.length; i++) {
    lines.push(this.lineData(xVals[i], 'x'+i, getColor()));
  }

  return lines;
};

Newton.prototype.setYRight = function() {
  // get right int boundary for y val of curve on domain

  val = math.eval(this.func, {x: this.domain[1]});

  if (val < 0) {
    this.yRight = Math.floor(val);
  }
  else {
    this.yRight = Math.ceil(val);
  }
  return this.yRight;
};

Newton.prototype.setYLeft = function() {
  // get left int boundary for y val of curve on domain

  val = math.eval(this.func, {x: this.domain[0]});

  if (val < 0) {
    this.yLeft = Math.floor(val);
  }
  else {
    this.yLeft = Math.ceil(val);
  }

  return this.yLeft;
};
