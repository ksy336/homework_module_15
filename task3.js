// JavaScript source code
const wsUrl =  'wss://echo.websocket.org/';

function pageLoaded() {
  const informationOutput = document.querySelector('.information_output');
  const messageOutput = document.querySelector('.message_output');
  const input = document.querySelector('input');
  const button = document.querySelector('.btn');
  const buttonGeoloc = document.querySelector('.geolocation_btn');
  const output = document.getElementById('output')
  
  const websocket = new WebSocket(wsUrl);
  websocket.onopen = () => {
    informationOutput.innerText = 'Соединение установлено';
  }
  websocket.onmessage = (event) => {
    writeToScreen(`<span style=' color: blue;'> Response ${event.data} </span> `)
}
   websocket.onerror = () => {
      informationOutput.innerText = 'При передаче данных произошла ошибка';
   }
     
  button.addEventListener('click', sendMessage);
  
  function sendMessage() {
    if (!input.value) return;
    websocket.send(input.value);
    writeToScreen(input.value);
    input.value === '';

}
  function writeToScreen(message) {
   let pre = document.createElement('p');
   pre.style.wordWrap = "break-word";
   pre.innerHTML = message;
   messageOutput.appendChild(pre);
 }

buttonGeoloc.addEventListener('click',getLocation);
  
  function getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError)
    } else {
      writeOutput ('Ваш браузер не поддерживает геолокацию')
    }
  }
  function locationSuccess(data) {
    let link = ` https://yandex.ru/maps/?pt=${data.coords.longitude},${data.coords.latitude}&z=18&l=map`;
  
    writeToScreen (`<a href="${link}" target="_blank">Вы находитесь здесь</a>`);
  }
  
  function locationError() {
     writeOutput('Произошла ошибка');
  }
  
  function writeOutput(message) {
    output.innerHTML = `<p>${message}</p>`;
}
}

document.addEventListener('DOMContentLoaded', pageLoaded);