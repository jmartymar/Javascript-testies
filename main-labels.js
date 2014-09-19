enchant();

window.onload = function() {
	var game = new Core(320,320);
	
	game.addLabel = function(text, color, x, y) {
	        var label = new Label(text);
	        label.font = "16px sans-serif";
	        label.color = color;
	        label.x = x;
	        label.y = y;
	        game.rootScene.addChild(label);
	        label.addEventListener(Event.ENTER_FRAME, function() {
	        	label.y --;
		        if (label.age > 10) game.rootScene.removeChild(label);
			});
	};
	function rand(num) {
		return Math.floor(Math.random() * num);
	}

	game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
		if(game.frame % 3 === 0) {
			var score = rand(100);
			var r = rand(256);
			var g = rand(256);
			var b = rand(256);
			var x = rand(300);
			var y = rand(300);
			game.addLabel(score + " Points", "rgb(" + r + "," + g + "," + b + ")", x, y);
		}
	});
	
	game.start();
};