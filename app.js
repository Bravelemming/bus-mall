'use strict';

// Globals
var panelSectionTag = document.getElementById('panelOfChoices');
var leftImageTag = document.getElementById('leftPanel');
var centerImageTag = document.getElementById('centerPanel');
var rightImageTag = document.getElementById('rightPanel');
var totalClicks = 0;
var allowedClicks = 25;

// Variables to store the marketing objects already on the page
var leftImageOnPage = null;
var centerImageOnPage = null;
var rightImageOnPage = null;

//store previous values, so these choices won't appear in a row
var previousLeft = null;
var previousRight = null;
var previousCenter = null;

//constructor
var MarketingItem = function (name, imageSrc) {
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.url = imageSrc;
  MarketingItem.allImages.push(this);
};

//hold all marketing items after being constructed
MarketingItem.allImages = [];

//chart creation
function makeChart(id) {
  var chartId = document.getElementById(id);
  var percents = [];
  var names = [];
  var colors = [];
  var borders = [];

  for (var i = 0; i < MarketingItem.allImages.length; i++) {
    //create percentage
    var p = Math.round(MarketingItem.allImages[i].clicks / MarketingItem.allImages[i].timesShown * 100);
    //divide by zero, set to 0
    if ( isNaN(p) ){
      p = 0;
    }
    console.log('P: ', p);
    //save names and percents and colors
    percents.push( p );
    names.push( MarketingItem.allImages[i].name );
    colors.push( random_rgba() );
    borders.push( random_rgba() );
  }

  var chartData = {
    labels: names,
    datasets: [{
      label: '# of Votes',
      data: percents,
      backgroundColor: colors,
      borderColor: borders,
      borderWidth: 5
    }]
  };//end chartData
  var chartObject = {
    type: 'doughnut',
    data : chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };//end chartObject
  var busChart = new Chart(chartId, chartObject);
}//end CHART

//render three new images from the url
var renderNewImage = function (leftIndex, centerIndex, rightIndex){
  leftImageTag.src = MarketingItem.allImages[leftIndex].url;
  centerImageTag.src = MarketingItem.allImages[centerIndex].url;
  rightImageTag.src = MarketingItem.allImages[rightIndex].url;
};

//check values against previous values in last panel.
var checkPrevious = function (leftIndex, centerIndex, rightIndex) {
  var repeat = true;
  //if any values are repeated, return true
  if (leftIndex === previousLeft || leftIndex === previousCenter || leftIndex === previousRight) {return repeat;}
  if (centerIndex === previousLeft || centerIndex === previousCenter || centerIndex === previousRight) {return repeat;}
  if (rightIndex === previousLeft || rightIndex === previousCenter || rightIndex === previousRight) {return repeat;}
  //if values are unique, return false.
  return false;
};

var pickItemFromArray = function(){
  do {
    //don't forget about that horrible off by one error!
    var leftIndex = getRandomInt(0, MarketingItem.allImages.length-1);
    var centerIndex = getRandomInt(0, MarketingItem.allImages.length-1);
    var rightIndex = getRandomInt(0, MarketingItem.allImages.length-1);
    //check previous selections, if any were preivously selected do it again.
    var repeat = checkPrevious(leftIndex, centerIndex, rightIndex );
    //continue until left, right, and center are not the same.
  } while (leftIndex === rightIndex || centerIndex === leftIndex || centerIndex === rightIndex || repeat);

  //assign current index positions into temp holders
  previousLeft = leftIndex;
  previousCenter = centerIndex;
  previousRight = rightIndex;

  //set index values and render
  leftImageOnPage = MarketingItem.allImages[leftIndex];
  centerImageOnPage = MarketingItem.allImages[centerIndex];
  rightImageOnPage = MarketingItem.allImages[rightIndex];
  renderNewImage(leftIndex, centerIndex, rightIndex);
};

var handleClickOnMarketing = function(event){
  //do allowedClicks times, set in global above.
  if(totalClicks < allowedClicks){
    //target a smaller bit of code.
    var thingWeClickedOn = event.target;
    var id = thingWeClickedOn.id;

    if(id === 'leftPanel' || id === 'centerPanel' || id === 'rightPanel'){

      if(id === 'leftPanel'){
        leftImageOnPage.clicks++;
      }
      if(id === 'centerPanel'){
        centerImageOnPage.clicks++;
      }
      if(id === 'rightPanel'){
        rightImageOnPage.clicks++;
      }

      //update times shown
      leftImageOnPage.timesShown++;
      centerImageOnPage.timesShown++;
      rightImageOnPage.timesShown++;
      //choose new pictures
      pickItemFromArray();
    }
  }//end total clicks check

  //TODO: add an else here to remove the event listener and display results.  maybe keep generating a new model each time?
  // increment amount of clicks
  totalClicks++;
  //when they reach total max clicks, remove the event listener
  if(totalClicks === allowedClicks){
    panelSectionTag.removeEventListener('click', handleClickOnMarketing);

    //TODO: add a innerhtml to empty string here to reset.

    //call our function to display results here
    //displayResults();
    makeChart('myChart');

  }
};

//add event listener
panelSectionTag.addEventListener('click', handleClickOnMarketing);

//TODO: read data from a file.
// Create Image objects
new MarketingItem('bag', './assets/bag.jpg');
new MarketingItem('banana', './assets/banana.jpg');
new MarketingItem('bathroom', './assets/bathroom.jpg');
new MarketingItem('boots', './assets/boots.jpg');
new MarketingItem('breakfast', './assets/breakfast.jpg');
new MarketingItem('bubblegum', './assets/bubblegum.jpg');
new MarketingItem('chair', './assets/chair.jpg');
new MarketingItem('cthulhu', './assets/cthulhu.jpg');
new MarketingItem('dog-duck', './assets/dog-duck.jpg');
new MarketingItem('dragon', './assets/dragon.jpg');
new MarketingItem('pen', './assets/pen.jpg');
new MarketingItem('pet-sweep', './assets/pet-sweep.jpg');
new MarketingItem('scissors', './assets/scissors.jpg');
new MarketingItem('shark', './assets/shark.jpg');
new MarketingItem('sweep', './assets/sweep.png');
new MarketingItem('tauntaun', './assets/tauntaun.jpg');
new MarketingItem('unicorn', './assets/unicorn.jpg');
new MarketingItem('usb', './assets/usb.gif');
new MarketingItem('water-can', './assets/water-can.jpg');
new MarketingItem('wine-glass', './assets/wine-glass.jpg');

//initial call to populate panels
pickItemFromArray();


