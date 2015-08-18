// handle creating a graph from a given polynomial

var ex = new Newton('x^3-3*x^2-2*x', 3, [-2, 5]);
ex.roots(ex.guess);

nv.addGraph(function() {
  var chart = nv.models.lineChart()
                .margin({left: 60})
                .useInteractiveGuideline(true)
                .showLegend(true)
                .showYAxis(true)
                .showXAxis(true)
  ;

  chart.xAxis.axisLabel('x');

  chart.yAxis.axisLabel('y');

  // var curve = [curveData('x^3-3*x^2-2*x', 'x^3-3*x^2-2*x', '#9099BF')];
  var curve = [ex.curveData(ex.func, '#9099BF')];
  // var lines = makeLines(guesses, 'x^3-3*x^2-2*x', math.diff(expr, 'x').toString());
  var lines = ex.makeLines(ex.guesses);

  var myData = [curve[0]];
  for (var i = 0; i < lines.length; i++) {
    myData.push(lines[i]);
  }

  d3.select('#graph svg').datum(myData)
                         .transition().duration(350)
                         .call(chart);

  nv.utils.windowResize(function(){chart.update();});
  return chart;
});
