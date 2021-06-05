// buttons
const mode = document.querySelector('.in-switch');
const addBtn = document.querySelector('.add-button');
const deleteBtn = document.querySelector('.delete-button');
const closeBtn = document.querySelector('.button-close');
const saveBtn = document.querySelector('.button-save');
// inputs 
const currency = document.querySelector('#select1');
const category = document.querySelector('#select2');
const title = document.querySelector('#in-title');
const cash = document.querySelector('#in-value');

// others
var color = document.querySelector(':root');
const menu = document.querySelector('.wrapper');
const shadow = document.querySelector('.shadow1');
const error = document.querySelector('.error');
const mainMoney = document.querySelector('.money');

// history
const proceeds = document.querySelector('.history-leftside');
const expenses = document.querySelector('.history-rightside');

let actualMoney = 0;

const show = () => {
    shadow.style.visibility === 'visible' ? shadow.style.visibility = 'hidden' : shadow.style.visibility = 'visible';

    shadow.classList.toggle('animations');
}
window.addEventListener('click', e => { e.target === shadow ? shadow.style.visibility = 'hidden' : false });

addBtn.addEventListener('click', show);
closeBtn.addEventListener('click', () => {
    clearMenu(category, title, cash);
});

const checkErrors = (in1, in2, in3) => {
    if(in1.value == 'category' || in2.value == '' || in3.value == '') {
        error.style.visibility = 'visible';
        error.textContent = 'fill in all fields';
    }
    else {
        addNewTran(); 
    }
}
const clearMenu = (in1, in2, in3) => {
    show();
    in1.value = 'category';
    in2.value = '';
    in3.value = ''
    error.style.visibility = 'hidden';
}
const updateFunds = (mark) => {
    actualMoney = `${actualMoney} ${mark} ${parseFloat(cash.value)}`; 
    mainMoney.textContent = actualMoney.toFixed(2);
};

const addNewTran = () => {
    switch (category.value) {
        case 'proceed': 
            createElements(proceeds, 'cash-color1');
             actualMoney = actualMoney + parseFloat(cash.value); 
             mainMoney.textContent = actualMoney.toFixed(2);
            break;
        case 'expense':     
            createElements(expenses, 'cash-color2');
            actualMoney = actualMoney - parseFloat(cash.value); 
            mainMoney.textContent = actualMoney.toFixed(2);
            break;
    }
    clearMenu(category, title, cash);
}

const createElements = (side, color) => {

    let newTran = document.createElement("DIV");
    let newTitle = document.createElement("P");
    let newCash = document.createElement("P");
    let newButton = document.createElement("BUTTON");
    let xIcon = document.createElement("I");

    let newTitleText = document.createTextNode(title.value);
    //let valueToCalculate = document.createTextNode(cash.value);
    let newCashValue = document.createTextNode(`${cash.value} ${currency.value}`);

    newTitle.appendChild(newTitleText);
    newCash.appendChild(newCashValue);
    newButton.appendChild(xIcon);
    newCash.appendChild(newButton);

    newTran.appendChild(newTitle);
    newTran.appendChild(newCash);

    
    newTran.classList.add('transaction');
    xIcon.classList.add('far');
    xIcon.classList.add('fa-times-circle');
    newButton.classList.add('newBtn');
   
    newCash.classList.add(color);

    side.appendChild(newTran);

    // delete this operation
    const btnX = document.querySelectorAll('.newBtn');
    function deleteNote(e) {  
        const parent = this.parentElement;
        const parent2 = parent.parentElement;
        
        if(parent2.parentElement === proceeds) {
            actualMoney = actualMoney - 10; // warunek dziala, inan wartosc
            mainMoney.textContent = actualMoney;// zapamietywac wartosci albo jakos wyciagnac ta wartosc
        }
        else {
            actualMoney = actualMoney + 10; 
            mainMoney.textContent = actualMoney;
        }

        e.target = parent2.remove();

    }
    btnX.forEach(element => {
        element.addEventListener('click', deleteNote);
    });

}

const updateMoney = (money) => {
    money.textContent = cash.value;
}
const deleteAll = () => {
    const elements = document.querySelectorAll('.transaction');
    elements.forEach( element => {
        element.remove();
    });
    actualMoney = 0;
    mainMoney.textContent = '0.00';
}
deleteBtn.addEventListener('click', deleteAll);

saveBtn.addEventListener('click', () => {
    checkErrors(category, title, cash);
});

// mode
const setColor = (c1, c2) => {
    color.style.setProperty('--color1', c2);
    color.style.setProperty('--color2', c1);
}
mode.addEventListener('click', () => {
    switch(mode.checked) {
        case true:
            setColor('white', 'black');
        break;
        case false:
            setColor('black', 'white');
        break;
    }
    
});
