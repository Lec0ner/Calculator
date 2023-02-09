/* Объявление переменных */

let runningTotal = 0;
let buffer = "0";
let previousOperator;

/* Обращение к кнопкам на калькуляторе */

const screen = document.querySelector('.screen');

/* Создание ивента нажатия на клавишу */

function buttonClick(value){
	if(isNaN(value)){
		handleSymbol(value);
	}else{
		handleNumber(value);
	}
	screen.innerText = buffer;
}

/* Обработка нажатия на клавишу */

function handleSymbol(symbol){
	switch(symbol){
		case 'C':
			buffer = '0';
			runningTotal = 0;
			break;
		case '=':
			if(previousOperator === null){
				return
			}
			flushOperation(parseInt(buffer));
			previousOperator = null;
			buffer = runningTotal;
			runningTotal = 0;
			break;
		case '←':
			if(buffer.length === 1){
				buffer = '0';
			}else{
				buffer = buffer.substring(0, buffer.length - 1);
			}
			break;
		case '+':
		case '−':
		case '×':
		case '÷':
			handleMatch(symbol);
			break;
	}
}

/* Обработка 0 */

function handleMatch(symbol){
	if(buffer == '0'){
		return;
	}

	const intBuffer = parseInt(buffer);

	if(runningTotal === 0){
		runningTotal = intBuffer;
	}else{
		flushOperation(intBuffer)
	}
	previousOperator = symbol;
	buffer = '0';
}

/* Обработка "+" "-" "*" "/" */

function flushOperation(intBuffer){
	if(previousOperator === '+'){
		runningTotal += intBuffer;
	}else if(previousOperator === '−'){
		runningTotal -= intBuffer;
	}else if(previousOperator === '×'){
		runningTotal *= intBuffer;
	}else if(previousOperator === '÷'){
		runningTotal /= intBuffer;
	}
}

/* Набор на экран */

function handleNumber(numberString){
	if(buffer === "0"){
		buffer = numberString;
	}else{
		buffer += numberString;
	}
}

/* Инит клика */

function init(){
	document.querySelector('.calc-buttons').
	addEventListener('click', function(event){
		buttonClick(event.target.innerText);
	})
}

init();