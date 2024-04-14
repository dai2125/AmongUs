export class Player {
    // constructor() {}

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

    // Getter und Setter Methoden...
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
















// let players = [];
//
// export class Player {
//
//     private action: string;
//     private userId: string;
//     private color: string;
//     private x: number;
//     private y: number;
//
//     constructor(action: string, userId: string, color: string, x: number, y: number) {
//         this.action = action;
//         this.userId = userId;
//         this.color = color;
//         this.x = 2;
//         this.y = 2;
//     }
//
//     draw(ctx: CanvasRenderingContext2D) {
//         ctx.fillStyle = this.color;
//         ctx.fillRect(this.x, this.y, 10, 10);
//     }
//
//     getAction() {
//         return this.action;
//     }
//
//     getUserId() {
//         return this.userId;
//     }
//
//     getColor() {
//         return this.color;
//     }
//
//     getX() {
//         return this.x;
//     }
//
//     getY() {
//         return this.y;
//     }
//
//     setAction(action) {
//         this.action = action;
//     }
//
//     setUserId(userId) {
//         this.userId = userId;
//     }
//
//     setColor(color) {
//         this.color = color;
//     }
//
//     setX(x) {
//         this.x = x;
//     }
//
//     setY(y) {
//         this.y = y;
//     }
//
//     upsertPlayer(newPlayer) {
//         console.log('New Player: ', newPlayer.userId + ' X ', newPlayer.x + ' Y ', newPlayer.y + ' Color ', newPlayer.color);
//         const index = players.findIndex(player => player.userId === newPlayer.userId);
//         if (index !== -1) {
//             // Aktualisiere den bestehenden Spieler
//             players[index] = newPlayer;
//         } else {
//             // Füge einen neuen Spieler hinzu
//             players.push(newPlayer);
//         }
//     }
//
// }
//
// export const getAction = () => {
//     return players[0].getAction();
// }
//
// export const getUserId = () => {
//     return players[0].getUserId();
// }
//
// export const getColor = () => {
//     return players[0].getColor();
// }
//
// export const getX = () => {
//     return players[0].getX();
// }
//
// export const getY = () => {
//     return players[0].getY();
// }
//
// export const setAction = (action) => {
//     players[0].setAction(action);
// }
//
// export const setUserId = (userId) => {
//     players[0].setUserId(userId);
// }
//
// export const setColor = (color) => {
//     players[0].setColor(color);
// }
//
// export const setX = (x) => {
//     players[0].setX(x);
// }
//
// export const setY = (y) => {
//     players[0].setY(y);
// }
//
// export const upsertPlayer = (newPlayer) => {
//     players[0].upsertPlayer(newPlayer);
// }
//
//
//
