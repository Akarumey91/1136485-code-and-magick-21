'use strict';

var WIZARD_FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var WIZARD_SECOND_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var userDialog = document.querySelector('.setup');
var userIconButton = document.querySelector('.setup-open');
var userDialogCloseButton = document.querySelector('.setup-close');
var userNameInput = document.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

// document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomData = function (arr) {
  return arr[Math.floor(Math.random() * Math.floor(arr.length))];
};

var getRandomWizard = function (firstName, secondName, coatColor, eyesColor) {
  var someWizard = {
    name: `${getRandomData(firstName)} ${getRandomData(secondName)}`,
    coatColor: getRandomData(coatColor),
    eyesColor: getRandomData(eyesColor),
  };
  return someWizard;
};

var getArrayOfWizards = function (quantityOfWizards) {
  var randomWizards = [];
  for (var j = 0; j < quantityOfWizards; j++) {
    randomWizards.push(getRandomWizard(WIZARD_FIRST_NAMES, WIZARD_SECOND_NAMES, COAT_COLORS, EYES_COLORS));
  }
  return randomWizards;
};
var wizards = getArrayOfWizards(4);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fillSimilarList = function (wizardsArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsArray.length; i++) {
    fragment.appendChild(renderWizard(wizardsArray[i]));
  }
  similarListElement.appendChild(fragment);
};
fillSimilarList(wizards);

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && evt.target !== userNameInput) {
    evt.preventDefault();
    closeUserDialog();
  }
};
var openUserDialog = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
var closeUserDialog = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

userIconButton.addEventListener('click', function () {
  openUserDialog();
});
userIconButton.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    openUserDialog();
  }
});
userDialogCloseButton.addEventListener('click', function () {
  closeUserDialog();
});
userDialogCloseButton.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    closeUserDialog();
  }
});

var count = 0;

var changeColor = function (array, parameter) {
  if (count === array.length - 1) {
    count = -1;
  }
  count++;
  parameter.style.fill = array[count];
};
var changeFireballColor = function (array, parameter) {
  if (count === array.length - 1) {
    count = -1;
  }
  count++;
  parameter.style.backgroundColor = array[count];
};

wizardCoat.addEventListener('click', function () {
  changeColor(COAT_COLORS, wizardCoat);
});
wizardEyes.addEventListener('click', function () {
  changeColor(EYES_COLORS, wizardEyes);
});
wizardFireball.addEventListener('click', function () {
  changeFireballColor(FIREBALL_COLORS, wizardFireball);
});
