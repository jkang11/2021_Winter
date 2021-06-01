var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
type: 'bar',
data:{
labels: ["White", "African American", "Asian", "Hispanic", "Two or More", "Other"],
datasets: [{
data: [58, 11, 6, 13, 9, 2],
backgroundColor: [
'rgba(255, 99, 132, 0.2)',
'rgba(54, 162, 235, 0.2)',
'rgba(255, 206, 86, 0.2)',
'rgba(75, 192, 192, 0.2)',
'rgba(153, 102, 255, 0.2)',
'rgba(255, 159, 64, 0.2)'
],
borderColor: [
'rgba(255,99,132,1)',
'rgba(54, 162, 235, 1)',
'rgba(255, 206, 86, 1)',
'rgba(75, 192, 192, 1)',
'rgba(153, 102, 255, 1)',
'rgba(255, 159, 64, 1)'
],
borderWidth: 2
}]
},
options: {
legend: {
display: false
},
scales: {
xAxes: [{
gridLines: {
display: false
},
ticks: {
fontFamily: "Cursive",
fontSize: 13,
}
}],
yAxes: [{
ticks: {

min: 0,
max: 100,
callback: function(value){return value+ "%"}
},

}]
}
}
});
