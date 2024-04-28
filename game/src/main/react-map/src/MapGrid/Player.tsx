export class Player {

    constructor(
        private action: string,
        private userId: string,
        private color: string,
        private x: number,
        private y: number
    ) {
        this.action = action;
        this.userId = userId;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, 25, 25);
    }

    moveUp(coordinate) {
        this.y = coordinate;
    }
    moveDown(coordinate) {
        this.y = coordinate;
    }
    moveLeft(coordinate) {
        this.x = coordinate;
    }
    moveRight(coordinate) {
        this.x = coordinate;
    }

    getAction() { return this.action; }
    getUserId() { return this.userId; }
    getColor() { return this.color; }
    getX() { return this.x; }
    getY() { return this.y; }

    setAction(action: string) { this.action = action; }
    setUserId(userId: string) { this.userId = userId; }
    setColor(color: string) { this.color = color; }
    setX(x: number) { this.x = x; }
    setY(y: number) { this.y = y; }
}
