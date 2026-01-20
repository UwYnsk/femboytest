let fempoints = 0;
const selectedAnswers = {}; // Храним выбранные ответы

const correctAnswers = {
    "b1": 1,   "b2": -1,   "b3": 0,
    "b4": 1,   "b5": -1,   "b6": -2,
    "b7": 2,   "b8": 1,    "b9": -1,
    "b10": 0,  "b11": 1,   "b12": 1,
    "b13": 1,  "b14": -1,  "b15": 0,
    "b16": 2,  "b17": 1,   "b18": -2,
    "b19": 2,  "b20": 1,   "b21": -1,
    "b22": -1, "b23": 1,   "b24": 2,
    "b25": 1,  "b26": -1,  "b27": 2,
    "b28": 2,  "b29": 0,   "b30": -1,
    "b31": 0,  "b32": 0,   "b33": 1,
    "b34": 1,  "b35": -1,  "b36": 0,
    "b37": 1,  "b38": 0,   "b39": -1,
    "b40": 1,  "b41": 0,   "b42": -1,
    "b43": 1,  "b44": -1,  "b45": 1,
    "b46": 1,  "b47": -1,  "b48": 0
};

// Сохраняем состояние теста в localStorage
function saveTestState() {
    localStorage.setItem('femboyTest_points', fempoints);
    localStorage.setItem('femboyTest_answers', JSON.stringify(selectedAnswers));
}

function handleButtonClick(event) {
    const buttonId = event.target.id;
    const buttonText = event.target.textContent;
    
    // Не обрабатываем кнопку результата здесь
    if (buttonId === 'resultat') return;
    
    const currentSection = event.target.closest('section');
    const allButtonsInSection = currentSection.querySelectorAll('button');
    allButtonsInSection.forEach(btn => {
        btn.classList.remove('clicked');
    });

    event.target.classList.add('clicked');
    
    if (correctAnswers[buttonId] !== undefined) {
        // Если уже выбирали ответ в этой секции, убираем старые очки
        const sectionId = currentSection.querySelector('h2').textContent;
        if (selectedAnswers[sectionId]) {
            fempoints -= selectedAnswers[sectionId].points;
        }
        
        // Добавляем новые очки
        fempoints += correctAnswers[buttonId];
        
        // Сохраняем выбранный ответ
        selectedAnswers[sectionId] = {
            answer: buttonText,
            points: correctAnswers[buttonId]
        };
        
        saveTestState();
    }
    
    event.target.style.animation = 'pulse 0.5s';
    setTimeout(() => {
        if (event.target.classList.contains('clicked')) {
            event.target.style.animation = '';
        }
    }, 500);
}

// Назначаем обработчики
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// Обработчик для кнопки результата
document.getElementById('resultat').addEventListener('click', function() {
    // Сохраняем финальные очки
    saveTestState();
    
    // Перенаправляем на страницу результата
    window.location.href = 'result.html';
});
