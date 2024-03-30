const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/gs-guide-websocket'
});

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const randomString = generateRandomString(10);
localStorage.setItem('userId', randomString);
const userId = randomString;

stompClient.onConnect = (frame) => {
    setConnected(true);
    stompClient.subscribe(`/topic/user/${userId}`, (greeting) => {
        const content = JSON.parse(greeting.body).content;
        showGreeting(content);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.publish({
        destination: `/app/user/${userId}`,
        body: JSON.stringify({'name': $("#name").val()})
    });
}

function showGreeting(message, sessionId) {
    console.log('showGreeting');

    $("#greetings").append("<tr><td>" + message + "</td></tr>");
    $("#startGame").append("<tr><td><button id='startGameButton'>Start Game</button></td></tr>");
    starGameButton();
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
});

function starGameButton() {
    $("#startGameButton").click(() => startGame());

}
function startGame() {
    window.location.href = "http://localhost:4173";
}