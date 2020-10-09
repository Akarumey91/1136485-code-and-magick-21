"use strict";

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;

var PLAYER = {
  X: CLOUD_WIDTH / 2,
  Y: CLOUD_HEIGHT,
};

var BAR = {
  X: CLOUD_WIDTH / 2,
  Y: CLOUD_HEIGHT - 20,
  WIDTH: 40,
  HEIGHT: -150,
  WIDTH_BETWEEN_BARS: 50,
};

var CLOUD_HEADER = {
  X: CLOUD_WIDTH / 2,
  Y: CLOUD_Y + FONT_GAP + GAP,
  SIZE: `16px`,
  FONT: `PT Mono`,
};

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
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, "rgba(0, 0, 0, 0.7)");
  renderCloud(ctx, CLOUD_X, CLOUD_Y, "#fff");

  ctx.fillStyle = "#000";
  ctx.font = `${CLOUD_HEADER.SIZE} ${CLOUD_HEADER.FONT}`;
  ctx.fillText(`Ура вы победили!`, `${CLOUD_HEADER.X}`, `${CLOUD_HEADER.Y}`);
  ctx.fillText(
    `Список результатов:`,
    `${CLOUD_HEADER.X}`,
    `${CLOUD_HEADER.Y + FONT_GAP}`
  );

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], PLAYER.X, PLAYER.Y);
    PLAYER.X += BAR.WIDTH_BETWEEN_BARS;
    ctx.fillRect(BAR.X, BAR.Y, BAR.WIDTH, (BAR.HEIGHT * times[i]) / maxTime);
    BAR.X += BAR.WIDTH_BETWEEN_BARS;
  }
};
