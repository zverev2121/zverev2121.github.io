var pjs = new PointJS('2D', 1280 / 2, 720 / 2, { // 16:9
	backgroundColor : '#59AAC8' // if need
});
pjs.system.initFullPage(); // for Full Page mode
// pjs.system.initFullScreen(); // for Full Screen mode (only Desctop)

pjs.system.initFPSCheck();

var platformer = new PlatformerJS(pjs);

var log    = pjs.system.log;     // log = console.log;
var game   = pjs.game;           // Game Manager
var point  = pjs.vector.point;   // Constructor for Point
var camera = pjs.camera;         // Camera Manager
var brush  = pjs.brush;          // Brush, used for simple drawing
var OOP    = pjs.OOP;            // Object's manager
var math   = pjs.math;           // More Math-methods
var levels = pjs.levels;         // Levels manager

var key   = pjs.keyControl.initKeyControl();
// var mouse = pjs.mouseControl.initMouseControl();
// var touch = pjs.touchControl.initTouchControl();
// var act   = pjs.actionControl.initActionControl();

var width  = game.getWH().w; // width of scene viewport
var height = game.getWH().h; // height of scene viewport

pjs.system.setTitle('PointJS Game'); // Set Title for Tab or Window

// Game Loop
game.newLoopFromConstructor('myGame', function () {
	// Constructor Game Loop
	var score = 0;

	// Для этого игрового цикла установим фон
	platformer.setBackImage('img/back.png');

	// переменная с размером ячейки (квадратные будут)
	var tileSize = 35;

	//
	platformer.onOptionCollision = function (player, option) {
		if (option.desc == 'level ok') {
			document.location.reload();
		}
	};

	platformer.onCellCollision = function (player, cell) {
		score += 1;
		platformer.del(cell);
	};

	platformer.onEnemyCollision = function (player, enemy) {
		if (player.y+player.h < enemy.y+enemy.h/2 && player.speed.y > 0) {
			platformer.del(enemy);
			player.jumped = false;
			player.jump(5);
		} else {
			score = -100;
			document.location.reload();
		}
	};


	// Это самопальный "построитель" карты уровня, притивный и простой
	var map = [
		'',
		'0000000000000000000000000000000',
		'0                            00',
		'0   *****8	          8       00',		       
		'0**0000000       0 80000     00',
		'0******000000     0000000 000000',
		'0000000000000  0 0000000     00',
		'0000000000000000000000000000 00',
		' 0000000      *******        00',
		'  00000         *** 8*       00',
		'   000  11111   11111        00',
		'   000        11             000000000000000',
		'   000                                     00',
		'   000      111111 ***         00   ***8   000',
		'   000             111 ****  110000000000000000',
		'   000                  0000   00          000',
		'   000   ***           000000    8         00',
		'   000   00000000000000000000000000000000000',
		'  00000  000000000     000000',
		' 0000000   8       000 000000',
		'0000000000000000000000 000000',
		'0!                 *0  *00000',
		'00000000000000000  *0  *00000',
		'0                 000  *00000',
		'0 00000000000000000000 000000',
		'0                      000000',
		'00000000000000  00 0000000000',
		'000000000000000 ***0000000000',
		'0000000000000000***0000000000',
		'00000000000000000000000000000',
	];

	// Тут проходим по массиву со строками
	// и на его основе создаем соответствующие блоки
	// Чтобы понять, как это работает, посмотрите видеоуроки:
	// https://www.youtube.com/watch?v=xd04kZZqyQU - создание карты уровня часть 1
	// https://www.youtube.com/watch?v=YPEYy7SqK_c - создание карты уровня часть 2
	OOP.forArr(map, function (string, y) {
		OOP.forArr(string, function (cell, x) {
			if (cell == '0')
				platformer.addWall(game.newImageObject({
					positionC : point(tileSize * x, tileSize * y),
					w : tileSize, h : tileSize,
					file : 'img/ground.png'
				}));
			else if (cell == '1')
				platformer.addWall(game.newImageObject({
					positionC : point(tileSize * x, tileSize * y),
					w : tileSize, h : tileSize,
					file : 'img/brick.png'
				}));
			else if (cell == '*')
				platformer.addCell(game.newAnimationObject({
					positionC : point(tileSize * x, tileSize * y),
					animation : pjs.tiles.newAnimation('img/cell.png', 21, 33, 4),
					w : tileSize / 2, h : tileSize / 2,
					delay : math.random(50, 200) / 10,
					userData : {
						jumpSpeed : math.random(2, 10)
					}
				}));
			else if (cell == '8')
				platformer.addEnemy(game.newAnimationObject({
					positionC : point(tileSize * x, tileSize * y),
					animation : pjs.tiles.newAnimation('img/enemy.png', 44, 32, 2),
					w : 44 / 1.5, h : 32 / 1.5,
					delay : math.random(50, 200) / 10,
					userData : {
						jumpSpeed : math.random(2, 10),
						gravity : 2,
						speed : point(-1, 0)
					}
				}));
			else if (cell == '!')
				platformer.addOption(game.newImageObject({
					positionC : point(tileSize * x, tileSize * y),
					file : pjs._logo,
					w : tileSize, h : tileSize,
					userData : {
						desc : 'level ok'
					}
				}));

		});
	});

	// Создание объекта
	var rect = game.newImageObject({
		positionC : point(150, 50), // central position of text
		w : 30, h : 30,
		file : 'img/action.png'
	});
	platformer.addAction(rect);
	rect.friction = 0.1;
	rect.gravity = 0.5;
	platformer.setPlayer(rect);



	// Основной цикл
	this.update = function () {
		// Update function
		game.clear(); // clear screen

		if (key.isDown('LEFT'))
			rect.speed.x = -3;
		else if (key.isDown('RIGHT'))
			rect.speed.x = 3;

		// вращаем относительно скорости движения
		rect.turn(rect.speed.x*3);

		if (key.isPress('UP'))
			rect.jump(10); //rect.speed.y = -2;
		else if (key.isDown('DOWN'))
			rect.speed.y += 2;

		if (rect.y > 1000) {
			rect.y = 10;
			rect.x = 150;
		}

		// обновление и отрисовка платформера
		platformer.update();

		// следим за нашим объектом
		camera.follow(rect);

		brush.drawTextS({
			text : 'Фпс: ' + pjs.system.getFPS(),
			size : 50,
			color : 'Red'
		});

		brush.drawTextS({
			y : 50,
			text : 'Очки: ' + score,
			size : 50,
			color : 'RED'
		});

	};

});

game.startLoop('myGame');