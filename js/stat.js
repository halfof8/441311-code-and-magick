'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_HEIGHT = 20;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var INNER_MAGRIN = 30;
var BAR_GAP = 50;
var barHeight = 150 - INNER_MAGRIN;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, "rgba(0, 0, 0, 0.7)");
  renderCloud(ctx, CLOUD_X, CLOUD_Y, "#fff");

  ctx.fillStyle = "#000";
  ctx.font = "16px PT Mono";
  ctx.fillText(
    "Ура вы победили!",
    CLOUD_X + INNER_MAGRIN,
    CLOUD_Y + INNER_MAGRIN
  );
  ctx.fillText(
    "Список результатов:",
    CLOUD_X + INNER_MAGRIN,
    CLOUD_Y + INNER_MAGRIN + TEXT_HEIGHT
  );

  ctx.fillStyle = "#000";

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    //имя игрока
    ctx.fillStyle = "#000";
    ctx.fillText(
      players[i],
      CLOUD_X + INNER_MAGRIN + i * (BAR_WIDTH + BAR_GAP),
      CLOUD_Y + CLOUD_HEIGHT - INNER_MAGRIN
    );

    if (players[i] === "Вы") {
      //прямоугольник красный
      ctx.fillStyle = "rgba(255, 0, 0, 1)";
    } else {
      //прямоугольник синий + цвет от номера игрока
      ctx.fillStyle = "rgba(0, 0, 255, 0." + (i + 1) + ")";
    }

    ctx.fillRect(
      CLOUD_X + INNER_MAGRIN + i * (BAR_WIDTH + BAR_GAP),
      CLOUD_Y + CLOUD_HEIGHT -
        INNER_MAGRIN -
        TEXT_HEIGHT -
        barHeight * times[i] / maxTime,
      BAR_WIDTH,
      barHeight * Math.round(times[i]) / maxTime
    );

    //выводим время над столбцами
    ctx.fillStyle = "#000";
    ctx.fillText(
      Math.round(times[i]),
      CLOUD_X + INNER_MAGRIN + i * (BAR_WIDTH + BAR_GAP),
      CLOUD_Y +
        CLOUD_HEIGHT -
        INNER_MAGRIN -
        2 * TEXT_HEIGHT -
        barHeight * times[i] / maxTime
    );
  }
};
