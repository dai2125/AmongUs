class Player {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    speed: number;

    constructor(x: number, y: number, width: number, height: number, color: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 5; // Geschwindigkeit des Spielers
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    moveUp(): void {
        this.y -= this.speed;
    }

    moveDown(): void {
        this.y += this.speed;
    }

    moveLeft(): void {
        this.x -= this.speed;
    }

    moveRight(): void {
        this.x += this.speed;
    }
}

// window.onload = () => {
//     new Game("playerCanvas");
// };