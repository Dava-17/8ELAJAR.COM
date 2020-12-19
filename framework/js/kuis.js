(function() {
  var questions = [{
    question: 'Berapa jumlah dari 2x5',
    choices: [2, 5, 10, 15, 20],
    correctAnswer: 2
  }, {
    question: 'sadaasfasfa',
    choices: [3, 6, 9, 12, 18],
    correctAnswer: 4
  }, {
    question: "Berapa Hasil dari 8*9?",
    choices: [72, 99, 108, 134, 156],
    correctAnswer: 0
  }, {
    question: "Berapa Hasil dari 8*9?",
    choices: [72, 99, 108, 134, 156],
    correctAnswer: 0
  }, {
    question: "Berapa Hasil dari 8*9?",
    choices: [72, 99, 108, 134, 156],
    correctAnswer: 0
  }, {
    question: "Berapa Hasil dari 8*9?",
    choices: [72, 99, 108, 134, 156],
    correctAnswer: 0
  }, {
    question: "Berapa Hasil dari 8*9?",
    choices: [72, 99, 108, 134, 156],
    correctAnswer: 0
  }, {
    question: "Berapa Hasil dari 8*9?",
    choices: [72, 99, 108, 134, 156],
    correctAnswer: 0
  }, {
    question: "Berapa Hasil dari 1*7?",
    choices: [4, 5, 6, 7, 8],
    correctAnswer: 3
  }, {
    question: "Berapa Hasil 8*8?",
    choices: [20, 30, 40, 50, 64],
    correctAnswer: 4
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var pilihan = $('#pilihan'); //pilihan div object


  $(document).ready(function(){
     if($( window ).width() < 512){
         $('#nextm').append("<i class='fa fa-chevron-right' aria-hidden='true'></i>");
     }else{
         $('#nextm').append("Selanjutnya <i class='fa fa-angle-double-right' aria-hidden='true'></i>");
     }
  });
  
  $(document).ready(function(){
     if($( window ).width() < 512){
         $('#prevm').append("<i class='fa fa-chevron-left' aria-hidden='true'></i>");
     }else{
         $('#prevm').append("<i class='fa fa-angle-double-left' aria-hidden='true'></i> Sebelumnya");
     }
  });


  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
   
    // Suspend click listener during fade animation
    if(pilihan.is(':animated')) {       
      return false;
    }
    choose();
   
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      questionCounter++;
      displayNext();
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
   
    if(pilihan.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'SUBMIT' button
  $('#submit').on('click', function (e) {
    e.preventDefault();
   
    // Suspend click listener during fade animation
    if(pilihan.is(':animated')) {       
      return false;
    }
    choose();
   
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      questionCounter++;
      displayNext();
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
   
    if(pilihan.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
   
    var question = $('<p>' + (index + 1) + ') '+" "+'</p>').append(questions[index].question);
    qElement.append(question);
   
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
   
    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $("<div class='ol'>");
    var item;
    var labels;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<div class="li">');
      labels = $('<label for='+i+' value='+i+'></label>');
      input = '<input type="radio" id='+i+' name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      labels.append(input);
      item.append(labels);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    pilihan.fadeOut(function() {
      $('#question').remove();
     
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        pilihan.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
       
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').css("visibility","visible");
          $('#submit').css("visibility","hidden");
        } if(questionCounter === 8){
          $('#prev').css("visibility","visible");
          $('#next').css("visibility","visible");
          $('#submit').css("visibility","hidden");
        }
        if(questionCounter === 9) {
          $('#submit').css("visibility","visible");
          $('#next').css("visibility","hidden");
        }
          else if(questionCounter === 0){
          $('#submit').css("visibility","hidden");
          $('#prev').css("visibility","hidden");
          $('#next').show();
          $('#restart').hide();
        }
      }else {
        var scoreElem = displayScore();
        pilihan.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#submit').hide();
        $('#soal').hide();
        $('#restart').show();
        $('#main').css("height","510px");
        $('#pilihan').css("margin-left","0px");
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<div>',{id: 'hasil'});
   
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
   
    score.append(numCorrect*10 + ' / ' + "100");

    if (numCorrect < 7) {
      score.append("<br><p id='rendah'>Belajar Lagi Ya Semangat !</p>");
    } if (numCorrect === 7 || numCorrect ==8 ) {
      score.append("<br><p id='sedang'>Lebih Teliti Lagi Ya &#128525;</p>");
    } if (numCorrect >= 9) {
      score.append("<br><p id='tinggi'>Wah Kamu Hebat Tingkatkan !</p>");
    }
    return score;
  }
})();