var timeLeft;
var stripp;
var qBank;
var nextLevel;
var timer;
var highScore;

$(document).ready(function(){
  $('#inputs .input-bar').hide();
  { //Slider
    $( "#slider-range-max" ).slider({
      range: "max",
      min: 10,
      max: 100,
      value: 20,
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.value );
      }
    });
    $( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );
  }

  { //Strip function
    // stripp = function(x){
    //   return x.replace('+"+"+','+');
    //   // x = x.replace('+"-"+','-');
    //   // x = x.replace('+"x"+','*');
    //   // x = x.replace('+"/"+','/');
    //   // return x;
    // };

    stripp = function(input){
      var output = input;
      output = output.replace(' x ', '*');
      output = output.replace(' ÷ ', '/');
      return output;
    };
  }

  { //Question bank
    qBank = function(){
      var choices = [$('#add'),$('#subtract'),$('#multiply'),$('#divide'),$('#squared'),$('#sqroot')]
      var ticked = [];
      var i =0;
      while (i < choices.length) {
        if (choices[i].prop("checked") == true){
          ticked.push(choices[i].data('symbol'));
          i++;
        }
        else {
          i++;
        }
      }
      var rando = (Math.random()*(ticked.length-1)).toFixed(0);
      var choiceSymbol;
      switch(ticked[rando]){
        case 'add':
          return (Math.random()*$('#amount').val()).toFixed(0) + ' + ' + (Math.random()*$('#amount').val()).toFixed(0); 
          break;
        case 'subtract':
          return (Math.random()*$('#amount').val()).toFixed(0)+" - "+(Math.random()*$('#amount').val()).toFixed(0);
          break;
        case 'multiply':
          return (Math.random()*$('#amount').val()).toFixed(0)+" x "+(Math.random()*$('#amount').val()).toFixed(0);
          break;
        case 'divide':
          var num1 = Math.floor(Math.random()*Math.sqrt($('#amount').val()));
          var num2 = Math.floor(Math.random()*Math.sqrt($('#amount').val()));
          if (num2 == 0){
            num2++;
          }
          var num3 = num1 * num2;
          return num3+" ÷ "+num2;
          break;
        case 'squared':
          var num2 = Math.floor(Math.random()*$('#amount').val());
          if (num2 == 0){
            num2++;
          }
          return num2+" x "+num2;
        case 'sqroot':
          var num2 = Math.floor(Math.random()*$('#amount').val());
          if (num2 == 0){
            num2++;
          }
          return num2+" ÷ "+num2;
      }
      // return (Math.random()*$('#amount').val()).toFixed(0)+choiceSymbol+(Math.random()*$('#amount').val()).toFixed(0);
    };
  }

  { //Testing answers if correct
    nextLevel = function(){
      var ask = qBank();
      $('#questions').text(ask);
      highScore = 0;
      $(document).keyup(function(){
        if ($('.input-bar').val() == eval(stripp((ask)))){
          highScore++;
          timeLeft+=1.3;
          $('#questions').effect('highlight', 'faster');
          // $('.question-block').prepend('<div id="questions">');
          ask = qBank();
          $('#questions').text(ask);
          $('.input-bar').val("");
        }
        else {
          console.log('web dev fail')
        }
      });
    };
  }

  { //Timer function
    $(document).on('click', '.start-button', function(){
      timeLeft = 10;
      $('#timer').text('START!');
      nextLevel();
      $('.input-bar').show();
      $('.input-bar').select();
      $('.start-button').hide();
      var timer = setInterval(function(){
        if (timeLeft > 0) {
          $('#timer').text(timeLeft.toFixed(0));
          console.log(timeLeft);
          timeLeft--;
        }
        else {
          clearInterval(timer);
          $('#timer').text(highScore+"pts");
          $('#questions').text('GAME OVER');
          $('.start-button').text('REPLAY?');
          $('.input-bar').hide();
          $('.start-button').show();
        }
      }, 1000);
    });
  }

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