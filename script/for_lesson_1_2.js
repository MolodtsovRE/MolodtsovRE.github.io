/*
1 задание. Слайдер
*/
const img = document.getElementById('slider');
var step = 1; // Номер фото слайдера

const gallery = document.getElementById('currentPhoto');
var photoNum = 1; // Номер фото в галерее

function showSrc() { 
	if (step == 11) {step = 1}

    img.src = './img/img_for_less_1_2/'+step+'.jpg';
  	step++;  

  	//console.log(`${img.src}. Кстати, прошло 3 секунды`);
}
setInterval(showSrc, 2500);

/*
3 задание. Переключение вперёд/назад
*/
function go() {
	photoNum++;
	if (photoNum == 11) {photoNum = 1}
	gallery.src = './img/img_for_less_1_2/'+photoNum+'.jpg';
}

function back(){
	photoNum--;
	if (photoNum == 0) {photoNum = 10}
	gallery.src = './img/img_for_less_1_2/'+photoNum+'.jpg';
}

/*
4 задание. Выпадающий списочелло

— add() — для добавления класса;
— remove() — для удаления класса;
— contains() — для проверки, установлен ли такой класс или нет;
— toggle() — для переключения класса (если он уже был,то будет удален, если его не было — будет добавлен).
*/
const list = document.getElementById('List');
function OpenList(){
	list.classList.toggle('active');
	/*
	if (list.classList.contains('active')) {
		list.classList.remove('active');
	} 
	else {
		list.classList.add('active');
	}
	*/
}
