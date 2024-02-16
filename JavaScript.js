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
