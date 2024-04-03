// import {stompClient} from "/app.js";
// import * as StompJs from "@stomp/stompjs";

export class Player {
    constructor(x, y, color, userId) {
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 25;
        this.color = color;
        this.speed = 5;
        this.userId = userId;
    }
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    moveUp(coordinate) {
        this.y = coordinate - this.speed;
    }
    moveDown(coordinate) {
        this.y = coordinate + this.speed;
    }
    moveLeft(coordinate) {
        this.x = coordinate - this.speed;
    }
    moveRight(coordinate) {
        this.x = coordinate + this.speed;
    }
}
