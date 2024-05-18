'use strict';

const billInput = document.getElementById('bill-input');
const peopleInput = document.getElementById('people-input');
const customTipInput = document.getElementById('custom-tip-input');
const inputs = document.querySelectorAll('.input');
const tipPercents = document.querySelectorAll('.tip');

const tipDisplayValue = document.getElementById('tip-display');
const totalDisplayValue = document.getElementById('total-display');
const resetBtn = document.getElementById('reset-button');

// reset the calculator
resetBtn.addEventListener('click', () => {
  billInput.value = '';
  tipPercents.forEach(tipBtn => {
    tipBtn.classList.remove('selected');
  });
  // tipPercents[2].classList.add('selected');
  customTipInput.value = '';
  peopleInput.value = 1;

  tipDisplayValue.innerHTML = '0.00';
  totalDisplayValue.innerHTML = '0.00';

  resetBtn.classList.remove('completed');

});

function split (amount, people) {
  if (people === 0) return 0;
  return amount / people;
}

function calculateTotal (bill, tip) {
  return bill + tip;
}

function tipSplitter () {
  const billValue = parseFloat(billInput.value);
  const numberOfPeople = parseFloat(peopleInput.value);

  let tipPercent = parseInt(document.querySelector('.tip.selected').dataset.percentage);

  if (customTipInput.classList.contains('selected')) {
    tipPercent = parseFloat(customTipInput.value);
  }

  if (billValue && tipPercent && numberOfPeople) {
    const tip = billValue * tipPercent / 100;
    const tipPerPerson = parseFloat(split(tip, numberOfPeople).toFixed(2));
    const totalPerPerson = parseFloat(calculateTotal(split(billValue, numberOfPeople), tipPerPerson).toFixed(2));

    tipDisplayValue.innerHTML = tipPerPerson;
    totalDisplayValue.innerHTML = totalPerPerson;

    resetBtn.classList.add('completed');
  }

  // Show error messages
    let billInputParent = billInput.parentElement;
    let peopleInputParent = peopleInput.parentElement;

    if (billValue == 0) {
      billInput.classList.add('error');
      billInputParent.querySelector('.error-msg').style.display = 'block';
    } else {
      billInput.classList.remove('error');
      billInputParent.querySelector('.error-msg').style.display = 'none';
    }

    if (numberOfPeople == 0) {
      peopleInput.classList.add('error');
      peopleInputParent.querySelector('.error-msg').style.display = 'block';
    } else {
      peopleInput.classList.remove('error');
      peopleInputParent.querySelector('.error-msg').style.display = 'none';
    }
  }



// Make the tip percentage btns clickable
tipPercents.forEach(btn => {
  btn.addEventListener('click', () => {
    tipPercents.forEach(tipBtn => {
      tipBtn.classList.remove('selected');
    });

    btn.classList.add('selected');
    tipSplitter();
  });
});

// Any value change will run the calculator
for (const input of inputs) {
  input.addEventListener('change', tipSplitter);
}
