# d3.chart.horizontal-legend

A d3.chart based horizontal scale that takes a d3 color scale as data.
See examples in the `example` folder.

### Sample Use

```javascript

// color scale going from red to blue
// for the domain 10 - 500.
var colorScale = d3.scale.linear()
  .range(["red", "blue"])
  .domain([10,500])
  .interpolate(d3.interpolateLab);

var legend = d3.select("#vis3")
  .append("svg")
  .chart("HorizontalLegend")
  .height(20)
  .width(300)
  .padding(4)
  .boxes(30);

legend.draw(colorScale);
```

### API

#### `<instance>.height(newHeight)`

**Description:**

When value provided, sets the height of the legend (and subsequently boxes).
When no value provided, returns the current height.

**Parameters:**

* `newHeight` - Integer. Optional. New height.

**Uses:**

Example:

```javascript
var legend = d3.select("#vis3")
  .append("svg")
  .chart("HorizontalLegend")
  .height(20);
```

#### `<instance>.width(newWidth)`

**Description:**

When value provided, sets the width of the legend.
When no value provided, returns the current width.

**Parameters:**

* `newWidth` - Integer. Optional. New width.

**Uses:**

Example:

```javascript
var legend = d3.select("#vis3")
  .append("svg")
  .chart("HorizontalLegend")
  .width(120);
```

#### `<instance>.padding(newPadding)`

**Description:**

When value provided, sets the padding to be used between the boxes and between the boxes and labels.
When no value provided, returns the current padding.

**Parameters:**

* `newPadding` - Integer. Optional. Padding between boxes and between boxes and edge labels.

**Uses:**

Example:

```javascript
var legend = d3.select("#vis3")
  .append("svg")
  .chart("HorizontalLegend")
  .padding(5);
```

#### `<instance>.boxes(newBoxes)`

**Description:**

When value provided, sets the number of boxes to render in the legend
When no value provided, returns the number of boxes rendered.

**Parameters:**

* `newPadding` - Integer. Optional. Number of boxes to render

**Uses:**

Example:

```javascript
var legend = d3.select("#vis3")
  .append("svg")
  .chart("HorizontalLegend")
  .boxes(7);
```

### Events

This chart has no events. If you want any, please open an issue.