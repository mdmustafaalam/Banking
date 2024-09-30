'use strict';

// Data
const account1 = {
  owner: 'Mustafa Alam',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const account2 = {
  owner: 'Suraj Kumar',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const account3 = {
  owner: 'Antar Baba',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const account4 = {
  owner: 'Jhandu Bamm',
  movements: [430, 1000, 700, 50, 90, 500, 20, 699],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');

const msgElem = document.querySelector('.msg');
const warnSound = document.querySelector('.warnig');
const moneySent = document.querySelector('.money-sent');
const userDetailsCon = document.querySelector('.userDetails');
const userDetails = document.querySelector('.details');
const btnDetails = document.querySelector('.loginD');
const btnOpenAcc = document.querySelector('.open-account');
const accountForm = document.querySelector('.account-form');
const btnAccCose = document.querySelector('.form_close-btn');
const btnCreateAcc = document.querySelector('.create-account-btn');
const newName = document.querySelector('#name');
const newPin = document.querySelector('#pin');
const newIntresRate = document.querySelector('#rate');
const openingBalance = document.querySelector('#balance');

const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////// start here////////////////////////////////////

// =====================displaying data==========================//
const showMsg = (msg, color) => {
  msgElem.classList.add('msg_active');
  msgElem.textContent = msg;
  msgElem.style.backgroundColor = color;
  setTimeout(() => {
    msgElem.classList.remove('msg_active');
  }, 3500);
}
const displayMovements = (movement) => {
  containerMovements.innerHTML = ''
  movement.forEach((mov, i) => {
    let movType = mov > 0 ? 'deposit' : 'withdrawal';
    let date = new Date(currentAccount.movementsDates[i]);
    let now = new Date();
    let yearD = now.getFullYear() - date.getFullYear();
    let monthD = now.getMonth() - date.getMonth();
    let dayD = now.getDay() - date.getDay();
    let hrD = now.getHours() - date.getHours();
    let minD = now.getMinutes() - date.getMinutes();
    let displayDate = date.toLocaleDateString();
    if (yearD == 0 && monthD == 0 && dayD == 0 && hrD == 0 && minD == 0) {
      displayDate = 'just now';
    } else if (yearD == 0 && monthD == 0 && dayD == 0 && hrD == 0 && minD >= 1) {
      displayDate = `${minD} min ago`;
    } else if (yearD == 0 && monthD == 0 && dayD == 0 && hrD >=1) {
      displayDate = `${hrD} hour ago`;
    }
    let html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${movType}">${i + 1} ${movType}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${mov}</div>
      </div>`
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}
const computeUserName = (user) => {
  let userName = user.toLowerCase().split(' ').map(name => name[0]).join('')
  return userName;
}
accounts.forEach(acc => {
  acc.userName = computeUserName(acc.owner)
})
const printTottal = (movements) => {
  labelBalance.textContent = '₹ ' + movements.reduce((acc, mov) => acc + mov, 0)
}
const calcDisplaySummary = (acc) => {
  let incomes = acc.movements.filter(mov => mov > 0);
  labelSumIn.textContent = incomes.reduce((acc, mov) => acc + mov, 0) + '  ';

  let outComes = acc.movements.filter(mov => mov < 0);
  labelSumOut.textContent = outComes.reduce((acc, mov) => acc + mov, 0) * -1 + '  ';

  let interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate) / 100).filter(int => int >= 1).reduce((acc, mov) => acc + mov, 0)
  labelSumInterest.textContent = interest.toFixed(2) + '  '
}
const updateUI = () => {
  displayMovements(currentAccount.movements);
  calcDisplaySummary(currentAccount);
  printTottal(currentAccount.movements)
}
const sortMovements = (movements) => {
  let newMov = [...movements]
  let sorted = newMov.sort((a, b) => a - b)
  return sorted;
}
let sorted = false;
btnSort.addEventListener('click', () => {
  if (!sorted) {
    displayMovements(sortMovements(currentAccount.movements))
  } else {
    displayMovements(currentAccount.movements)
  }
  sorted = !sorted;
})
// calcDisplaySummary(movements)
// displayMovements(movements)
// console.log(computeUserName(account3.owner));
// printTottal(movements)
//===========================================================/
//=======================login user======================/
let currentAccount;
let timerFn;
const logOut = () => {
  currentAccount = undefined;
  containerApp.style.opacity = 0;
  userDetailsCon.style.display = 'flex';
  labelWelcome.textContent = 'Log in to get started'
  clearInterval(timerFn)
}
const timer = () => {
  let min = 5;
  let sec = 0;
  timerFn = setInterval(() => {
    if (min == 0 && sec == 0) {
      showMsg('Session is ended', '#f5465d')
      logOut()
    }
    if (min == 2 && sec == 0) {
      showMsg('Your session will be end in 2 min', '#f5465d')
      warnSound.play();
    }
    if (sec > 0) {
      sec--
    } else if (sec == 0) {
      min--
      sec = 59;
    }
    labelTimer.textContent = `${min}:${sec} Min`
  }, 1000);
}
const loginUser = () => {
  containerApp.style.opacity = 1;
  userDetailsCon.style.display = 'none';
  updateUI()
  labelWelcome.textContent = 'Wellcome Back, ' + currentAccount.owner.split(' ')[0];
  setInterval(() => {
    labelDate.textContent = `${new Date().toLocaleDateString()} - TIME: ${new Date().toLocaleTimeString()}`
  }, 1000);

  inputLoginPin.value = '';
  inputLoginUsername.value = '';
  inputLoginUsername.blur()
  inputLoginPin.blur()
  showMsg(`${currentAccount.owner.split(' ')[0]} is loged in`, '#39b385');
  clearInterval(timerFn)
  timer();
}
btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  currentAccount = accounts.find(acc => {
    if (acc.userName === inputLoginUsername.value && acc.pin === Number(inputLoginPin.value)) {
      return acc;
    }
  });
  if (currentAccount) {
    loginUser()
  } else {
    showMsg('Invalid credential please try again', '#f5465d')
    logOut()
  }
})
//===========================================================/
//========================transfer funds=======================/

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  let currentAccountBalance = currentAccount.movements.reduce((acc, mov) => acc + mov, 0)
  if (inputTransferTo.value.trim() && inputTransferAmount.value) {
    let receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value);
    let amount = Number(inputTransferAmount.value)
    let buffer = Math.trunc(Math.random() * (1500 - 500) + 500)
    if (currentAccountBalance >= amount) {
      if (receiverAcc && inputTransferTo.value !== currentAccount.userName) {
        if (inputTransferAmount.value > 0) {
          currentAccount.movements.push(amount * -1);
          currentAccount.movementsDates.push(new Date().toISOString())
          receiverAcc.movements.push(amount);
          receiverAcc.movementsDates.push(new Date().toISOString())
          setTimeout(() => {
            updateUI()
            showMsg(`${amount} sucessfuly transferd to ${receiverAcc.owner.split(' ')[0]}`)
            moneySent.play()
          }, buffer)
          inputTransferAmount.value = inputTransferTo.value = '';
          inputTransferAmount.blur()
          inputTransferTo.blur()

        } else { showMsg('Enter valid amount', '#ffcb03'); }
      } else {
        showMsg('Please enter valid username', '#ffcb03')
        inputTransferTo.value = ''
        inputTransferTo.focus()
      }
    } else {
      showMsg('insufficient balance 😓😓')
      inputTransferAmount.focus()
      inputTransferAmount.style.color = 'red'
    }
  }
  else {
    showMsg('Please enter details..', '#ffcb03')
  }
})
inputTransferAmount.addEventListener('keydown', (e) => {
  inputTransferAmount.style.color = 'black'
})
//===========================================================/

//========================close acc=============================/
btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  let userName = inputCloseUsername.value;
  let pin = inputClosePin.value;
  if (confirm(`are your sure ${currentAccount.owner.split(' ')[0]} close your account`)) {
    if (userName && inputClosePin.value) {
      if (userName == currentAccount.userName && pin == currentAccount.pin) {
        accounts.splice(accounts.findIndex(acc => acc.userName == userName), 1)
        logOut()
        inputCloseUsername.value = inputClosePin.value = '';
      } else {
        showMsg('You must be login to close account')
      }
    } else {
      showMsg('please enter correct details')
    }
  }
  updateLoginDetails()
})
//===========================================================/
//============================Loan===========================/
const loanAproved = (amount) => {
  currentAccount.movements.push(amount)
  currentAccount.movementsDates.push(new Date().toISOString())
  updateUI()
  moneySent.play()
  showMsg('Loan approved From bank manager','#44ca97')
}
btnLoan.addEventListener('click', (e) => {
  e.preventDefault()
  let loanamount = +inputLoanAmount.value;
  let buffer = Math.trunc(Math.random() * (2500 - 1000) + 1000)
  if (loanamount) {
    if (currentAccount.movements.reduce((acc, mov) => acc + mov, 0) * .3 >= loanamount) {
      if(loanamount>0){
        inputLoanAmount.value = ''
        setTimeout(() => {
          loanAproved(loanamount)
        }, buffer);
      }else{
        showMsg('Please enter valid amount','#ffcb03')
      }
    }
    else {
      showMsg('Please try to smaller amount','#ffcb03')
    }
  }
})


//===========================================================/
// login details..
function updateLoginDetails() {
  userDetails.innerHTML = "";
  accounts.forEach(acc => {
    let html = `${acc.userName} ==> ${acc.pin}<br>`;
    userDetails.insertAdjacentHTML('beforeend', html);
  })
}
updateLoginDetails()
btnDetails.addEventListener('click', () => {
  userDetails.classList.toggle('details_active')
})

// overlay add on document....
const overlay = document.querySelector('.overlay')
overlay.style.height = document.body.scrollHeight + 'px';
overlay.style.width = '100%';

// Open new account
let openWindow = false;
const createNewAccount = () => {
  let username = newName.value.toLowerCase().split(" ").map(l=>l[0].toUpperCase()+l.slice(1,l.length)).join(" ");
  let userpin = newPin.value;
  let userrate = newIntresRate.value;
  let newAccBalance = openingBalance.value;
  accounts.push({
    owner: username,
    pin: +userpin,
    interestRate: userrate,
    movements: [+newAccBalance],
    movementsDates:[new Date().toISOString()],
    userName:username.split(' ').map(name=>name[0]).join('')
  })
  userDetails.innerHTML = '';
  updateLoginDetails()
  newName.value = newPin.value = newIntresRate.value = ''
  accountForm.classList.remove('account-form-active');
  overlay.classList.remove('overlay-add')
  showMsg('Account created sucsessfuly done..','#44ca97')
}
btnOpenAcc.addEventListener('click', (e) => {
  e.preventDefault();
  accountForm.classList.add('account-form-active')
  overlay.classList.add('overlay-add')
  newName.focus()
  openWindow = true;
})
overlay.addEventListener("click",()=>{
  accountForm.classList.remove('account-form-active')
  overlay.classList.remove('overlay-add')
  openWindow = false
})
btnAccCose.addEventListener('click', (e) => {
  e.preventDefault()
  accountForm.classList.remove('account-form-active')
  overlay.classList.remove('overlay-add')
  openWindow = false
})
btnCreateAcc.addEventListener('click', (e) => {
  e.preventDefault();
  let name = newName.value.trim();
  let pin = newPin.value;
  let rate = newIntresRate.value;
  let balance = openingBalance.value;
  if (name && pin && rate) {
    if (String(pin).length == 4) {
      for (let i = 0; i < accounts.length; i++) {
        if (name == accounts[i].owner) {
          showMsg('The user is allrady regesterd', '#39b385 ')
          return;
        }
      }
      createNewAccount()
    }
    else {
      showMsg('Pin should be 4 digit', '#39b385 ')
    }
  } else {
    showMsg('Please fill the form details', '#39b385 ')
  }
})