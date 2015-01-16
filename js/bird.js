﻿var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create,update:update ,render:render});

function preload() {

    game.load.image('chaos', 'file/header-bg2.jpg');

}

var sprite;
var mask;

function create() {

    //  Here we add a Sprite to the display list
    sprite = game.add.sprite(0, 0, 'chaos');
    sprite.scale.set(2);

    //  A mask is a Graphics object
    mask = game.add.graphics(0, 0);

    //  Shapes drawn to the Graphics object must be filled.
    mask.beginFill(0xffffff);

    //  Here we'll draw a circle
    mask.drawCircle(100, 100, 100);

    //  And apply it to the Sprite
    sprite.mask = mask;

    //  As you move the mouse / touch, the circle will track the sprite
    game.input.addMoveCallback(move, this);

}

function move(pointer, x, y) {

    mask.x = x - 100;
    mask.y = y - 100;

}

function update()
{

 if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
       var cpx=mask.position.x;
       var cpy=mask.position.y;
       mask.scale.set(0.5,0.5);
       mask.position.x=cpx;
       mask.position.y=cpy;
       
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
     mask.scale.set(1,1);
    }


}

function render () {

    game.debug.geom(mask,'#0fffff');

}