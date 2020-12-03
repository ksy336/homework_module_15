
const button = document.querySelector('button');
button.addEventListener('click', () => {
    const monitorWidth = window.screen.width;
    const monitorHeight = window.screen.height;
    alert(monitorWidth);
    alert(monitorHeight);
})