var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var input = new Input();
attachListeners(input);

var player = new Player(canvas.width - 50, 100);
var enemy = new Enemy(-100, 100);

var previousTime = Date.now();


function update() {
    this.tick();
    this.render(ctx);
    requestAnimationFrame(update);
}

function tick() {
    movePlayer();
    modifyEnemySpeed();

    enemy.movement.right = true;

    if(player.boundingBox.intersects(enemy.boundingBox)) {
        enemy.animation.setRow(2);
        enemy.animation.setColumn(2);
        enemy.animation.setLimit(1);

        enemy.isHit = true;
        enemy.movement.down = true;
    }

    enemy.update();
    player.update();
}

function render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.render(ctx);
    enemy.render(ctx);
}

function movePlayer() {
    player.movement.right = !!input.right;
    player.movement.left = !!input.left;
    player.movement.up = !!input.up;
    player.movement.down = !!input.down;
}

function modifyEnemySpeed() {
    var now = Date.now();
    var difference = Math.abs(now - previousTime) / 1000;
    if(difference >= 10) {
        previousTime = now;
        enemy.velocityModifier += 0.1;
    }
}

update();