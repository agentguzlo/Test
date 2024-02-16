document.querySelector('.budget form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const selectedCategory = document.querySelector('.budget form .selected');
    const amount = document.getElementById('amount').value;

    if (selectedCategory && amount.trim() !== '') {
        // Створюємо новий елемент списку бюджета
        const newItem = document.createElement('li');
        newItem.innerHTML = `<span class="category">${selectedCategory.textContent}</span><span class="amount">${amount} грн</span>`;
        
        // Додаємо елемент у список бюджета
        document.querySelector('.budgets').appendChild(newItem);

        // Очищаємо поля форми та скидаємо обрану категорію
        document.getElementById('amount').value = '';
        selectedCategory.classList.remove('selected');

        // Зберігаємо дані в локальне сховище
        saveDataToLocal(newItem);
    } else {
        alert('Оберіть категорію та введіть суму перед додаванням.');
    }
});

function saveDataToLocal(item) {
    // Отримуємо поточні дані з локального сховища
    const storedData = JSON.parse(localStorage.getItem('budgetData')) || [];

    // Додаємо новий запис
    storedData.push({
        category: item.querySelector('.category').textContent,
        amount: item.querySelector('.amount').textContent
    });

    // Зберігаємо оновлені дані в локальне сховище
    localStorage.setItem('budgetData', JSON.stringify(storedData));
}
