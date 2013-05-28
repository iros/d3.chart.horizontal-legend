/*! d3.chart.horizontal-legend - v0.1.0
 *  License: MIT Expat
 *  Date: 2013-05-27
 */
(function() {
  d3.chart('HorizontalLegend', {
    initialize: function() {
      var chart = this;

      // assign a top level class to the chart
      chart.base
        .classed('HorizontalLegend', true);

      // default height and width from container.
      chart.w = chart.base.attr('width');
      chart.h = chart.base.attr('height');

      // labels base container
      var labelsBase = chart.base.append('g')
        .classed('labels', true)
        .attr('height', chart.h)
        .attr('width', chart.w);

      // labels layer
      var labelsLayer = chart.layer('labels', labelsBase, {
          dataBind : function(scale) {

            // save scale - our data.
            chart.scale = scale;

            // in this case our data is the domain
            // of the scale!
            var domain = scale.domain();
            return this.selectAll('text')
              .data(domain);
          },

          insert : function() {

            // create two 
            var t = this.append('text')
              .attr('class', 'label');

            // separate each label to each side.
            t.attr('transform', function(d, i) {
                if (i === 0) {
                  return 'translate(0,0)';
                } else {
                  return 'translate(' + chart.w + ',0)';
                }
              })
              .attr('text-anchor', function(d, i) {
                if (i === 0) {
                  return 'start';
                } else {
                  return 'end';
                }
              })
              .attr('dy', chart.h - 3);

            return t;
          }
        });

      // the actual boxes layer.
      var boxesBase = this.base
        .append('g')
        .classed('boxes', true)
        .attr('width', chart.base.attr('width'))
        .attr('height', chart.base.attr('height'));

      var boxesLayer = chart.layer('boxes', boxesBase, {

          // the data is a d3 color scale!
          dataBind : function(scale) {

            // save scale
            chart.scale = scale;

            // generate data array from domain equal
            // to the number of boxes our user wants
            var domain = scale.domain(),
                data = [];
            for(var i = domain[0];
                i <= domain[1];
                i+= (domain[1]-domain[0])/chart.b) {
              data.push(i);
            }

            // get the width of the labels on each end
            var labels = chart.layer('labels').selectAll('text')[0],
                leftWidth = labels[0].getBBox().width,
                rightWidth = labels[1].getBBox().width;

            // update box width to remove label widths
            chart.box_width = (chart.w - rightWidth - leftWidth -
              ((chart.b-1) * chart.pad)) / chart.b;

            // make an x scale that starts after the left label
            // and ends before the right label.
            chart.position_scale = d3.scale.linear()
              .domain(domain)
              .range([
                leftWidth + chart.pad,
                chart.w - rightWidth - chart.box_width - chart.pad
              ]);

            // clear all boxes from previous render
            this.selectAll('rect').remove();

            // select rects for the boxes and bind our data.
            return this.selectAll('rect').data(data);

          },
          insert : function() {
            return this.append('rect')
              .attr('y', 0)
              .attr('height', chart.h);
          }
        });

      function _onBoxesEnter() {
        return this
          .attr('x', function(d) {
            return chart.position_scale(d);
          })
          .attr('width', chart.box_width)
          .style('fill', chart.scale);
      }

      function _onLabelsEnter() {
        var domain = chart.scale.domain();

        return this.text(function(d) {
          // is this a percentage?
          if (domain[0] === 0 && domain[1] <= 1) {
            if (d > 0.01 || d === 0) {
              return d3.format('%')(d);
            } else {
              return d3.format('.1%')(d.toFixed(2));
            }
          } else {
            return d;
          }
        });
      }

      labelsLayer.on('enter', _onLabelsEnter);
      labelsLayer.on('update', _onLabelsEnter);
      boxesLayer.on('enter', _onBoxesEnter);
      boxesLayer.on('update', _onBoxesEnter);

      return chart;
    },

    // padding between boxes.
    padding : function(newPadding) {
      if (!arguments.length) {
        return this.pad;
      }
      this.pad = newPadding;

      this.box_width = (this.w - ((this.b - 1) * this.pad)) / this.b;

      // only repaint if we have data (in this case the scale)
      if (this.scale) { this.draw(this.scale); }

      return this;
    },

    // how many boxes should one render
    boxes : function(newBoxes) {
      if (!arguments.length) {
        return this.b;
      }

      this.b = newBoxes;

      this.box_width = (this.w - ((this.b-1) * this.pad)) / this.b;

      // only repaint if we have data (in this case the scale)
      if (this.scale) { this.draw(this.scale); }

      return this;
    },

    // width of legend
    width : function(newWidth) {
      if (!arguments.length) {
        return this.w;
      }
      // save new width
      this.w = newWidth;

      // adjust the x scale range
      this.x =  d3.scale.linear()
        .range([0, this.w]);

      // adjust the base width
      this.base.attr('width', this.w);

      // only repaint if we have data (in this case the scale)
      if (this.scale) { this.draw(this.scale); }

      return this;
    },

    // height of legend
    height : function(newHeight) {
      if (!arguments.length) {
        return this.h;
      }

      // save new height
      this.h = newHeight;

      // adjust the base width
      this.base.attr('height', this.h);

      // only repaint if we have data (in this case the scale)
      if (this.scale) { this.draw(this.scale); }

      return this;
    }

  });
}());