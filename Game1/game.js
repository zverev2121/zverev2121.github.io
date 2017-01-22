// Создание движка
var pjs = new PointJS("2d", 650, 500, {
  backgroundColor : 'white'
});
pjs.system.setTitle("Зверев");
pjs.system.initFPSCheck();
// Ссылки на объекты. Библеотека
var game = pjs.game;
var brush = pjs.brush;
var OOP = pjs.OOP;
var point  = pjs.vector.point;
var camera = pjs.camera; 
var math = pjs.math;
var v2d = pjs.vector.v2d;

var key = pjs.keyControl.initKeyControl();
var mouse = pjs.mouseControl.initMouseControl();
var log = pjs.system.log;

var newGame = game.newBaseObject({
  x : 395, y : 150, 
  w : 220, h : 40,
});

var newGame1 = game.newBaseObject({
  x : 420, y : 193, 
  w : 160, h : 35,
});

var newGame2 = game.newBaseObject({
  x : 430, y : 232, 
  w : 130, h : 35,
});

var sl = game.newImageObject({
	  x: 50, y: 25,
	  w : 217, h : 400,
	  file : 'img/солдат-меню.png'
  });
var tr = game.newImageObject({
	  x: 0, y: 325,
	  w : 750, h : 150,
	  file : 'img/trava.png'
  });
  var les = game.newImageObject({
	  x: 0, y: 0,
	  w : 650, h : 500,
	  file : 'img/les.png'
  });
   var st = game.newImageObject({
	  x: 350, y: 70,
	  w : 300, h : 350,
	  file : 'img/Стенд.png'
  });
  var back = game.newBaseObject({
  x : 0, y : 0, 
  w : 120, h : 35,
});
   var br = game.newImageObject({
	  x: -75, y: 435,
	  w : 855, h : 75,
	  angle : 0,
	  file : 'img/Бревно.png'
   });
   var br1 = game.newImageObject({
	  x: 10, y: 443,
	  w : 150, h : 49,
	  angle : 0,
	  file : 'img/Бревно1.png'
   });
   var nik = game.newImageObject({
	  x: 215, y: 70,
	  w : 150, h : 100,
	  angle : 0,
	  file : 'img/Ник.png'
   });

   var nik1 = game.newImageObject({
	  x: 215, y: 150,
	  w : 150, h : 100,
	  angle : 0,
	  file : 'img/Ник.png'
   });
   
game.newLoop('menu', function(){
	game.clear();
	game.fill('#cdbdff');
	//Лес
	les.draw();
//nik.draw();
nik1.draw();
	//Стенд
	st.draw();
  // Солдат в меню
  sl.draw();
    	//трава
	tr.draw();
  	//бревно
	br.draw();
	br1.draw();



	  brush.drawText({
    text : "Территория",
    color : "#FF3D3D",
    size : 35,
	style : 'bold',
    x : 400, y : 150

	});
	
	brush.drawText({
    text : "Магазин",
    color : "#FF3D3D",
    size : 35,
	style : 'bold',
    x : 430, y : 190

	});
	
	brush.drawText({
    text : "Склад",
    color : "#FF3D3D",
    size : 35,
	style : 'bold',
    x : 440, y : 230

	});
	
	//newGame.drawStaticBox('red');
  if (mouse.isInObject(newGame)){
	  brush.drawText({
    text : "Территория",
    color : "#FF3D3D",
    size : 35,
	style : 'bold',
    x : 400, y : 150,
	 strokeColor : 'black',
	strokeWidth : 2,
	});
  }
  if (mouse.isPeekStatic('LEFT',newGame.getStaticBox())){
	 game.setLoop('game');
	 
  };
  
  if (mouse.isInObject(newGame1)){
	  brush.drawText({
    text : "Магазин",
    color : "#FF3D3D",
    size : 35,
	style : 'bold',
    x : 430, y : 190,
	 strokeColor : 'black',
	strokeWidth : 2,
	});
  }
  if (mouse.isPeekStatic('LEFT',newGame1.getStaticBox())){
	 game.setLoop('magazin');
	 
  };
  
  if (mouse.isInObject(newGame2)){
	  brush.drawText({
    text : "Склад",
    color : "#FF3D3D",
    size : 35,
	style : 'bold',
    x : 440, y : 230,
	 strokeColor : 'black',
	strokeWidth : 2,
	});
  };
  if (mouse.isPeekStatic('LEFT',newGame2.getStaticBox())){
	 game.setLoop('sklad');
	 
  };
  brush.drawTextS({
			text : 'Фпс: ' + pjs.system.getFPS(),
			size : 20,
			x : 570, y : 0,
			color : 'Black',
			style : 'bold italic',
		});
});
	

var pl = game.newImageObject({
	  x: 325, y: 400,
	  w : 50, h : 37,
	  file : 'img/soldat.png'
  });
  
  
  var buls = [];

// Функция "Территория"
game.newLoop("game", function () {
	game.fill('#cdbdff');
	
	//Слежение за объектом
	var plPos = pl.getPositionC();
	//camera.follow(pl);
	
	OOP.forArr(buls, function(el){
		if (el.life){
		el.draw();
		el.moveAngle(5);// Скорость пули
		
	}	
});
	  // Отрисовка простого текста
  brush.drawText({
    text : "Стрелять левой кнопкой!",
    color : "Yellow",
    size : 25,
    x : 200, y : 350

  });
	
	//Рисовка объекта
	  pl.draw();
	  
	  //Оружее
		  brush.drawLineAngle({
	  x : plPos.x, y : plPos.y, 
	  length : 0, 
	  angle : pl.getAngle(), 
	  strokeColor : "green" ,
	  strokeWidth : 0
	});
	
	//вращение за мышью
	pl.rotate(mouse.getPosition());
	

	  
	  
	  
	  
	  //Управление
	  if (key.isDown('D'))
		  pl.move(point(1,0));
	  if (key.isDown('A'))
		  pl.move(point(-1,0));
	  if (key.isDown('W'))
		  pl.move(point(0,-1));
	  if (key.isDown('S'))
		  pl.move(point(0,1));

	  
	  if (mouse.isPress('LEFT')){
		var bul = game.newImageObject({
			x : plPos.x, y : plPos.y,
		  
	  w :10, h : 3,
	  file : 'img/bul.png',
		  userData : {
			  life : 1
	  },
	  angle : pl.getAngle()
	    
  });
  buls.push(bul);
	  };

    brush.drawTextS({
			text : 'Фпс: ' + pjs.system.getFPS(),
			size : 20,
			x : 570, y : 0,
			color : 'Black',
			style : 'bold italic',
		});

  
});

game.newLoop("magazin", function () {
		game.clear();		
	game.fill('#cdbdff');
	
	
	
	brush.drawText({
    text : "Назад",
    color : "#FF3D3D",
    size : 35,
	style : 'bold',
    x : 2, y : 0

	});
	//back.drawStaticBox('red');
	if (mouse.isInObject(back)){
	  brush.drawText({
    text : "Назад",
    color : "#FF3D3D",
    size : 35,
	style : 'bold',
    x : 2, y : 0,
	 strokeColor : 'black',
	strokeWidth : 2,
	});
  }
  if (mouse.isPeekStatic('LEFT',back.getStaticBox())){
	 game.setLoop('menu');
	 
  };
	  brush.drawTextS({
			text : 'Фпс: ' + pjs.system.getFPS(),
			size : 20,
			x : 570, y : 0,
			color : 'Black',
			style : 'bold italic',
		});
});

game.newLoop("sklad", function () {
		game.clear();		
	game.fill('#cdbdff');
	
	
	brush.drawText({
    text : "Назад",
    color : "#FF3D3D",
    size : 35,
	style : 'bold',
    x : 2, y : 0

	});
	//back.drawStaticBox('red');
	if (mouse.isInObject(back)){
	  brush.drawText({
    text : "Назад",
    color : "#FF3D3D",
    size : 35,
	style : 'bold',
    x : 2, y : 0,
	 strokeColor : 'black',
	strokeWidth : 2,
	});
  }
  if (mouse.isPeekStatic('LEFT',back.getStaticBox())){
	 game.setLoop('menu');
	 
  };
	  brush.drawTextS({
			text : 'Фпс: ' + pjs.system.getFPS(),
			size : 20,
			x : 570, y : 0,
			color : 'Black',
			style : 'bold italic',
		});
});
	

// Назначение игрового цикла как основного
game.setLoop('menu');

// Старт игрового цикла
game.start();
