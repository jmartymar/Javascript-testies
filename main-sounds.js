enchant();
window.onload = function() {
    //Game object creation
    var game = new Core(320, 320);
    game.fps = 16;
    game.score = 0;
    game.bananaNum = 10;
    game.time = 0;

    game.preload([
    	'sounds/se1.wav',
        'http://enchantjs.com/assets/images/icon0.gif',
        'http://enchantjs.com/assets/images/map0.gif'
    ]);


    //Called when the loading is complete
    game.onload = function() {

    	game.se = game.assets['sounds/se1.wav'];
        
        //Background creation
        var bg = new Sprite(320, 320);
        var maptip = game.assets['http://enchantjs.com/assets/images/map0.gif'];
        var image = new Surface(320, 320);
        for (var j = 0; j < 320; j += 16) {
            for (var i = 0; i < 320; i += 16) {
                image.draw(maptip, 16 * 2, 0, 16, 16, i, j, 16, 16);
            }
        }
        bg.image = image;
        game.rootScene.addChild(bg);
        
        //Add bananas
        for (var k = 0; k < 10; k++) game.addBanana();
        //Add skull
        game.addDokuro();
        //Periodic scene processing
        game.rootScene.addEventListener(Event.ENTER_FRAME, function(){
            game.time ++;
        });
    };
    
    //Adds a skull
    game.addDokuro = function(){
        var dokuro = new Sprite(16, 16);
        dokuro.x = rand(260) + 20;
        dokuro.y = rand(260) + 20;
        dokuro.image = game.assets['http://enchantjs.com/assets/images/icon0.gif'];
        dokuro.frame = 11;
        dokuro.addEventListener(Event.TOUCH_START, function(e) {
            game.end(0, "Game Over");
        });
        game.rootScene.addChild(dokuro);
    };
    
    //Adds a banana
    game.addBanana = function(){
        var banana = new Sprite(16, 16);
        banana.x = rand(260) + 20;
        banana.y = rand(260) + 20;
        banana.image = game.assets['http://enchantjs.com/assets/images/icon0.gif'];
        banana.frame = 16;
        //Event handling when the banana is touched
        banana.addEventListener(Event.TOUCH_START, function(e) {
            game.rootScene.removeChild(this);
            game.se.play();
            game.bananaNum--;
            if (game.bananaNum === 0){
                game.end(1000000 - game.time,
                    (game.time / game.fps).toFixed(2) + " seconds to Clear!");
            }
        });
        game.rootScene.addChild(banana);
    };
    
    //Start game
    game.start();
};
//Generates a random number
function rand(num){
    return Math.floor(Math.random() * num);
}