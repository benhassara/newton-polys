// add scripts

$(document).on('ready', function() {
  // placeholder for Newton obj
  var newt = null;
  var root = null;

  $('#graph').hide();
  $('#newt-table').hide();

  // form submission handler
  $('#get-poly').on('submit', function(event){
    event.preventDefault();

    $('#graph svg').empty();
    // $('#newt-table')

    // get vals
    var poly = $('#poly').val();
    var guess = $('#guess').val();
    var domain = [+$('#min').val(), +$('#max').val()];

    // make Newton obj
    newt = new Newton(poly, guess, domain);
    root = newt.roots(newt.guess);

    // make graph
    nv.addGraph(function() {

      var chart = nv.models.lineChart()
                    .margin({left: 60})
                    .useInteractiveGuideline(true)
                    .showLegend(true)
                    .showYAxis(true)
                    .showXAxis(true)
                    .forceX(newt.domain)
                    .forceY([newt.yLeft, newt.yRight])
                    .y(function(d){return math.round(d.y, 7);})
    ;

      chart.xAxis.axisLabel('x');

      chart.yAxis.axisLabel('y');

      var curve = [newt.curveData(newt.name, '#9099BF')];
      var lines = newt.makeLines(newt.guesses);

      var myData = [curve[0]];
      for (var i = 0; i < lines.length; i++) {
        myData.push(lines[i]);
      }

      d3.select('#graph svg').datum(myData)
                             .transition().duration(350)
                             .call(chart);

      nv.utils.windowResize(function(){chart.update();});
      console.log(chart.legend);
      return chart;

    });

    // make table
    makeTable($('#newt-table'), newt.guesses);

    $('#graph').show();
    $('#newt-table').show();

  });


});
