document.getElementById('menuButton').addEventListener('click', function () {
    var menu = document.getElementById('menu');
    menu.style.display = (menu.style.display === 'inline-grid') ? 'none' : 'inline-grid';
    const inlineGird = menu.style.display === 'inline-grid';
    if (inlineGird) {
        menu.style.marginTop =  "20%";
    }
});