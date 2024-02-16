document.addEventListener('DOMContentLoaded', function () {
    // Додаємо обробник подій для кожного кнопки категорії
    const categoryButtons = document.querySelectorAll('.budget form button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            toggleSelection(this);
        });
    });

    // Додаємо обробник події для форми при її відправці
    document.querySelector('.budget form').addEventListener('submit', function (event) {
        event.preventDefault();

        const selectedCategory = document.querySelector('.budget form .selected');
        const amountInput = document.getElementById('amount');
        const amount = amountInput.value.trim();

        if (!selectedCategory) {
            alert('Оберіть категорію перед додаванням.');
        } else if (amount === '') {
            alert('Введіть суму перед додаванням.');
        } else {
            // Додаємо розхід до списку
            addExpense(selectedCategory.textContent, amount);

            // Знімаємо виділення з обраної категорії та очищуємо поле вводу суми
            selectedCategory.classList.remove('selected');
            amountInput.value = '';

            // Оновлюємо список розходів
            updateBudgetList();
        }
    });

    // Функція для додавання розходів
    function addExpense(category, amount) {
        const transaction = db.transaction(['budget'], 'readwrite');
        const budgetStore = transaction.objectStore('budget');

        const request = budgetStore.add({ category: category, amount: amount + ' грн' });

        request.onsuccess = function (event) {
            console.log('Розхід додано до бази даних успішно');
        };

        request.onerror = function (event) {
            console.error('Помилка додавання розходу до бази даних:', event.target.error);
        };
    }

    // ... (ваш существующий код)

    // Функція для оновлення списку розходів
    function updateBudgetList() {
        // ... (ваш код оновлення списку розходів)
    }

    // Функція для переключення виділення категорій
    function toggleSelection(button) {
        // Знімає виділення з усіх кнопок
        categoryButtons.forEach(btn => {
            btn.classList.remove('selected');
        });

        // Виділяє обрану кнопку
        button.classList.add('selected');
    }
});
