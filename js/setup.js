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

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

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


userDialog.querySelector('.setup-similar').classList.remove('hidden');
