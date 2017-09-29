/*********
chart.js
CDSS-hackathon-2017
September 23, 2017

Zach Bogart
Aakanksha Joshi
Youyang Liu

*********/

(function () {

  //margins
  var margin = { top: 40, left: 100, right: 90, bottom: 50},
      height = 500 - margin.top - margin.bottom,
      width = 800 - margin.left - margin.right;
  
  //chart
  var svg = d3.select("#chart")
      .append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Make scales
  //year
  var xPositionScale = d3.scaleLinear()
    .domain([2000,2016])
    .range([0,width])

  //money
  var yPositionScale = d3.scaleLinear()
    .domain([0,500000000000])
    .range([height,0])

  //color
  var colorScale = d3.scaleOrdinal()
    .range(['pink', 'lightblue', 'lightgreen'])

  //area
  var areaScale = d3.scaleSqrt()
    .domain([1,1200000])
    .range([5,50])

  //read in data
  d3.queue()
    .defer(d3.csv, "data/results.csv")
    .await(ready)

  //add axes
  //yAxis
  var yAxis = d3.axisLeft(yPositionScale);
    svg.append("g")
      .attr("class", "axis y-axis")
      .call(yAxis);
  
  //xAxis
  var xAxis = d3.axisBottom(xPositionScale)
  svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  //let's draw
  function ready(error, countries) {
    // console.log(countries)

    //defense spending
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

    //NASA
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

    //EPA
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
