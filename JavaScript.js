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
            const transaction = db.transaction(['budget'], 'readwrite');
            const budgetStore = transaction.objectStore('budget');

            const request = budgetStore.add({ category: selectedCategory.textContent, amount: amount + ' грн' });

            request.onsuccess = function (event) {
                console.log('Expense added to database successfully');

                // Сбрасываем выбранную категорию и очищаем поле ввода суммы
                selectedCategory.classList.remove('selected');
                amountInput.value = '';

                // Обновляем список розходов
                updateBudgetList();
            };

            request.onerror = function (event) {
                console.error('Error adding expense to database:', event.target.error);
            };
        }
    });

    // ... (ваш существующий код)

    // Функция для обновления данных в базе данных
    function updateDataInDB(id, category, amount) {
        const transaction = db.transaction(['budget'], 'readwrite');
        const budgetStore = transaction.objectStore('budget');

        const request = budgetStore.put({ id: id, category: category, amount: amount + ' грн' });

        request.onsuccess = function (event) {
            console.log('Data updated in database successfully');
            updateBudgetList();
        };

        request.onerror = function (event) {
            console.error('Error updating data in database:', event.target.error);
        };
    }

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
