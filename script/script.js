//быки и коровы
var level = document.querySelector('input[name = "levelButton"]:checked').value; // Выбранный уровень сложности
const maxNum4= 9876; //  Максимальное число, которое можно ввести на уровне сложности 4
const maxNum5= 98765; // Максимальное число, которое можно ввести на уровне сложности 5
/**
 * Cоздаёт случайное число. Возвращает массив с 4 символами
 *
 * @param {number} level Уровень сложности, который выбрал пользователь
 * @return {arr} number в степени n.
 */
function createNum(level){
	let number = [];
	while (number.length < level) {
		let newNum = Math.floor(Math.random () * 10);
		if (number.indexOf(newNum) < 0){
			number.push(newNum);
		}
	}
	return number;
};

var target = createNum(level); // Число, которое нужно отгадать

function angeLevel(newLevel) {
	alert('И че');
	return newLevel;
}

/**
 * Функция угадывания. Запускаем кнопкой. Переводит набранное в инпуте в формат массива, отправляет на проверку
 */
function guessing() {
	let inputNum = document.querySelector('#player').value;
	if (document.getElementById('guess').innerHTML == "Игра окончена") {
		alert('Начните новую игру, с этой уже всё понятно');
	} else if ((inputNum > maxNum4 && level == 4) || (inputNum > maxNum5 && level == 5) ) {
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

/**
 * Функция проверки введённого значения. Проверяет корректность, считает быков, коров, попытки и заканчивает игру
 * @param {arr} inputArrPar Введённое пользователем число в виде массива
 */
function check(inputArrPar) {
	let bulls = 0;
	let cows = 0;
	let turns = parseInt(document.querySelector('.turns').innerHTML);
	let repeat = [];
	let ora = '';
	findDuplicates(inputArrPar);

	/**
 	* Ищет дубли в ведённых пользователем данных
 	* @param {arr} arr Введённое пользователем число в виде массива
 	* @return {arr} repeat Массив с дублирующимися значениями, которые ввёл пользователь
 	*/
    function findDuplicates(arr) {
        for(let i = 0;i < arr.length; i++) {
            if((arr.lastIndexOf(arr[i]) != i) &&
                (repeat.indexOf(arr[i]) == -1)) {
                 repeat.push(arr[i]);
            }
        }
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

		turns--;											// надо уменьшить количество ходов
		document.querySelector('.turns').innerHTML = turns; // и записать уменьшенное число

		if (turns == 0 || bulls == level) {
			let result = 'опять проиграл (мда)';
			if (bulls == level) {
				result = 'кое-как победил (случайно)';
			}
			endGame(result); // Выводит результаты игры
		}

   	 writeTurn(inputArrPar, bulls, cows); // Записывает попытку
   	}
};

/**
 	* Функция сохранит на экране введённое число, количество быков и коров
 	* @param {arr} inputArrPar Введённое пользователем число в виде массива
 	* @param {number} bulls количество угаданных быков
 	* @param {number} cows количество угаданных коров
 	*/
function writeTurn(inputArrPar, bulls, cows) {
	let table = document.querySelector('.turnsList');
	//let newLine = document.createElement('p');
	//newLine.innerHTML = '<span class="guessed" style ="background: #f1c40f; font-size: 15pt">&nbsp;&nbsp;&nbsp;' + inputArrPar + '<span class="feedback"> быки:' + bulls + '; коровы: ' + cows + '&nbsp;&nbsp;&nbsp;</span>';
	//table.appendChild(newLine);

	var pFather = document.querySelector('.turnRow');
	var pNew = pFather.cloneNode(true);
	pNew.querySelector('.turnRow').innerHTML = '<span class="guessed" style ="background: #f1c40f; font-size: 15pt">&nbsp;&nbsp;&nbsp;' + inputArrPar + '<span class="feedback"> быки:' + bulls + '; коровы: ' + cows + '&nbsp;&nbsp;&nbsp;</span>';
	table.appendChild(pNew);


	document.querySelector('#player').value = ''; // Очищаем строку ввода
};

/**
 	* Функция сообщает игроку насколько он плох
 	* @param {string} result сообщение для пользователя о победе/поражении
 	*/
function endGame(result) {
	document.querySelector('.number').innerHTML = target;
	alert('Ты ' + result + '\rЗагаданное число: ' + target);
	document.getElementById('guess').innerHTML = "Игра окончена";
};