/*********
*
* D3 example #02:
* Using the margin convention
* Circles
* Dynamic SVG insertion
* Reading in external data
* selectAll/append/etc
*
*********/

(function () {

  /*
   
   WE WILL USE THIS CODE LATER, LEAVE IT COMMENTED OUT FOR NOW

  */

  // Always cut and paste this code to get a height and width
  // with some nice padding around the edges
  var margin = { top: 40, left: 100, right: 90, bottom: 50},
      height = 500 - margin.top - margin.bottom,
      width = 800 - margin.left - margin.right;
  
  // Grab the SVG from the page, set the height and width
  var svg = d3.select("#chart")
      .append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  //year
  var xPositionScale = d3.scaleLinear()
    .domain([2000,2016])
    .range([0,width])

  //money
  var yPositionScale = d3.scaleLinear()
    .domain([0,500000000000])
    .range([height,0])

  //don't have to give this a domain
  var colorScale = d3.scaleOrdinal()
    .range(['pink', 'lightblue', 'lightgreen'])

  //contracts
  var areaScale = d3.scaleSqrt()
    .domain([1,1200000])
    .range([5,50])


  // Read in some external data. When we're done, run the function 'ready'
  d3.queue()
    .defer(d3.csv, "data/results.csv")
    .await(ready)


  var yAxis = d3.axisLeft(yPositionScale);
    svg.append("g")
      .attr("class", "axis y-axis")
      .call(yAxis);

    var xAxis = d3.axisBottom(xPositionScale)
    svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);


  // This is 'ready':
  // it receives an error (if there is one)
  // and datapoints, our newly-read-in data

  function ready(error, countries) {
    // console.log(countries)

    // d3 code goes here
    svg.selectAll(".defense")
      .data(countries)
      .enter().append("circle")
      .attr("class", ".defense")
      .attr("r", function(d) {
        return areaScale(d.contracts)
      })
      .attr("cx", function (d) {
        return xPositionScale(d['year'])
      })
      .attr("cy", function (d) {
        return yPositionScale(d['money'])
      })
      .attr("fill", function (d) {
        return colorScale(d.type)
      })
      .attr("opacity", 0.25)

    svg.selectAll(".nasa")
      .data(countries)
      .enter().append("circle")
      .attr("class", ".nasa")
      .attr("r", function(d) {
        return areaScale(d.contracts)
      })
      .attr("cx", function (d) {
        return xPositionScale(d['year'])
      })
      .attr("cy", function (d) {
        return yPositionScale(d['money'])
      })
      .attr("fill", function (d) {
        return colorScale(d.type)
      })
      .attr("opacity", 0.25)

    svg.selectAll(".env")
      .data(countries)
      .enter().append("circle")
      .attr("class", ".env")
      .attr("r", function(d) {
        return areaScale(d.contracts)
      })
      .attr("cx", function (d) {
        return xPositionScale(d['year'])
      })
      .attr("cy", function (d) {
        return yPositionScale(d['money'])
      })
      .attr("fill", function (d) {
        return colorScale(d.type)
      })
      .attr("opacity", 0.25)

    

    

  }

})()