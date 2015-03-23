var Enemy = (function () {
    function Enemy(x, y) {
        this.width = 76;
        this.height = 85;
        this.velocity = 1.5;
        this.velocityModifier = 0;
        this.movement = {left: false, right : false, up: false, down : false};
        this.isHit = false;


        this.position = new Vector2(x, y);
        this.animation = new Animation(this.width, this.height, 0, 0, 8, 'ressources/images/bird.png', 8, 3, 3);
        this.boundingBox = new Rectangle(x, y, this.width, this.height);
    }

    Enemy.prototype.update = function () {
        if(this.movement.right && !this.isHit) {
            this.position.x += this.velocity + this.velocityModifier;
        }

        if(this.movement.down && this.isHit) {
            this.position.y += this.velocity + this.velocityModifier;
        }

        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        this.animation.update();
    };

    Enemy.prototype.render = function(ctx) {
        this.animation.draw(ctx);
    };

    return Enemy;
}());