// import {stompClient} from "/app.js";
// import * as StompJs from "@stomp/stompjs";

export class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 5; // Geschwindigkeit des Spielers
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

// function movement(event) {
//     stompClient.publish({
//         destination: `/app/movement/`,
//         body: JSON.stringify({ 'movement': event })
//     });
// }

// function movement(event) {
//     const stompClient = new StompJs.Client({
//         brokerURL: 'ws://localhost:8080/gs-guide-websocket'
//     });
//     stompClient.onConnect = (frame) => {
//         setConnected(true);
//         stompClient.activate();
//
//         stompClient.subscribe(`/topic/movement`, () => {
//             const content = JSON.parse(greeting.body).content;
//             console.log(content);
//         });
//         stompClient.publish({ destination: `/app/movement`, body: 'Hello, world!' });
//         stompClient.publish({
//             destination: `/app/movement/`,
//             body: JSON.stringify({ 'movement': event.key })
//         });
//     };
// }

// class OtherClass {
//     checkStompConnection() {
//         if (stompClientManager.isConnected()) {
//             console.log("STOMP client is connected.");
//             Führe Aktionen aus, wenn die Verbindung besteht
        // } else {
        //     console.log("STOMP client is not connected.");
        //     Behandlung, wenn keine Verbindung besteht
        // }
    // }
// }

// const otherClassInstance = new OtherClass();
// otherClassInstance.checkStompConnection();

// export { Player };
// window.onload = () => {
//     new Game("playerCanvas");
// };
//# sourceMappingURL=gameMovement.js.map