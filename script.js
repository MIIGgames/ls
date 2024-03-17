let tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];

renderTasks();

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task');
        li.innerHTML = `
            <span>${task.text}</span>
            <input type="checkbox" onchange="toggleTask(${index})" ${task.completed ? 'checked' : ''}>
            <span class="delete-btn" onclick="deleteTask(${index})">Excluir</span>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push({ text, completed: false });
        sessionStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskInput.value = '';
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Função para obter a previsão do tempo usando a API do OpenWeatherMap
async function getWeather() {
    const apiKey = '9f1e1eeb2aefd06c4fd556e71c1faa18';
    const city = 'Manaus'; // Substitua 'NOME_DA_CIDADE' pelo nome da cidade desejada
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const weatherDiv = document.getElementById('weather');
        const weatherInfo = `
            <p>Previsão do Tempo para ${data.name}: ${data.weather[0].description}</p>
            <p>Temperatura: ${data.main.temp}°C</p>
            <p>Umidade: ${data.main.humidity}%</p>
        `;
        weatherDiv.innerHTML = weatherInfo;
    } catch (error) {
        console.error('Erro ao obter previsão do tempo:', error);
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = '<p>Erro ao obter previsão do tempo</p>';
    }
}

// Chamada da função para obter a previsão do tempo ao carregar a página
window.onload = getWeather;
