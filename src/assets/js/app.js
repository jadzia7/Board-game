import axios from 'axios';

window.addEventListener('load', () => {

  const api = 'http://www.colr.org/json/color/random';
  const body = document.querySelector('body');

  function randomColor() {
    axios.get(api).then(res => {
      let color = res.data.colors[0].hex;

      if (!color) {
        console.error('Random color could not be fetched.');
      }

      color = '#' + color;

      body.style.backgroundColor = color;
    }).catch(() => console.error('Random color could not be fetched.'));
  }

  randomColor();

  setInterval(randomColor, 8000);
  let number_of_throws = 0;
  let position = 0;
  let sum = 0;
  let avg = 0;
  let backward_movement = 0;
  let throw_dice;
  let zero = () =>{
    number_of_throws = 0;
    position = 0;
    sum = 0;
    avg = 0;
  }
  let block4 = document.querySelector(".block4");
  let buttonGUI = document.querySelector("#button");
  let number_of_throwsGUI = document.querySelector("#number_of_throws");
  let throw_dice_GUI = document.querySelector("#throw_dice");
  let position_GUI = document.querySelector("#position");
  let statement_GUI = document.querySelector("#statement");
  buttonGUI.addEventListener('click', () => {
    if ( document.getElementById("button").classList.contains('lost')) {
      buttonGUI.classList.remove('lost');
      buttonGUI.textContent = 'Rzuć kostką';
    }
    if ( document.getElementById("button").classList.contains('win')) {
      buttonGUI.classList.remove('win');
      buttonGUI.textContent = 'Rzuć kostką';
    }
  number_of_throws += 1;
  throw_dice = Math.floor(Math.random() * 6 + 1);
  sum += throw_dice; 
  position += throw_dice;
  number_of_throwsGUI.textContent = number_of_throws;
  throw_dice_GUI.textContent = throw_dice;
  if (position > 20){
    backward_movement = position - 20;
  position = 20 - backward_movement;
  if(position == 19){
    block4.style.display = "block";
    position = 11;
    position_GUI.textContent = position;
    statement_GUI.textContent = 'Przekroczyłeś metę, cofasz się o ' + backward_movement + ' i dotarłeś do pola nr 19 co skutkuje, że cofasz się do pola : ' + position;
  }else{
    block4.style.display = "block";
    position_GUI.textContent = position;
    statement_GUI.textContent = 'Przekroczyłeś metę, cofasz się o ' + backward_movement + ' pole/a. Jesteś na pozycji : ' + position;
  }
  } else if(position == 12){
    buttonGUI.classList.add('lost');
    position_GUI.textContent = position;
    statement_GUI.textContent = 'Przegrałeś, spróbuj jeszcze raz';
    buttonGUI.textContent = 'Zagraj jeszcze raz';
    block4.style.display = "block";
    zero();
  }else if(position == 19){
    position = 11;
    position_GUI.textContent = position;
    statement_GUI.textContent = 'Pole nr 19 skutkuje, że cofasz się do pola : ' + position;
    block4.style.display = "block";
  }else if(position == 20){
    avg = sum / number_of_throws;
    buttonGUI.classList.add('win');
    position_GUI.textContent = position;
    buttonGUI.textContent = 'Zagraj jeszcze raz';
    statement_GUI.textContent = 'Wygrałeś w ' + number_of_throws + ' rzutach,  średnia wyrzucanych oczek to : ' + avg; 
  zero();
  block4.style.display = "block";
  }else{
    position_GUI.textContent = position;
    statement_GUI.textContent = '';
    block4.style.display = "none";
  }
  });
});
