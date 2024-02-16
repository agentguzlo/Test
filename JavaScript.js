function toggleSelection(button) {
    var buttons = document.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('selected');
    }

    // Додаємо клас "selected" до натисканої кнопки
    button.classList.add('selected');
}
function updateBudgetList() {
    const budgetList = document.querySelector('.budgets');
    const totalAmountElement = document.querySelector('.total-amount');
    
    // Очищаємо список перед оновленням
    budgetList.innerHTML = '';

    let totalAmount = 0;

    // Зчитуємо дані з бази даних та оновлюємо список розходів
    const transaction = db.transaction(['budget'], 'readonly');
    const budgetStore = transaction.objectStore('budget');

    const request = budgetStore.openCursor();

    request.onsuccess = function (event) {
        const cursor = event.target.result;

        if (cursor) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span class="category">${cursor.value.category}</span><span class="amount">${cursor.value.amount}</span>`;
            budgetList.appendChild(listItem);

            // Додаємо розхід до загальної суми
            totalAmount += parseFloat(cursor.value.amount);

            cursor.continue();
        } else {
            // Виводимо загальну суму після оновлення списку
            if (totalAmountElement) {
                totalAmountElement.textContent = `Загальна сума: ${totalAmount} грн`;
            }
        }
    };
}
document.addEventListener('DOMContentLoaded', function () {
    // ... (ваш существующий код)

    // Добавляем обработчик формы для добавления записей
    document.querySelector('.budget form').addEventListener('submit', function (event) {
        event.preventDefault();

        const selectedCategory = document.querySelector('.budget form .selected');
        const amountInput = document.getElementById('amount');
        const amount = amountInput.value.trim();

        if (!selectedCategory) {
            alert('Выберите категорию перед добавлением.');
        } else if (amount === '') {
            alert('Введите сумму перед добавлением.');
        } else {
            // Если выбрана категория и введена сумма, добавляем запись
            addExpense(selectedCategory.textContent, amount);

            // Сбрасываем выбранную категорию и очищаем поле ввода суммы
            selectedCategory.classList.remove('selected');
            amountInput.value = '';

            // Обновляем список розходов
            updateBudgetList();
        }
    });

    // ... (ваш существующий код)

    // Функция для добавления розходов в базу данных
    function addExpense(category, amount) {
        const transaction = db.transaction(['budget'], 'readwrite');
        const budgetStore = transaction.objectStore('budget');

        const request = budgetStore.add({ category: category, amount: amount + ' грн' });

        request.onsuccess = function (event) {
            console.log('Expense added to database successfully');
        };

        request.onerror = function (event) {
            console.error('Error adding expense to database:', event.target.error);
        };
    }
});

