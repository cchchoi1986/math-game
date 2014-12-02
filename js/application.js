$(document).ready(function(){

  $(function() {
    $( "#slider-range-max" ).slider({
      range: "max",
      min: 10,
      max: 100,
      value: 10,
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.value );
      }
    });
    $( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );
  });

  var timeLeft = 10;

  var stripp = function(x){
    return x.replace('+"+"','');
  }
  
  $(document).on('click', '.start-button', function(){
    timeLeft = 10;
    $('#inputs .start-button').remove();
    var timer = setInterval(function(){
      if (timeLeft >= 0) {
        $('#timer').text(timeLeft);
        console.log(timeLeft);
        timeLeft--;
      }
      else {
        clearInterval(timer);
        $('.input-bar').after('<button class="start-button">Click to Play</button>');
      }
    }, 1000)
  });

  var rando = function(){
    return (Math.random()*$('#amount').val()).toFixed(0)+"+"+(Math.random()*$('#amount').val()).toFixed(0);
  }

  var qBank = function(){
    var ask = rando();
    $('#questions').text(ask);
    $(document).keyup(function(){
      if ($('.input-bar').val() == eval(stripp(ask))){
        timeLeft++;
        ask = rando();
        $('#questions').text(ask);
        $('.input-bar').val("");
      }
      else {
        console.log('web dev fail');
      }
    });
  }
  qBank();

});

/*
// timer 
  var timeLeft = 10;
  var timer = function(){
    setInterval(function(){
      console.log(timeLeft);
      timeLeft--;
    }, 1000)
  }

// random number between 0 and 1;
  Math.random
// random number between 0 and 40 rounded;
  (Math.random()*40).toFixed(0);
*/