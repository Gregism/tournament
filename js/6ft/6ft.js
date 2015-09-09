var chart = (function(){
  var svg, w, h;

  $(document).ready(function(){
    var holder = d3.select('#results');

    w = holder.style("width").replace("px", ""),
    h = 600;

    //createSvg(holder);
  })

  function drawBrackets(json){
    var data = $.extend(true, {}, json);
    createSvg(d3.select('#results'), data)
  }

  function createSvg(holder, brackets){
    var cluster = d3.layout.cluster()
      .size([h, w-100]);

    $('#results').find('svg').remove();

    svg = holder.append('svg')
      .attr({
        width: w,
        height: h
      })
      .append("g")
        .attr("transform", "translate(40,0)");

    var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x]; });
    
    if(brackets){
      consumeJson(brackets);
    } else {
      d3.json('../data/results.json', function(error, root) {
        if (error) throw error;
        consumeJson(root);
      });   
    }


    function consumeJson(root){
      var nodes = cluster.nodes(root),
          links = cluster.links(nodes);

      var link = svg.selectAll(".link")
          .data(links)
        .enter().append("path")
          .attr("class", "link")
          .attr("d", diagonal);

      var node = svg.selectAll(".node")
          .data(nodes)
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { 
            return "translate(" + d.y + "," + d.x + ")"; 
          })

      node.append("circle")
          .attr("cx", function(d) { return d.children ? 15 : -8; })
          .attr("r", 4.5);

      node.append("text")
          .attr("dx", function(d) { return d.children ? 5 : 8; })
          .attr("dy", 3)
          .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
          .text(function(d) { return d.name; });
    }

    d3.select(self.frameElement).style("height", h + "px");
  }

  return {
    drawBrackets: drawBrackets
  }

}());


    