
export class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 5;
    }
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    moveUp() {
        this.y -= this.speed;
        console.log("left");

        // movement(this.y);
        // console.log(userId + " moved up");
    }
    moveDown() {
        this.y += this.speed;
        // movement(this.y);
    }
    moveLeft() {
        this.x -= this.speed;
        // movement(this.x);
    }
    moveRight() {
        this.x += this.speed;
        // movement(this.x);
    }
}
