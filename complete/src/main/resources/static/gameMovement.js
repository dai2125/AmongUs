// import {stompClient} from "/app.js";
// import * as StompJs from "@stomp/stompjs";

export class Player {
    constructor(x, y, width, height, color, userId) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 5;
        this.userId = userId;
    }
    draw(context) {
        // context.fillStyle = this.color;
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