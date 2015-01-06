﻿var bodywidth = document.body.clientWidth;
unit = bodywidth * 0.01;
var stage_width = 98 * unit;
var stage_heigh = 98 * unit;
var stage = new PIXI.Stage(16777215);
var renderer = PIXI.autoDetectRenderer(stage_width, stage_heigh);
document.body.appendChild(renderer.view);
requestAnimFrame(animate);
stage.position.x = 1 * unit;
stage.position.y = 1 * unit;
stage.interactive = true;
var texture = PIXI.Texture.fromImage('file/bunny.png');
var graphics_board = new PIXI.Graphics();
function createBunny(nowposition) {
    var bunny = new PIXI.Sprite(texture);
    bunny.anchor.x = 0.5 * unit;
    bunny.anchor.y = 0.5 * unit;
    bunny.position.x = nowposition.x;
    bunny.position.y = nowposition.y;
    bunny.width = 5 * unit;
    bunny.height = 5 * unit;
    bunny.interaction = true;
    bunny.buttonMode = true;
    bunny.defaultCursor = 'pointer';
    bunny.rotation = bunny1 ? bunny1.rotation : 0;
    bunny.dir = 1;
    stage.addChild(bunny);
    bunny.mouseover = function (e) {
        bunny.alpha = 1;
    };
    bunny.mouseout = function (e) {
        bunny.alpha = 1;
    };
    return bunny;
}
stage.addChild(graphics_board);
function undo() {
    var lastchess = allchess.pop();
    if (lastchess) {
        chessarr[lastchess.x_off][lastchess.y_off] = false;
        lastchess.clear();
        stage.removeChild(lastchess);
        isblack = !isblack;
        return true;
    }
    return false;
};
function reset_board() {
    while (undo()) {
    };
};
function createBoard(x, y, x_count, y_count, width) {
    boardcolor = 13808780;
    linecolor = 0;
    // set a fill and line style
    graphics_board.beginFill(boardcolor, 1);
    graphics_board.lineStyle(1, linecolor, 1);
    graphics_board.moveTo(x - width, y - width);
    graphics_board.lineTo(x + width * (x_count + 4), y - width);
    graphics_board.lineTo(x + width * (x_count + 4), y + width * (y_count + 1));
    graphics_board.lineTo(x - width, y + width * (y_count + 1));
    graphics_board.lineTo(x - width, y - width);
    graphics_board.endFill(boardcolor, 1);
    // set a fill and line style
    graphics_board.beginFill(boardcolor, 1);
    graphics_board.lineStyle(1, linecolor, 1);
    var undo_txt = new PIXI.Text('UNDO', {
        font: width * 0.7 + 'px Arial',
        align: 'right'
    });
    undo_txt.position.x = x + width * (x_count + 1)
    undo_txt.position.y = y + 1 * width
    var reset_txt = new PIXI.Text('RESET', {
        font: width * 0.7 + 'px Arial',
        align: 'right'
    });
    reset_txt.position.x = x + width * (x_count + 1)
    reset_txt.position.y = y + 3 * width
    var graphics_undo = new PIXI.Graphics();
    graphics_undo.beginFill(boardcolor, 1);
    graphics_undo.lineStyle(1, linecolor, 1);
    graphics_undo.drawRect(x + width * (x_count + 1), y + 1 * width, width * 2.5, width);
    graphics_undo.endFill(boardcolor, 1);
    graphics_undo.addChild(undo_txt);
    stage.addChild(graphics_undo);
    graphics_undo.interactive = true;
    graphics_undo.tap = undo;
    graphics_undo.mousedown = undo;
    var graphics_reset = new PIXI.Graphics();
    graphics_reset.beginFill(boardcolor, 1);
    graphics_reset.lineStyle(1, linecolor, 1);
    graphics_reset.drawRect(x + width * (x_count + 1), y + 3 * width, width * 2.5, width);
    //graphics.drawRect(x + width * (x_count+1),y + 5*width, width*2.5,width);
    graphics_reset.endFill(boardcolor, 1);
    graphics_reset.addChild(reset_txt);
    stage.addChild(graphics_reset);
    graphics_reset.interactive = true;
    graphics_reset.tap = reset_board;
    graphics_reset.mousedown = reset_board;
    // draw a shape
    for (var i = 0; i <= x_count; i++) {
        graphics_board.moveTo(x + width * i, y);
        graphics_board.lineTo(x + width * i, y + width * y_count);
        var txt = new PIXI.Text(String.fromCharCode('A'.charCodeAt(0) + i), {
            font: width * 2 / 4 + 'px Arial',
            align: 'right'
        });
        txt.position.x = x + width * i - width / 5;
        txt.position.y = y - width / 4 * 3;
        graphics_board.addChild(txt);
    }
    for (var i = 0; i <= y_count; i++) {
        graphics_board.moveTo(x, y + width * i);
        graphics_board.lineTo(x + width * x_count, y + width * i);
        var txt = new PIXI.Text(i + 1, {
            font: width * 2 / 4 + 'px Arial',
            align: 'right'
        });
        txt.position.x = x - width / 4 * 3;
        txt.position.y = y + width * i - width / 4
        graphics_board.addChild(txt);
    }
    return {
        x: x,
        y: y,
        x_count: x_count,
        y_count: y_count,
        width: width
    };
}
var isblack = true;
chessarr = {
};
allchess = [
];
function createChess(board, point) {
    var graphics_chess = new PIXI.Graphics();
    var x_off = Math.round((point.x - board.x) / board.width);
    var y_off = Math.round((point.y - board.y) / board.width);
    if (x_off < 0 || x_off > board.x_count || y_off < 0 || y_off > board.y_count) {
        return;
    }
    var x = board.x + x_off * board.width;
    var y = board.y + y_off * board.width;
    if (chessarr[x_off] && chessarr[x_off][y_off]) {
        return;
    }
    if (isblack) {
        color = 0;
        isblack = false;
    } 
    else {
        color = 16777215;
        isblack = true;
    }
    graphics_chess.beginFill(color, 1);
    graphics_chess.drawCircle(x, y, board.width / 2);
    graphics_chess.endFill();
    if (!chessarr[x_off])
    {
        chessarr[x_off] = {
        };
    }
    chessarr[x_off][y_off] = true;
    graphics_chess.x_off = x_off;
    graphics_chess.y_off = y_off;
    allchess[allchess.length] = graphics_chess;
    graphics_board.addChild(graphics_chess);
}
var board = createBoard(8 * unit, 8 * unit, 14, 14, 80 / 16 * unit);
var bunny1 = createBunny({
    x: 6 * unit,
    y: 7 * unit
});
function myclick(e) {
    xarr[xarr.length] = createBunny(e.global);
}
graphics_board.interactive = true;
graphics_board.tap = function (e) {
    createChess(board, e.global)
}
graphics_board.mouseup = function (e) {
    createChess(board, e.global)
}
var xarr = [
    bunny1
];
var dir = 1;
var nowrotate = 0;
function animate() {
    requestAnimFrame(animate);
    for (var i = 0; i < xarr.length; i++) {
        var bunny = xarr[i];
        bunny.rotation += 0.1;
        bunny.position.x += 4 * unit * bunny.dir;
        if (bunny.position.x > stage_width) {
            bunny.dir = - 1;
        }
        if (bunny.position.x < 0) {
            bunny.dir = 1;
        }
    }
    renderer.render(stage);
}
