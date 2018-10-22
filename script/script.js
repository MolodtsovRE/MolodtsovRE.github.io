var level = document.querySelector('input[name = "levelButton"]:checked').value;
/* createNum <-------------------------------------------------------------
   Функция создания случайного числа. Возвращает массив с 4 символами */

	// Math.floor - Округление. Возвращает наибольшее целое число, которое меньше или равно данному
	// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/floor 

	// Math.random - метод в нашем случае даёт случайное число между min и max
	// https://javascript.ru/math.random

	// indexOf - возвращает индекс первого вхождения указанного значения или -1
	// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
var createNum = function(level){
	let number = [];
	while (number.length < level) {
		let newNum = Math.floor(Math.random () * 10);
		if (number.indexOf(newNum) < 0){
			number.push(newNum);
		}
	}
	document.querySelector('.tooltip').abbr = number; // для пасхалски
	return number;
};
var target = createNum(level); // засунем в переменную результат функции. Это нужно отгадать

/* changeLevel <----------------------------------------------
   Не получается сделать функцию изменения уровня сложности */
var changeLevel = function(newLevel) {
	alert('И че');
	return newLevel;
}

/* guessing <-----------------------------------------------------------------------------------
	Функция угадывания. Запускаем кнопкой. Переводит набранное в инпуте в формат массива, отправляет на проверку */

	// CSS Селекторы: https://learn.javascript.ru/css-selectors

	// querySelector - возвращает первый элемент, соответствующий CSS-селектору
	// https://learn.javascript.ru/searching-elements-dom

	// parseInt - принимает строку, возвращает целое число в соответствии с указанной системой счисления.
	// https://javascript.ru/parseint

	// substr - начинает собирать символы в строку с позиции start
	// https://javascript.ru/String/substr
var guessing = function() {
	let inputNum = document.querySelector('#player').value;
	if (document.getElementById('guess').innerHTML == "Игра окончена") {
		alert('Начните новую игру, с этой уже всё понятно');
	} else if ((inputNum > 9876 && level == 4) || (inputNum > 98765 && level == 5) ) {
		alert('Вы ввели слишком много значений. ¯|_(ツ)_/¯\r Нужно всего '+level+' цифры');
	}
	else {
		let inputArr = [];
		for (let i = 0; i < level; i++ ) {
			let newArrElement = parseInt(inputNum.substr(i,1), 10);
			inputArr.push(newArrElement);
		}
	check (inputArr); //функция для сравнения двух массивов
	}
};

/* check <-----------------------------------------------------------------------------------------------------------
	Функция проверки введённого значения. Проверяет корректность, считает быков, коров, попытки и заканчивает игру */

	// innerHTML - Свойство представляет собой содержимое элемента (элементы-потомки, комментарии, текст и т.д.)
	// https://puzzleweb.ru/javascript/element_innerhtml.php

var check = function (inputArrPar) {
	let bulls = 0;
	let cows = 0;
	let turns = parseInt(document.querySelector('.turns').innerHTML);
	let repeat = [];
	let ora = '';
	findDuplicates(inputArrPar);

    function findDuplicates(arr) {
        for(let i = 0;i < arr.length; i++) {
            if((arr.lastIndexOf(arr[i]) != i) &&
                (repeat.indexOf(arr[i]) == -1)) {
                 repeat.push(arr[i]);
            }
        }
        console.log(arr);
        console.log(repeat);
        return repeat;
    };

    if(repeat.length > 0 || repeat.some(isNaN)){
    	ora ='Введённые цифры не должны повторяться';
    	if (repeat.some(isNaN)) {
    	ora = 'Маловато цифр ввели';
    	}
    	alert(ora);
    }     
    else {
		for (let i = 0; i < level; i++) {
			if (inputArrPar[i] == target[i]) {
				bulls++;
			} 
			else if (target.indexOf(inputArrPar[i]) >= 0) {
				cows++;
			}
		}
	// надо уменьшить количество ходов и записать уменьшенное число
		turns--;
		document.querySelector('.turns').innerHTML = turns;

	// Вместо двух ифов с победой и поражением делаем один. Соответственно один вызов функции endGame
		if (turns == 0 || bulls == level) {
			let result = 'опять проиграл (мда)';
			if (bulls == level) {
				result = 'кое-как победил (случайно)';
			}
			endGame(inputArrPar,  result);
		}
	// Надо заисать попытку
   	 writeTurn(inputArrPar, bulls, cows);
   	}
};

/* writeTurn <-------------------------------------------------------------
	Функция сохранит на экране введённое число, количество быков и коров */

	// appendChild - Добавляет элемент в конец списка дочерних элементов родителя. Если уже существует, удаляется и вставляется.
	// https://developer.mozilla.org/ru/docs/Web/API/Node/appendChild
var writeTurn = function (inputArrPar, bulls, cows) {
	let table = document.querySelector('.turnsList');
	let newLine = document.createElement('p');
	newLine.innerHTML = '<span class="guessed" style ="background: #f1c40f; font-size: 15pt">&nbsp;&nbsp;&nbsp;' + inputArrPar + '<span class="feedback"> быки:' + bulls + '; коровы: ' + cows + '&nbsp;&nbsp;&nbsp;</span>';
	table.appendChild(newLine);
	document.querySelector('#player').value = '';
};

/* endGame <------------------------------------
	Функция сообщает игроку насколько он плох */
var endGame = function (inputArrPar,  result) {
	document.querySelector('.number').innerHTML = target;
	alert('Ты ' + result + '\rЗагаданное число: ' + target);
	document.getElementById('guess').innerHTML = "Игра окончена";
};