// handle creating a graph from a given polynomial
// TODO

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

  var curve = curveData('x^3-3*x^2-2*x', 'x^3-3*x^2-2*x', '#9099BF');

  d3.select('#graph svg').datum(curve)
                         .transition().duration(350)
                         .call(chart);

  nv.utils.windowResize(function(){chart.update();});
  return chart;
});
