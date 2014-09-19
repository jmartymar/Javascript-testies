enchant();

window.onload = function() {
	var game = new Core(320,320);
	
	game.preload("images/chara1.png");

	game.onload = function() {
		var bear = new Sprite(32,32);
		bear.image = game.assets['images/chara1.png'];
		bear.frame = [5,6,5,7];
		game.rootScene.addChild(bear);

	};
	
	game.start();
};