// var math = require('mathjs');

var expr = math.parse('x^3-3*x^2-2*x');

// console.log('If mathjs is working: ');
// console.log('math.sqrt(4): ', math.sqrt(4));

// console.log('If math.diff is working: ');
// console.log('math.diff(x^2): ', math.diff(expr, 'x').toString());

var guesses = [];
var tanSlopes = [];

console.log(newton('x^3-3*x^2-2*x', math.diff(expr, 'x').toString(), 3.25));
console.log('guesses: ', guesses);
console.log('slopes: ', tanSlopes);

function testDerivative(dydx) {
  // test derivative value, and make sure not falling into a zero division situation


}

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

  console.log('fx: ', math.eval(func, val));
  console.log('dydx: ', math.eval(dydx, val));
  console.log('guess: ', guess);
  console.log('nextGuess: ', nextGuess);
  console.log('\n');

  // if within accuracy, return guess
  if ((Math.abs(guess - nextGuess) * 1 / eps) === 0) {
    return guess;
  }
  else if (Math.abs(guess - nextGuess) >= 100000) {
    return "Iterations diverging. Start over with a different initial guess.";
  }
  else {
    return newton(func, dydx, nextGuess);
  }
}


