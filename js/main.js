// add scripts

$(document).on('ready', function() {
  // placeholder for Newton obj
  var newt = null;
  var root = null;

  $('#ans').hide();
  $('#graph').hide();
  $('#newt-table').hide();

  // form submission handler
  $('#get-poly').on('submit', function(event){
    event.preventDefault();

    // cache a few divs
    // var $('#')

    $('#graph svg').empty();

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
                    .y(function(d){return math.round(d.y, 7);});

      // label axes
      chart.xAxis.axisLabel('x');
      chart.yAxis.axisLabel('y');

      // generate curve and tangent lines plot points
      var curve = newt.curveData(newt.name, '#9099BF');
      var lines = newt.makeLines(newt.guesses);

      var myData = [curve];
      for (var i = 0; i < lines.length; i++) {
        myData.push(lines[i]);
      }

      d3.select('#graph svg').datum(myData)
                             .transition().duration(350)
                             .call(chart);

      nv.utils.windowResize(function(){chart.update();});
      return chart;

    });

    // make table
    makeTable($('#newt-table-body'), newt.guesses);

    // add final root approximation above table
    $('#ans-root').html(root);

    $('#graph').show();
    $('#ans').show();
    $('#newt-table').show();

  });


});
