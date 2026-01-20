        // Получаем сохраненные данные
        const fempoints = parseInt(localStorage.getItem('femboyTest_points')) || 0;
        const savedAnswers = JSON.parse(localStorage.getItem('femboyTest_answers')) || {};
        
        // Определяем результат
        let resultText = "";
        let resultStyle = "";
        let imageName = "";
        
        if (fempoints >= 18) {
            resultText = "ТЫ СВЕРХФЕМБОЙ! UwU :3 ★";
            resultStyle = "color: #ff00ff; text-shadow: 0 0 10px #ff00ff;";
            imageName = "jpg/astolfo.jpg";
        } else if (fempoints >= 6) {
            resultText = "Ты фембой!";
            resultStyle = "color: #ff66cc; text-shadow: 0 0 10px #ff66cc;";
            imageName = "jpg/boykisser.jpg";
        } else {
            resultText = "ТЫ АНТИФЕМБОЙ! Жди сват хуйло!";
            resultStyle = "color: #ff0000; text-shadow: 0 0 10px #ff0000;";
            imageName = "jpg/i.jpg";
        }
        
        // Отображаем результат
        const resultHTML = `
            <div class="points">${fempoints} очков</div>
            <div class="result-text" style="${resultStyle}">${resultText}</div>
            ${imageName ? `<img src="${imageName}" alt="Результат" class="result-image">` : ''}
        `;
        
        document.getElementById('resultDisplay').innerHTML = resultHTML;
        
        // Отображаем список ответов
        let answersHTML = '';
        for (const [question, answerData] of Object.entries(savedAnswers)) {
            answersHTML += `
                <div class="answer-item">
                    <strong>${question}</strong><br>
                    Ответ: ${answerData.answer}
                </div>
            `;
        }
        
        document.getElementById('answersList').innerHTML += answersHTML;
        
        // Очищаем localStorage после показа результатов
        setTimeout(() => {
            localStorage.removeItem('femboyTest_points');
            localStorage.removeItem('femboyTest_answers');
        }, 30000); // Очищаем через 30 секунд