var STATUS_WAIT = 0;
var STATUS_WALK = 1;
var STATUS_JUMP = 2;

enchant();
window.onload = function() {
	var game = new Core(320,320);
	game.fps = 16;
	game.score = 0;
	var label;
	var bear;

	game.preload(
		'http://enchantjs.com/assets/images/chara1.gif',
        'http://enchantjs.com/assets/images/map0.gif',
        'http://enchantjs.com/assets/images/icon0.gif'
    );

    game.onload = function() {
    	var bg = new Sprite(320,320);
    	bg.backgroundColor = "rgb(0,200,255)";
    	var maptip = game.assets['http://enchantjs.com/assets/images/map0.gif'];
    	var image = new Surface(320,320);
    	for(var i = 0; i < 320; i += 16) {
    		image.draw(maptip,7*16,0,16,16,i,320-16,16,16);    		
    	}
    	bg.image = image;
    	game.rootScene.addChild(bg);

    	var pad = new Pad();
    	pad.x = 0;
    	pad.y = 220;
    	game.rootScene.addChild(pad);

    	label = new Label("");
    	game.rootScene.addChild(label);

    	var bear = new Sprite(32,32);
    	bear.image = game.assets['http://enchantjs.com/assets/images/chara1.gif'];
    	bear.x = 160 - 16;
    	bear.y = 320 - 16 - 32;
    	bear.status = STATUS_WAIT;
    	bear.anim = [10,11,10,12];
    	bear.frame = bear.anim[0];
    	game.rootScene.addChild(bear);

    	bear.addEventListener(Event.ENTER_FRAME, function() {

    		if(game.input.left) {
    			bear.x -= 6;
    			bear.scaleX = -1;
    		} else if(game.input.right) {
    			bear.x += 6;
    			bear.scaleX = 1;
    		}

    		if(!game.input.left && !game.input.right) {
    			bear.frame = bear.anim[0];
    		} else {
    			bear.frame = bear.anim[bear.age % bear.anim.length];
    		}

    	});

    	game.addApple = function(x,speed) {
	    	var apple = new Sprite(16,16);
	    	apple.image = game.assets['http://enchantjs.com/assets/images/icon0.gif'];
	    	apple.x = x;
	    	apple.y = -16;
	    	apple.frame = 15;
	    	apple.speed = speed;
	    	game.rootScene.addChild(apple);

	    	apple.addEventListener(Event.ENTER_FRAME, function() {
	    		apple.y += apple.speed;

	    		if(bear.within(apple,16)) {
	    			game.score += 30;
	    			game.rootScene.removeChild(apple);
	    		} else if(apple.y > 320 - 32) {
	    			game.rootScene.removeChild(apple);
	    		}
	    	});
    	};

		game.framesLeft = 10*game.fps;
		game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
			game.framesLeft--;
			if(game.framesLeft > 0) {
				if((game.frame % 10) === 0) {
					var x = rand(300);
					var speed = 3 + rand(6);
					game.addApple(x,speed);
				}
				label.text = "Time Left:" + Math.floor(game.framesLeft / game.fps) + "<br />Score:" + game.score;
			 } else {
			 	game.end(game.score, "Your score is " + game.score);
			 }
		});
    };
    game.start();

};

function rand(num) {
    return Math.floor(Math.random() * num);
}