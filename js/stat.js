'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  var player = {
    x: CLOUD_WIDTH / 2,
    y: CLOUD_HEIGHT,
  };

  var bar = {
    x: CLOUD_WIDTH / 2,
    y: CLOUD_HEIGHT - 20,
    width: 40,
    maxHeight: -150,
    widthBetweenBars: 50,
  };

  var playerTime = {
    x: CLOUD_WIDTH / 2,
    y: 240,
  };

  var cloudHeader = {
    x: CLOUD_WIDTH / 2,
    y: CLOUD_Y + FONT_GAP + GAP,
    size: `16px`,
    font: `PT Mono`,
  };

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);

  ctx.fillStyle = `#000`;
  ctx.font = `${cloudHeader.size} ${cloudHeader.font}`;
  ctx.fillText(`Ура вы победили!`, `${cloudHeader.x}`, `${cloudHeader.y}`);
  ctx.fillText(
      `Список результатов:`,
      `${cloudHeader.x}`,
      `${cloudHeader.y + FONT_GAP}`
  );

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], player.x, player.y);
    player.x += bar.widthBetweenBars;
  }
  for (var j = 0; j < players.length; j++) {
    var height = Math.floor((bar.maxHeight * times[j]) / maxTime);
    if (players[j] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = `hsl(240, ${Math.random() * 100 + `%`}, 50%)`;
    }
    ctx.fillRect(bar.x, bar.y, bar.width, height);
    bar.x += bar.widthBetweenBars;
    ctx.fillStyle = `black`;
    ctx.fillText(Math.floor(times[j]), playerTime.x, height + playerTime.y);
    playerTime.x += bar.widthBetweenBars;
  }
};
