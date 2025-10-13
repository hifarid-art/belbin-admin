const API_URL = 'https://nocodb.puzzlebot.top/api/v2/tables/mz21at46l2oylu7/records';
const API_TOKEN = 'RALigTOp4mK4sVmJndPpub0OZXXByvPAmbzAWsk2';
const ITEMS_PER_PAGE = 30;
const ADMIN_PASSWORD = 'BelbinDrive14$*';

let allResults = [];
let filteredResults = [];
let currentPage = 1;
let totalPages = 1;
let isAuthenticated = false;

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Админ-панель запускается...');
    
    // Проверяем, есть ли сохраненная авторизация
    const savedAuth = localStorage.getItem('belbin_admin_auth');
    if (savedAuth === 'true') {
        isAuthenticated = true;
        showAdminContent();
    } else {
        showPasswordModal();
    }
    
    setupEventListeners();
    window.addEventListener('resize', adjustPagination);
    adjustPagination();
});

function showPasswordModal() {
    document.getElementById('passwordModal').style.display = 'flex';
    document.getElementById('passwordInput').focus();
    document.body.classList.add('modal-open');
}

function hidePasswordModal() {
    document.getElementById('passwordModal').style.display = 'none';
    document.body.classList.remove('modal-open');
}

function showAdminContent() {
    document.getElementById('adminContent').style.display = 'block';
    document.body.classList.remove('modal-open');
    loadResults();
}

function setupEventListeners() {
    // Обработчики для модального окна пароля
    document.getElementById('submitPassword').addEventListener('click', checkPassword);
    document.getElementById('passwordInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    document.getElementById('showPassword').addEventListener('click', function() {
        const passwordInput = document.getElementById('passwordInput');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '🔒';
    });
    
    // Остальные обработчики (добавляем проверку авторизации)
    document.getElementById('searchInput').addEventListener('input', function() {
        if (!isAuthenticated) return;
        currentPage = 1;
        filterResults();
    });
    
    document.getElementById('sortSelect').addEventListener('change', function() {
        if (!isAuthenticated) return;
        currentPage = 1;
        filterResults();
    });
    
    document.getElementById('roleFilter').addEventListener('change', function() {
        if (!isAuthenticated) return;
        currentPage = 1;
        filterResults();
    });
    
    document.getElementById('refreshBtn').addEventListener('click', function() {
        if (!isAuthenticated) return;
        currentPage = 1;
        loadResults();
    });
    
    document.getElementById('exportBtn').addEventListener('click', function() {
        if (!isAuthenticated) return;
        exportToExcel();
    });
    
    document.getElementById('clearFilters').addEventListener('click', function() {
        if (!isAuthenticated) return;
        currentPage = 1;
        clearAllFilters();
    });
    
    document.getElementById('dateFilter').addEventListener('change', function() {
        if (!isAuthenticated) return;
        currentPage = 1;
        filterResults();
    });
    
    // Пагинация
    document.getElementById('firstPage').addEventListener('click', function() {
        if (!isAuthenticated) return;
        goToFirstPage();
    });
    
    document.getElementById('prevPage').addEventListener('click', function() {
        if (!isAuthenticated) return;
        goToPrevPage();
    });
    
    document.getElementById('nextPage').addEventListener('click', function() {
        if (!isAuthenticated) return;
        goToNextPage();
    });
    
    document.getElementById('lastPage').addEventListener('click', function() {
        if (!isAuthenticated) return;
        goToLastPage();
    });
}

function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === ADMIN_PASSWORD) {
        isAuthenticated = true;
        localStorage.setItem('belbin_admin_auth', 'true');
        hidePasswordModal();
        showAdminContent();
        passwordError.style.display = 'none';
        passwordInput.value = '';
        // Размытие убирается в showAdminContent
    } else {
        passwordError.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
        
        // Анимация ошибки
        passwordInput.style.borderColor = '#e74c3c';
        setTimeout(() => {
            passwordInput.style.borderColor = '#e1e5e9';
        }, 1000);
    }
}

async function loadResults() {
    if (!isAuthenticated) return;
    
    try {
        showLoading();
        console.log('📥 Загружаем данные из:', API_URL);
        
        const response = await fetch(API_URL + '?limit=1000', {
            headers: {
                'xc-token': API_TOKEN,
                'Content-Type': 'application/json'
            }
        });

        console.log('📊 Ответ сервера:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Данные получены:', data);
        
        allResults = data.list || [];
        console.log(`📋 Загружено ${allResults.length} записей`);
        
        if (allResults.length > 0) {
            console.log('📝 Доступные поля в первой записи:', Object.keys(allResults[0]));
            console.log('👤 Пример первой записи:', allResults[0]);
        }
        
        updateStats();
        filteredResults = [...allResults];
        renderResults();
        
    } catch (error) {
        console.error('❌ Ошибка загрузки:', error);
        showError(`Не удалось загрузить данные: ${error.message}`);
    }
}

function filterResults() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const sortBy = document.getElementById('sortSelect').value;
    const roleFilter = document.getElementById('roleFilter').value;
    const selectedDate = document.getElementById('dateFilter').value;

    console.log('🔍 Параметры фильтрации:', { 
        searchTerm, 
        roleFilter, 
        selectedDate,
        totalRecords: allResults.length 
    });

    filteredResults = allResults.filter(result => {
        // Получаем данные с учетом разных названий полей
        const name = (result.Name || result.name || '').toLowerCase().trim();
        const organization = (result.Organization || result.organization || '').toLowerCase().trim();
        const resultsText = (result.Results || result.results || '').toLowerCase().trim();
        
        // Поиск по тексту
        const matchesSearch = !searchTerm || 
                            name.includes(searchTerm) || 
                            organization.includes(searchTerm);
        
        // Фильтр по роли
        const matchesRole = !roleFilter || 
                          resultsText.includes(roleFilter.toLowerCase());
        
        // Упрощенный фильтр по дате
        const matchesDate = !selectedDate || filterByDate(result, selectedDate);
        
        const matches = matchesSearch && matchesRole && matchesDate;
        
        return matches;
    });

    console.log(`📊 Результаты фильтрации: ${filteredResults.length} из ${allResults.length}`);

    // Сортировка
    filteredResults.sort((a, b) => {
        const nameA = (a.Name || a.name || '').toLowerCase();
        const nameB = (b.Name || b.name || '').toLowerCase();
        const orgA = (a.Organization || a.organization || '').toLowerCase();
        const orgB = (b.Organization || b.organization || '').toLowerCase();
        
        switch (sortBy) {
            case 'newest':
    return getTimestamp(a) - getTimestamp(b);
case 'oldest':
    return getTimestamp(b) - getTimestamp(a);
            case 'name':
                return nameA.localeCompare(nameB);
            case 'name_desc':
                return nameB.localeCompare(nameA);
            case 'org':
                return orgA.localeCompare(orgB);
            default:
                return 0;
        }
    });

    renderResults();
    updateStats();
}

function filterByDate(result, selectedDate) {
    if (!selectedDate) return true;
    
    const resultDate = getDateFromResult(result);
    if (!resultDate) return false;
    
    // Конвертируем дату результата в тот же формат, что и selectedDate (YYYY-MM-DD)
    const resultDateString = resultDate.toISOString().split('T')[0];
    
    console.log('📅 Сравнение дат:', {
        resultDate: resultDate,
        resultDateString: resultDateString,
        selectedDate: selectedDate,
        matches: resultDateString === selectedDate
    });
    
    return resultDateString === selectedDate;
}

function getDateFromResult(result) {
    const dateString = result.DateTime || result.CreatedAt || result.created_at;
    console.log('📅 Парсим дату:', dateString);
    
    if (!dateString) return null;
    
    try {
        // Парсим формат "DD.MM.YYYY HH:mm:ss"
        const parts = dateString.split(' ');
        const datePart = parts[0]; // "12.10.2025"
        const [day, month, year] = datePart.split('.');
        
        // Создаем дату в формате YYYY-MM-DD
        const date = new Date(`${year}-${month}-${day}`);
        const isValid = !isNaN(date.getTime());
        
        console.log('📅 Результат парсинга:', { 
            original: dateString,
            parsed: date,
            isValid: isValid
        });
        
        return isValid ? date : null;
    } catch (error) {
        console.warn('❌ Ошибка парсинга даты:', dateString, error);
        return null;
    }
}

function getTimestamp(result) {
    const dateString = result.DateTime || result.CreatedAt || result.created_at || result.UpdatedAt;
    
    if (!dateString) return 0;
    
    try {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 0 : date.getTime();
    } catch (error) {
        return 0;
    }
}

function renderResults() {
    const grid = document.getElementById('resultsGrid');
    const paginationContainer = document.getElementById('paginationContainer');
    
    if (filteredResults.length === 0) {
        const hasFilters = document.getElementById('searchInput').value || 
                          document.getElementById('roleFilter').value ||
                          document.getElementById('dateFilter').value;
        
        if (hasFilters) {
            grid.innerHTML = '<div class="no-results">Нет результатов, соответствующих критериям поиска</div>';
        } else {
            grid.innerHTML = '<div class="no-results">Нет данных для отображения</div>';
        }
        
        paginationContainer.style.display = 'none';
        return;
    }
    
    // Рассчитываем пагинацию
    totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredResults.length);
    const currentPageResults = filteredResults.slice(startIndex, endIndex);
    
    // Рендерим карточки для текущей страницы
    grid.innerHTML = currentPageResults.map(result => {
        const name = result.Name || result.name || 'Не указано';
        const organization = result.Organization || result.organization || 'Не указано';
        const resultsText = result.Results || result.results || '';
        const date = result.DateTime || result.CreatedAt || result.created_at;
        
        return `
        <div class="user-card">
            <div class="user-header">
                <div style="flex: 1;">
                    <div class="user-name">${escapeHtml(name)}</div>
                    <div class="user-org">${escapeHtml(organization)}</div>
                    ${getPrimaryRoleBadge(resultsText)}
                </div>
                <div class="user-date">${formatDate(date)}</div>
            </div>
            
            <div class="roles-list">
                ${renderRoles(resultsText)}
            </div>
        </div>
        `;
    }).join('');
    
    // Показываем и обновляем пагинацию
    paginationContainer.style.display = 'flex';
    updatePagination(startIndex, endIndex);
}

function renderRoles(resultsString) {
    if (!resultsString) return '<div class="no-results">Нет данных о ролях</div>';
    
    try {
        const roles = resultsString.split(', ').map(roleStr => {
            const [role, percentage] = roleStr.split(' - ');
            return { role: role?.trim(), percentage: percentage?.trim() };
        }).filter(role => role.role && role.percentage);
        
        return roles.map(role => `
            <div class="role-item">
                <span class="role-name">${escapeHtml(role.role)}</span>
                <span class="role-percentage">${role.percentage}</span>
            </div>
        `).join('');
        
    } catch (error) {
        return `<div class="role-item">
            <span class="role-name">Результаты:</span>
            <span class="role-percentage">${escapeHtml(resultsString)}</span>
        </div>`;
    }
}

function getPrimaryRoleBadge(resultsString) {
    if (!resultsString) return '';
    
    try {
        const primaryRole = resultsString.split(', ')[0]?.split(' - ')[0];
        if (primaryRole) {
            return `<div class="primary-role">Основная роль: ${escapeHtml(primaryRole)}</div>`;
        }
        return '';
    } catch (error) {
        return '';
    }
}

function updateStats() {
    const total = allResults.length;
    const filtered = filteredResults.length;
    
    // Обновляем общее количество
    document.getElementById('totalUsers').textContent = total;
    
    // Получаем элементы для статистики
    const todayStatCard = document.getElementById('todayStatCard');
    const todayUsersElement = document.getElementById('todayUsers');
    const todayLabelElement = document.getElementById('todayLabel');
    
    const hasActiveFilters = document.getElementById('searchInput').value || 
                           document.getElementById('roleFilter').value ||
                           document.getElementById('dateFilter').value;
    
    if (hasActiveFilters && filtered !== total) {
        // Показываем количество отфильтрованных записей
        todayStatCard.style.background = '#e8f4fc';
        todayUsersElement.textContent = filtered;
        todayLabelElement.textContent = 'Отфильтровано';
    } else {
        // Показываем количество за сегодня
        todayStatCard.style.background = '';
        const todayCount = getTodayCount();
        todayUsersElement.textContent = todayCount;
        todayLabelElement.textContent = 'Сегодня';
    }
    
    // Обновляем популярную роль
    document.getElementById('topRole').textContent = getTopRole(allResults);
}

function getTodayCount() {
    const today = new Date().toISOString().split('T')[0];
    return allResults.filter(result => {
        const resultDate = getDateFromResult(result);
        return resultDate && resultDate.toISOString().split('T')[0] === today;
    }).length;
}

function getTopRole(results) {
    const roleCounts = {};
    results.forEach(result => {
        const resultsText = result.Results || result.results || '';
        if (resultsText) {
            try {
                const primaryRole = resultsText.split(', ')[0]?.split(' - ')[0];
                if (primaryRole) {
                    roleCounts[primaryRole] = (roleCounts[primaryRole] || 0) + 1;
                }
            } catch (error) {
                console.warn('Ошибка парсинга ролей:', error);
            }
        }
    });
    
    const topRole = Object.entries(roleCounts).sort((a, b) => b[1] - a[1])[0];
    return topRole ? topRole[0] : '-';
}

function updatePagination(startIndex, endIndex) {
    // Обновляем информацию о показе
    document.getElementById('showingStart').textContent = startIndex + 1;
    document.getElementById('showingEnd').textContent = endIndex;
    document.getElementById('totalShowing').textContent = filteredResults.length;
    
    // Обновляем кнопки навигации
    document.getElementById('firstPage').disabled = currentPage === 1;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
    document.getElementById('lastPage').disabled = currentPage === totalPages;
    
    // Обновляем номера страниц
    const pageNumbersContainer = document.getElementById('pageNumbers');
    pageNumbersContainer.innerHTML = '';
    
    // Определяем, сколько кнопок показывать в зависимости от размера экрана
    let maxVisiblePages = 7;
    if (window.innerWidth < 768) maxVisiblePages = 5;
    if (window.innerWidth < 480) maxVisiblePages = 4;
    if (window.innerWidth < 360) maxVisiblePages = 3;
    
    // Логика отображения страниц с точками для больших диапазонов
    let startPage = 1;
    let endPage = totalPages;
    
    if (totalPages > maxVisiblePages) {
        const half = Math.floor(maxVisiblePages / 2);
        startPage = Math.max(1, currentPage - half);
        endPage = Math.min(totalPages, currentPage + half);
        
        // Корректируем, если мы в начале или конце
        if (endPage - startPage + 1 < maxVisiblePages) {
            if (currentPage < totalPages / 2) {
                endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            } else {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
        }
    }
    
    // Добавляем первую страницу и многоточие если нужно
    if (startPage > 1) {
        addPageButton(1);
        if (startPage > 2) {
            addEllipsis();
        }
    }
    
    // Добавляем видимые страницы
    for (let i = startPage; i <= endPage; i++) {
        addPageButton(i);
    }
    
    // Добавляем многоточие и последнюю страницу если нужно
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            addEllipsis();
        }
        addPageButton(totalPages);
    }
    
    function addPageButton(pageNum) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `belbin-pagination-btn page-btn ${pageNum === currentPage ? 'active' : ''}`;
        pageBtn.textContent = pageNum;
        pageBtn.title = `Страница ${pageNum}`;
        pageBtn.addEventListener('click', () => goToPage(pageNum));
        pageNumbersContainer.appendChild(pageBtn);
    }
    
    function addEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'belbin-pagination-ellipsis';
        ellipsis.textContent = '...';
        ellipsis.style.cssText = 'padding: 0 4px; color: #6c757d; font-weight: bold;';
        pageNumbersContainer.appendChild(ellipsis);
    }
}

function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderResults();
    document.getElementById('resultsGrid').scrollIntoView({ behavior: 'smooth' });
}

function goToFirstPage() {
    goToPage(1);
}

function goToPrevPage() {
    goToPage(currentPage - 1);
}

function goToNextPage() {
    goToPage(currentPage + 1);
}

function goToLastPage() {
    goToPage(totalPages);
}

function adjustPagination() {
    if (filteredResults.length === 0) return;
    
    // Просто перерисовываем пагинацию при изменении размера окна
    updatePagination(
        (currentPage - 1) * ITEMS_PER_PAGE,
        Math.min(currentPage * ITEMS_PER_PAGE, filteredResults.length)
    );
}

function clearAllFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('roleFilter').value = '';
    document.getElementById('dateFilter').value = '';
    document.getElementById('sortSelect').value = 'newest';
    currentPage = 1;
    
    filterResults();
}

function exportToExcel() {
    if (filteredResults.length === 0) {
        alert('Нет данных для экспорта');
        return;
    }

    try {
        const wb = XLSX.utils.book_new();
        
        const data = filteredResults.map(result => {
            const name = result.Name || result.name || '';
            const organization = result.Organization || result.organization || '';
            const resultsText = result.Results || result.results || '';
            const date = result.DateTime || result.CreatedAt || result.created_at || '';
            
            return {
                'ФИО': name,
                'Организация': organization,
                'Результаты': resultsText,
                'Дата и время': date
            };
        });

        // Создаем лист
        const ws = XLSX.utils.json_to_sheet(data);
        
        // Настраиваем ширину колонок
        const colWidths = [
            { wch: 30 }, // ФИО
            { wch: 25 }, // Организация
            { wch: 50 }, // Результаты
            { wch: 20 }  // Дата и время
        ];
        ws['!cols'] = colWidths;
        
        // Добавляем лист в книгу
        XLSX.utils.book_append_sheet(wb, ws, 'Результаты Белбина');
        
        // Генерируем файл и скачиваем
        const fileName = `Результаты_Белбина_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
        
        console.log('✅ Excel файл успешно создан:', fileName);
        
    } catch (error) {
        console.error('❌ Ошибка при создании Excel файла:', error);
        alert('Произошла ошибка при создании Excel файла: ' + error.message);
        
        // Fallback на CSV если Excel не работает
        exportToCSV();
    }
}

// Функция для экспорта в CSV (как запасной вариант)
function exportToCSV() {
    const csvContent = convertToCSV(filteredResults);
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { 
        type: 'text/csv;charset=utf-8;' 
    });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `belbin_results_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function convertToCSV(results) {
    const headers = ['ФИО', 'Организация', 'Результаты', 'Дата и время'];
    const csvRows = [headers.join(',')];
    
    results.forEach(result => {
        const name = result.Name || result.name || '';
        const organization = result.Organization || result.organization || '';
        const resultsText = result.Results || result.results || '';
        const date = result.DateTime || result.CreatedAt || result.created_at || '';
        
        const row = [
            `"${name.replace(/"/g, '""')}"`,
            `"${organization.replace(/"/g, '""')}"`,
            `"${resultsText.replace(/"/g, '""')}"`,
            `"${date.replace(/"/g, '""')}"`
        ];
        csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
}

function showLoading() {
    document.getElementById('resultsGrid').innerHTML = '<div class="loading">Загрузка данных...</div>';
    document.getElementById('paginationContainer').style.display = 'none';
}

function showError(message) {
    document.getElementById('resultsGrid').innerHTML = `<div class="no-results">${message}</div>`;
    document.getElementById('paginationContainer').style.display = 'none';
}

function formatDate(dateString) {
    if (!dateString) return 'Дата не указана';
    
    try {
        // Для формата "DD.MM.YYYY HH:mm:ss"
        if (dateString.includes('.')) {
            const parts = dateString.split(' ');
            return parts[0]; // Возвращаем только дату "12.10.2025"
        }
        
        // Для других форматов
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Неверная дата';
        }
        
        return date.toLocaleDateString('ru-RU');
    } catch (error) {
        return dateString; // Возвращаем оригинальную строку если не можем распарсить
    }
}

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Функция для выхода (опционально)
function logout() {
    isAuthenticated = false;
    localStorage.removeItem('belbin_admin_auth');
    document.getElementById('adminContent').style.display = 'none';
    showPasswordModal();
}
