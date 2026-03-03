var currentStep = 0;
var totalSteps = 6;
var selectedBodyParts = [];
var userAnswers = {};

// Initialize
updateProgress();

function updateProgress() {
    var progressContainer = document.getElementById('progressContainer');
    if (currentStep === 0 || currentStep === 7) {
        progressContainer.style.display = 'none';
        return;
    }
    progressContainer.style.display = 'block';
    var progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('currentStep').textContent = currentStep;
    document.getElementById('totalSteps').textContent = totalSteps;
    document.getElementById('progressPercent').textContent = Math.round(progress);
}

function nextStep(step) {
    document.getElementById('step' + currentStep).classList.remove('active');
    currentStep = step;
    document.getElementById('step' + currentStep).classList.add('active');
    updateProgress();
    if (step === 6) startCountdown();
    var quizEl = document.getElementById('quiz-section');
    if (quizEl) quizEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function selectOption(element, stepNum, nextStepNum) {
    var siblings = element.parentElement.querySelectorAll('.option-card');
    siblings.forEach(function (s) { s.classList.remove('selected'); });
    element.classList.add('selected');
    userAnswers['step' + stepNum] = element.querySelector('.option-text').textContent;
    setTimeout(function () { nextStep(nextStepNum); }, 400);
}

function toggleBodyPart(element) {
    element.classList.toggle('selected');
    var text = element.querySelector('.option-text').textContent;
    if (element.classList.contains('selected')) {
        selectedBodyParts.push(text);
    } else {
        selectedBodyParts = selectedBodyParts.filter(function (part) { return part !== text; });
    }
    var btn = document.getElementById('btn-step6');
    if (selectedBodyParts.length > 0) {
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
    } else {
        btn.style.opacity = '0.5';
        btn.style.pointerEvents = 'none';
    }
}

function startCountdown() {
    var seconds = 6;
    var countdownElement = document.getElementById('countdown');
    var timer = setInterval(function () {
        seconds--;
        countdownElement.textContent = seconds;
        if (seconds <= 0) {
            clearInterval(timer);
            nextStep(7);
        }
    }, 1000);
}

function showProducts() {
    var quizSection = document.getElementById('quiz-section');
    quizSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    quizSection.style.opacity = '0';
    quizSection.style.transform = 'translateY(-30px)';
    setTimeout(function () {
        quizSection.style.display = 'none';
        var productsSection = document.getElementById('products-section');
        productsSection.classList.add('show');
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
}

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        var activeBtn = document.querySelector('.step.active .btn-quiz');
        if (activeBtn && activeBtn.style.pointerEvents !== 'none') {
            activeBtn.click();
        }
    }
});
