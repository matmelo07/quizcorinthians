let currentQuestion = 0;
let correctAnswer = 0;

showQuestions();

document.querySelector(".scoreArea button").addEventListener('click', resetEvent);

function showQuestions(){
    if(questions[currentQuestion]){
       let q = questions[currentQuestion];
       let pct = Math.floor((currentQuestion / questions.length) * 100);

       document.querySelector('.progress--bar').style.width = `${pct}%`;

       document.querySelector('.scoreArea').style.display = 'none';
       document.querySelector('.questionArea').style.display = 'block';
       document.querySelector('.question').innerHTML = q.question;
       let optionsHtml = '';
          for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;

          }

          document.querySelector('.options').innerHTML= optionsHtml;

          document.querySelectorAll('.options .option').forEach(item =>{
             item.addEventListener('click', optionClickEvent);
          });
    }else{

        finishQuiz();
    }

    
}

function optionClickEvent(e){
    let clickedOption =  parseInt(e.target.getAttribute('data-op'));
      if(questions[currentQuestion].answer === clickedOption){
          correctAnswer++;
      }
      currentQuestion++;
      showQuestions();
}
function finishQuiz(){
    let points = Math.floor((correctAnswer/questions.length) * 100);

    if(points > 30 && points < 60 ){
        
        document.querySelector('.scoreArea img').src = "legalcima.png";
        document.querySelector('.scoreText1').innerHTML = "Muito bom";
        document.querySelector('.scorePct').style.color = "#ffff00";
    }else if(points < 30){
        
        document.querySelector('.scoreArea img').src= "legal.png"
        document.querySelector('.scoreText1').innerHTML = "Ta ruim hein?!";
        document.querySelector('.scorePct').style.color = "red";
    
    }else if(points > 60){
        document.querySelector('.scoreArea img').src = "prize.png";
        document.querySelector('.scoreText1').innerHTML = "Parabéns";
        document.querySelector('.scorePct').style.color = "green";
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Voce respondeu ${questions.length} e acertou ${correctAnswer}`;
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;
}

function resetEvent(){
    correctAnswer = 0;
    currentQuestion = 0;
    showQuestions();
}