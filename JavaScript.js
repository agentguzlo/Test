function toggleSelection(button) {
    var buttons = document.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('selected');
    }

    // Додаємо клас "selected" до натисканої кнопки
    button.classList.add('selected');
}
