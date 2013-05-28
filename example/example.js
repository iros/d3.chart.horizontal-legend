/* global d3 */
(function() {
  var scales = d3.scale.linear()
    .range(["red", "blue"])
    .interpolate(d3.interpolateLab);

  var legend = d3.select("#vis")
    .append("svg")
    .chart("HorizontalLegend")
    .height(20)
    .width(250)
    .padding(12)
    .boxes(7);

  legend.draw(scales);

  // wider + many boxes
  var legend2 = d3.select("#vis2")
    .append("svg")
    .chart("HorizontalLegend")
    .height(20)
    .width(500)
    .padding(2)
    .boxes(50);

  legend2.draw(scales);

  // numeric scale, faux gradient
  var scales2 = d3.scale.linear()
    .range(["red", "blue"])
    .domain([10,500])
    .interpolate(d3.interpolateLab);

  var legend3 = d3.select("#vis3")
    .append("svg")
    .chart("HorizontalLegend")
    .height(20)
    .width(300)
    .padding(0)
    .boxes(30);

  legend3.draw(scales2);
}());