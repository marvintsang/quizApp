const STORE = [
    {     
	    question: 'What does it mean to be fit?',
		answers: [
        'Look good without a shirt on',
		'Be under a BMI of 25',
		'Be able to sell tea',
        'Healthy and sustainable lifestyle'
        ],
        correct: 'Healthy and sustainable lifestyle'
    }, 
	{
        question: 'What is the best type of exercise to lose weight?',
        answers: [
		'Weight training',
		'Cardio',
		'HIIT (High Intensity Interval Training)',
        'Circuit training'
        ],
        correct:'Weight training'
    },	
	{
        question: 'What is the best diet protocol to lose weight?',
        answers: [
		'Ketogenic diet',
		'Whole 30',
		'Intermittent Fasting',
        'Caloric Deficit'
        ],
        correct:'Caloric Deficit'
    },
	{	
        question: 'What is the recommended daily caloric intake for men and women?',
        answers: [
		'1500F/2000M',
		'1700F/2200M',
		'2000F/2500M',
        '1000F/1500M'
        ],
        correct: '2000F/2500M'
    },
    {
        question:'Which one of these methods is the most effective way to get stronger?',
        answers: [
		'Linear Periodization',
		'Daily Undulating Periodization',
		'Bulgarian Method',
        'Daily Maxouts'
        ],
        correct:'Linear Periodization'
    },
    {	
        question:`What is the best way for a beginner or someone who hasn't worked out in a while to start?`,
        answers:[
		'Simple stretches',
		'Short workouts',
		'Beast modes session',
        'Activity they enjoy doing'
        ],
        correct:'Activity they enjoy doing'
    },
    {	
        question:'How should a person deal with fatigue management?',
        answers:[
		'Deal with it',
		'Slowly increment higher volume',
		'Take deload days or weeks',
        'Improve sleep schedule, food intake'
        ],
        correct:'Improve sleep schedule, food intake'
    },
	{
        question:'How many times a week should a person exercise?',
        answers:[
		'3 times a week',
		'4 times a week',
		'5 times a week',
        '6 times a week'
        ],
        correct:'6 times a week'
    },
	{	
        question:'Where is the best place to get a workout in?',
        answers:[
		'Commercial gym',
		'Studio floor',
		'At home',
        'Anywhere',
        ],
        correct:'Anywhere'
    },
    {	
        question:'How should a person get started on their fitness journey?',
        answers:[
		'Consult a doctor before starting',
		'Finding a gym',
		'Getting accountability from friends or trainers',
        'All of the above'
        ],
        correct:'All of the above'
    }
]

let questionCounter = 0
let quizScore = 0

function startQuiz() {
    console.log('startQuiz initiated');
    $('.quizArea').on('click', '.startButton', function(event){
        $('.startButton').remove();
        nextQuestion();
    })
}
//renders the HTML into the quizArea
function nextQuestion(){
    $('.quizArea').html(onQuestion());
}
//returns the HTML for the question and answer inputs
function onQuestion(){
    return `
            <span class = "spanQuestion">${STORE[questionCounter].question}</span>
            <form>
            <div class = radioDiv><label for="radioA"><input type="radio" name="answer" id="radioA" value="${STORE[questionCounter].answers[0]}" required>${STORE[questionCounter].answers[0]}<br></label></div>
            <div class = radioDiv><label for="radioB"><input type="radio" name="answer" id="radioB" value="${STORE[questionCounter].answers[1]}" required>${STORE[questionCounter].answers[1]}<br></label></div>
            <div class = radioDiv><label for="radioC"><input type="radio" name="answer" id="radioC" value="${STORE[questionCounter].answers[2]}" required>${STORE[questionCounter].answers[2]}<br></label></div>
            <div class = radioDiv><label for="radioD"><input type="radio" name="answer" id="radioD" value="${STORE[questionCounter].answers[3]}" required>${STORE[questionCounter].answers[3]}<br></label></div>
            <button type="submit" id="submit">Submit</button>
            </form>
        `
}
//event listener for the submit function, grabs input and compares to correct answer
function submitAnswer(){    
    $('.quizArea').on('submit', function(event) { 
        event.preventDefault();
        let radiobutton = $('input:checked');
        let userAns = radiobutton.val();
        console.log(userAns);
        if (userAns === STORE[questionCounter].correct){
            correctAnswer();
        } else {incorrectAnswer()};  
    })
}
//when correct, add to quizScore and give a nextButton
function correctAnswer(){
    console.log('Nice, this is correct');
    quizScore++;
    $('#myScore').text(quizScore);
    $('.quizArea').html(`<p>You got the answer correct!</p>
    <button type=button class="nextButton">Next</button></div>`)
}
//when incorrect, give feedback on correct answer and give nextButton
function incorrectAnswer(){
    console.log('WRONG');
    $('.quizArea').html(`<p>That is incorrect. <span>The correct answer is "${STORE[questionCounter].correct}"</span></p>
    <button type=button class="nextButton">Next</button></div>`)
}
//event listener on nextButton, continues to next question or ends quiz
function feedbackContinue(){
    $('.quizArea').on('click', '.nextButton', function(event){
        if (questionCounter == STORE.length-1){
            quizOver();
        } else {
        questionCounter ++;
        $('#questionNum').text(questionCounter+1)
        nextQuestion();
        }
    })
}
//gives final score for quiz
function quizOver(){    
    $('.quizArea').html(`
    <span class="quizEnd">You've completed the quiz!</span>
    <span class="quizScored">Your score was ${quizScore}/10</span>
    <button type="button" id="restart">Restart?</button>`);
}
//reloads page to restart quiz
function quizRestart(){
    $('.quizArea').on('click','#restart',function(event){
        location.reload();
    })
}
//home button to restart quiz whenever user desires to
function homeRestart(){
    $('.scoreboard').on('click','#homeButton',function(event){
        location.reload();
    })
}
//essential functions with event listeners
function pageStart(){
    startQuiz();
    submitAnswer();
    quizRestart();
    feedbackContinue();
    homeRestart();
}
//initiate pageStart
$(pageStart);