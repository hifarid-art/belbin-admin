// Вопросы и утверждения
const questions = [
    {
        title: "Я считаю, что в команде я могу делать следующее:",
        statements: [
            "Быстро распознавать идеи и использовать их.",
            "Работать с любыми людьми.",
            "Порождать новые идеи.",
            "Эффективно использовать людские резерсы.",
            "Всегда заканчивать начатое дело.",
            "Эффективно использовать свои профессиональные знания и опыт.",
            "Искренне и прямо высказывать свое мнение, когда дело касается достижения поставленной цели.",
            "Точно определить, будет ли план работать в той или иной ситуации.",
            "Четко сформулировать цель в нестандартной ситуации, оставаясь при этом объективным."
        ],
        roles: ['Дипломат', 'Душа команды', 'Генератор', 'Координатор', 'Финишер', 'Специалист', 'Мотиватор', 'Критик', 'Координатор']
    },
    {
        title: "Моим возможным недостатком в командной работе скорее является следующее:",
        statements: [
            "Я ощущаю дискомфорт, если собрания не четко спланированы, не четко управляемы и плохо проводятся.",
            "Я склонен быть слишком расположенным к тем, у кого есть здравая точка зрения, но нет возможности донести ее до остальных",
            "Я не склонен обсуждать с кем-либо тему, если она мне не очень хорошо знакома",
            "Я обычно много говорю, как только группа переходит к обсуждению новой темы.",
            "Моя объективная позиция мешает мне отсиживаться в коллективе.",
            "Я иногда проявляю властность при решении важных вопросов.",
            "Мне трудно выступать в роли предводителя, так как я слишком реагирую на атмосферу в коллективе.",
            "Я могу слишком увлечься какой-то идеей и потерять связь с действительностью.",
            "Я склонен уходить в дела с головой, когда понимаю, что что-то не доделано."
        ],
        roles: ['Координатор', 'Душа команды', 'Специалист', 'Мотиватор', 'Критик', 'Мотиватор', 'Душа команды', 'Генератор', 'Реализатор']
    },
    {
        title: "Когда я работаю с другими людьми над проектом:",
        statements: [
            "Я умею влиять на людей, оказывая давление",
            "Я могу предотвращать небрежности и оплошности, мешающие достижению успеха.",
            "Я люблю поторопить события, если чувствую, что на собрании попусту тратится время на обсуждение не относящихся к делу вопросов.",
            "Я всегда могу привнести что-либо оригинальное.",
            "Я всегда готов поддержать хорошее предложение в общих интересах.",
            "Я быстро определяю возможности новых идей и разработок.",
            "Я, прежде всего, профессионально совершенствуюсь",
            "Я считаю, что мои суждения могут помочь выработке правильных решений.",
            "На меня можно положиться при выполнении основной работы."
        ],
        roles: ['Мотиватор', 'Финишер', 'Мотиватор', 'Генератор', 'Душа команды', 'Дипломат', 'Специалист', 'Критик', 'Реализатор']
    },
    {
        title: "Моим характерным подходом к работе в Команде является:",
        statements: [
            "Стремление лучше узнавать своих коллег.",
            "Участие в обсуждениях предмета, с которым хорошо знаком.",
            "Организация обсуждения различных точек зрения.",
            "Аргументированное опровержение несостоятельных предложений.",
            "Организация работы по утвержденному плану.",
            "Избегание рутины и проявление склонности работать над новыми задачами.",
            "Привнесение элементов совершенства в любую работу, за которую принимаюсь.",
            "Налаживание полезных связей вне коллектива.",
            "Проявление интереса ко всем точкам зрения, и точное определение своей позиции, как только принимается решение."
        ],
        roles: ['Душа команды', 'Специалист', 'Координатор', 'Критик', 'Реализатор', 'Генератор', 'Финишер', 'Дипломат', 'Координатор']
    },
    {
        title: "Работа мне доставляет удовольствие, потому что:",
        statements: [
            "Мне нравится анализировать ситуацию и взвешивать все возможные варианты.",
            "Я люблю находить практические решения проблем.",
            "Мне удается налаживать хорошие рабочие отношения.",
            "Я оказываю влияние на принятие решений.",
            "У меня есть возможность встречаться с новыми людьми с разными идеями.",
            "Выслушивая людей, я могу выбирать приоритетные цели.",
            "Я интуитивно чувствую, на чем мне следует сконцентрироваться при выполнении задачи.",
            "Я могу найти сферу, где я сполна могу использовать свое воображение.",
            "Я чувствую, что максимально использую свою квалификацию и знания в работе."
        ],
        roles: ['Критик', 'Реализатор', 'Душа команды', 'Мотиватор', 'Дипломат', 'Координатор', 'Генератор', 'Генератор', 'Специалист']
    },
    {
        title: "Если я неожиданно получаю трудное задание, которое мне нужно выполнить за ограниченное время совместно с незнакомыми людьми:",
        statements: [
            "Я предпочитаю прочитать как можно больше о предмете.",
            "Я бы предпочел сам найти решение, а затем постарался бы убедить в его верности других.",
            "Я предпочел бы работать только с теми, которые способны сохранять хорошие отношения.",
            "Я бы нашел способ, как решить задачу, установив какой вклад в дело может внести каждый из группы.",
            "Мое чувство времени помогло бы мне уложиться в срок.",
            "Я считаю, что я бы сохранил самообладание и способность трезво оценивать ситуацию.",
            "Несмотря на всевозможные давления с разных сторон, я бы шел вперед, чего бы мне это не стоило.",
            "Я бы взял руководство на себя, если бы почувствовал, что команда не движется к цели.",
            "Я бы начал обсуждение с тем, чтобы появились идеи для продвижения вперед."
        ],
        roles: ['Специалист', 'Генератор', 'Душа команды', 'Координатор', 'Финишер', 'Критик', 'Мотиватор', 'Мотиватор', 'Дипломат']
    },
    {
        title: "Когда Команда работает над проблемой:",
        statements: [
            "Я выхожу из себя, если участники сдерживают продвижение вперед.",
            "Я иногда чувствую, что моя объективность подавляет мотивацию остального коллектива.",
            "Мое желание проверить соответствие всех деталей не всегда встречает понимание.",
            "Я обычно теряю интерес к делу, если мне не удается задействовать ресурсы всех участников.",
            "Мне трудно начать действовать, если цели не ясны.",
            "Мне иногда трудно донести до остальных сложные идеи и решения, которые мне приходят в голову.",
            "Я привлекаю других для выполнения той работы, которая не под силу мне.",
            "Я обычно чувствую, что зря теряю время и лучше со всем справился сам.",
            "Я медлю с высказыванием своей точки зрения, если меня окружают неуступчивые или авторитетные люди."
        ],
        roles: ['Мотиватор', 'Критик', 'Финишер', 'Координатор', 'Генератор', 'Дипломат', 'Реализатор', 'Реализатор', 'Душа команды']
    }
];

let currentQuestion = 0;
let answers = [];
let userFullName = '';
let userOrganization = '';

// 🔑 Проверяем СНАЧАЛА результаты — они приоритетны
const savedResults = localStorage.getItem('belbinResults');
if (savedResults) {
    const data = JSON.parse(savedResults);
    userFullName = data.name;
    userOrganization = data.organization || '';
    showSavedResults(data.results);
    document.getElementById('instruction').style.display = 'none';
    document.getElementById('navigation').style.display = 'none';
    document.querySelector('h1').style.display = 'none';
} else {
    const savedProgress = localStorage.getItem('belbinProgress');
    if (savedProgress) {
        const data = JSON.parse(savedProgress);
        currentQuestion = data.currentQuestion;
        answers = data.answers;
        userFullName = data.name;
        userOrganization = data.organization || '';
        if (currentQuestion < questions.length) {
            renderQuestion();
            document.getElementById('instruction').style.display = 'block';
            document.getElementById('navigation').style.display = 'flex';
        } else {
            showResults();
        }
    } else {
        renderIntro();
    }
}

function renderIntro() {
    const container = document.getElementById('question-container');
    container.innerHTML = `
        <div class="intro-card">
            <div class="intro-image">
                <img src="https://i.postimg.cc/76kxGt40/b25l-Y21z-Oj-Jk-NDYy-MDkx-LTJj-NDQt-NDg4-My05-NGQ4-LTU4-N2-Jl-MTI3-NTA5-OTox-Ym-Rh-NTFk-NC1h-Zj-Y5-LTRl-Nz-It-ODNl-MS04-MTUy-MTc2.jpg" alt="R. Meredith Belbin" style="max-width: 300px; height: auto;">
                <p>R. Meredith Belbin</p>
            </div>
            <div class="form-group">
                <label>Инструкция</label>
                <p>Из 9 пунктов в каждом содержательном блоке выберите не более 4-х, которые точнее всего описывают Ваше поведение в процессе командной работы, и распределите между ними 10 баллов (наиболее часто встречающийся вариант Вашего поведения получает наибольший балл).</p>
            </div>
            <div class="form-group">
    <label for="fullName">Ваше ФИО:</label>
    <input type="text" id="fullName" placeholder="Иванов Иван Иванович" required>
</div>
<div class="form-group">
    <label for="organization">Ваша организация:</label>
    <input type="text" id="organization" placeholder="Название организации" required>
</div>
            <button id="start-btn">Начать тест</button>
        </div>
    `;

    // Скрываем инструкцию до начала теста
    document.getElementById('instruction').style.display = 'none';

    // Скрываем навигацию
    document.getElementById('navigation').style.display = 'none';

    // Функция для запуска теста
    const startTest = () => {
        const name = document.getElementById('fullName').value.trim();
        const org = document.getElementById('organization').value.trim();

        if (!name) {
            alert('Пожалуйста, введите ваше ФИО.');
            return;
        }

        if (!org) {
            alert('Пожалуйста, введите вашу организацию.');
            return;
        }

        userFullName = name;
        userOrganization = org;
        currentQuestion = 0;
        answers = [];
        renderQuestion();
        // Показываем инструкцию и навигацию
        document.getElementById('instruction').style.display = 'block';
        document.getElementById('navigation').style.display = 'flex';
    };

    // Обработчик клика на кнопку
    document.getElementById('start-btn').addEventListener('click', startTest);

    // Обработчик нажатия Enter в полях ввода
    document.getElementById('fullName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            startTest();
        }
    });

    document.getElementById('organization').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            startTest();
        }
    });
}

function checkNextButtonState() {
    const groups = document.querySelectorAll('.number-buttons');
    let total = 0;
    groups.forEach(group => {
        total += parseInt(group.dataset.value || 0);
    });
    
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.disabled = total !== 10;
    }
}

function renderQuestion() {
    const container = document.getElementById('question-container');
    const q = questions[currentQuestion];

    let html = `<div class="question-card">
        <div class="question-header">
    <h3>${q.title}</h3>
</div>
        <div class="balance">Осталось баллов: <span id="balance">10</span></div>`;

    q.statements.forEach((stmt, idx) => {
    html += `
        <div class="statement">
            <label><strong>${idx + 1}.</strong> ${stmt}</label>
            <div class="number-buttons" data-index="${idx}">
                ${Array.from({ length: 11 }, (_, i) => `
                    <div class="number-btn" data-value="${i}">${i}</div>
                `).join('')}
            </div>
        </div>
    `;
});

    html += '</div>';
    container.innerHTML = html;

    // Обновляем счётчик вопросов
    document.getElementById('counter').textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;

    // Инициализация кнопок
    document.querySelectorAll('.number-buttons').forEach(buttonGroup => {
        initButtonGroup(buttonGroup);
    });

    // Обновляем счётчик и состояние кнопки
    updateBalance();

    // Прокручиваем к началу вопроса
    container.scrollIntoView({ behavior: 'smooth' });
}

function initButtonGroup(group) {
    const buttons = group.querySelectorAll('.number-btn');
    const index = parseInt(group.dataset.index);

    // Если есть сохранённые ответы для этого вопроса — восстановим
    if (answers[currentQuestion] && answers[currentQuestion][index] !== undefined) {
        const value = answers[currentQuestion][index];
        const btn = group.querySelector(`.number-btn[data-value="${value}"]`);
        if (btn) {
            btn.classList.add('selected');
            group.dataset.value = value;
        }
    } else {
        // На мобильных устройствах по умолчанию выбираем 0, но кнопка скрыта
        const defaultBtn = group.querySelector('.number-btn[data-value="0"]');
        if (defaultBtn) {
            defaultBtn.classList.add('selected');
            group.dataset.value = 0;
        }
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const value = parseInt(btn.dataset.value);

            // Добавляем вибрацию
            if (navigator.vibrate) {
                // Вибрация на 30ms - короткий тактильный отклик
                navigator.vibrate(30);
            }

            // Если кнопка уже выбрана — сбрасываем выбор
            if (btn.classList.contains('selected')) {
                btn.classList.remove('selected');
                delete group.dataset.value;
                
                // На мобильных при сбросе выбираем скрытый 0
                if (window.innerWidth <= 767) {
                    const zeroBtn = group.querySelector('.number-btn[data-value="0"]');
                    if (zeroBtn) {
                        zeroBtn.classList.add('selected');
                        group.dataset.value = 0;
                    }
                }
            } else {
                // Сбрасываем старую подсветку
                buttons.forEach(b => b.classList.remove('selected'));
                // Подсвечиваем текущую
                btn.classList.add('selected');
                // Сохраняем значение
                group.dataset.value = value;
            }

            // Обновляем баланс
            updateBalance();
            // Проверяем ограничения
            adjustSliderValue(index, parseInt(group.dataset.value || 0));

            // Сохраняем прогресс
            saveProgress();
        });
    });
}

function adjustSliderValue(currentIndex, currentValue) {
    const groups = document.querySelectorAll('.number-buttons');
    let sumOthers = 0;

    groups.forEach((group, idx) => {
        if (idx !== currentIndex) {
            const value = parseInt(group.dataset.value || 0);
            sumOthers += value;
        }
    });

    const maxAllowed = 10 - sumOthers;
    if (currentValue > maxAllowed) {
        // Двойная вибрация при недоступной кнопке
        if (navigator.vibrate) {
            navigator.vibrate([30, 50, 30]); // Короткая-пауза-короткая
        }
        
        // Визуальная обратная связь
        const clickedBtn = document.querySelector(`.number-buttons[data-index="${currentIndex}"] .number-btn.selected`);
        if (clickedBtn) {
            clickedBtn.classList.add('error');
            setTimeout(() => {
                clickedBtn.classList.remove('error');
            }, 500);
        }
        
        // Сбрасываем кнопку
        const group = groups[currentIndex];
        const buttons = group.querySelectorAll('.number-btn');
        buttons.forEach(btn => btn.classList.remove('selected'));
        const zeroBtn = group.querySelector('.number-btn[data-value="0"]');
        zeroBtn.classList.add('selected');
        group.dataset.value = 0;
        updateBalance();
    }
}

function updateBalance() {
    const groups = document.querySelectorAll('.number-buttons');
    let total = 0;
    groups.forEach(group => {
        total += parseInt(group.dataset.value || 0);
    });

    const balance = document.getElementById('balance');
    balance.textContent = 10 - total;
    
    // Проверяем состояние кнопки "Далее"
    checkNextButtonState();
}

function saveProgress() {
    // Обновляем ответы для текущего вопроса
    const groups = document.querySelectorAll('.number-buttons');
    const currentAnswers = [];
    groups.forEach(group => {
        const value = group.dataset.value ? parseInt(group.dataset.value) : 0;
        currentAnswers.push(value);
    });
    answers[currentQuestion] = currentAnswers;

    // Сохраняем в localStorage
    const progressData = {
        name: userFullName,
        organization: userOrganization,
        currentQuestion: currentQuestion,
        answers: answers
    };
    localStorage.setItem('belbinProgress', JSON.stringify(progressData));
}

function goToNext() {
    saveProgress();
    currentQuestion++;
    if (currentQuestion < questions.length) {
        renderQuestion();
        document.getElementById('prev-btn').disabled = false;
    } else {
        showResults();
    }
}

function goToPrev() {
    currentQuestion--;
    renderQuestion();
    document.getElementById('next-btn').textContent = 'Далее';
    if (currentQuestion === 0) document.getElementById('prev-btn').disabled = true;
}

function showResults() {
    // Скрываем всё, кроме блока результатов
    document.querySelector('h1').style.display = 'none';
    document.getElementById('instruction').style.display = 'none';
    document.getElementById('navigation').style.display = 'none';
    document.getElementById('question-container').style.display = 'none';

    // Считаем баллы
    const roleScores = {};
    answers.forEach((qAnswers, qIndex) => {
        qAnswers.forEach((score, sIndex) => {
            const role = questions[qIndex].roles[sIndex];
            if (!roleScores[role]) roleScores[role] = 0;
            roleScores[role] += score;
        });
    });

    // Считаем общую сумму баллов для процентов
    const totalScore = Object.values(roleScores).reduce((sum, score) => sum + score, 0);
    
    const sortedRoles = Object.entries(roleScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    // Форматируем результаты с процентами
    const resultsText = sortedRoles.map(([role, score]) => {
        const percentage = totalScore > 0 ? Math.round((score / totalScore) * 100) : 0;
        return `${role} - ${percentage}%`;
    }).join(', ');

    const primaryRole = sortedRoles[0][0];

    // Сохраняем результаты
    const resultsData = {
        name: userFullName,
        organization: userOrganization,
        results: resultsText,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('belbinResults', JSON.stringify(resultsData));
    localStorage.removeItem('belbinProgress');

    // Очищаем и заполняем список ролей
    const rolesList = document.getElementById('roles-list');
    rolesList.innerHTML = '';
    sortedRoles.forEach(([role, score]) => {
        const li = document.createElement('li');
        const percentage = totalScore > 0 ? Math.round((score / totalScore) * 100) : 0;
        li.innerHTML = `<strong>${role}</strong> — ${score} баллов (${percentage}%)`;
        rolesList.appendChild(li);
    });

    // Отправляем результаты в NocoDB
    sendToNocoDB(resultsData);

    // Показываем блок результатов
    document.getElementById('results').style.display = 'block';
}

async function sendToNocoDB(data) {
    const API_URL = 'https://nocodb.puzzlebot.top/api/v2/tables/mz21at46l2oylu7/records';
    const API_TOKEN = 'RALigTOp4mK4sVmJndPpub0OZXXByvPAmbzAWsk2';

    // Форматируем дату и время для читаемости
    const date = new Date(data.timestamp);
    const formattedDate = date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU');

    const payload = {
        Name: data.name,
        Organization: data.organization,
        Results: data.results,
        DateTime: formattedDate
    };

    try {
        console.log('Отправка данных в NocoDB:', payload);
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': API_TOKEN
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log('✅ Данные успешно отправлены в NocoDB');
        } else {
            console.error('❌ Ошибка при отправке в NocoDB:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('❌ Ошибка сети при отправке в NocoDB:', error);
    }
}

function showSavedResults(roles) {
    document.getElementById('question-container').innerHTML = '';
    document.getElementById('navigation').style.display = 'none';

    const rolesList = document.getElementById('roles-list');
    rolesList.innerHTML = '';
    
    if (typeof roles === 'string') {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${roles}</strong>`;
        rolesList.appendChild(li);
    } else if (Array.isArray(roles)) {
        roles.forEach(([role, score]) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${role}</strong> — ${score} баллов`;
            rolesList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Данные результатов повреждены</strong>`;
        rolesList.appendChild(li);
    }

    document.getElementById('results').style.display = 'block';
}

// Инициализация обработчиков событий
document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    if (nextBtn) nextBtn.addEventListener('click', goToNext);
    if (prevBtn) prevBtn.addEventListener('click', goToPrev);
    if (restartBtn) restartBtn.addEventListener('click', () => {
        localStorage.removeItem('belbinResults');
        localStorage.removeItem('belbinProgress');
        location.reload();
    });
});

// Обработчик изменения размера окна
function handleResize() {
    if (window.innerWidth <= 767) {
        document.body.classList.add('mobile-view');
    } else {
        document.body.classList.remove('mobile-view');
    }
}

// Инициализация при загрузке
window.addEventListener('load', handleResize);
window.addEventListener('resize', handleResize);
