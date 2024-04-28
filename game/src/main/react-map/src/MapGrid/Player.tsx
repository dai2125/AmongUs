export class Player {

    constructor(
        private action: string,
        private sessionId: string,
        private color: string,
        private x: number,
        private y: number
    ) {
        this.action = "";
        this.sessionId = sessionId;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    getAction() { return this.action; }
    getSessionId() { return this.sessionId; }
    getColor() { return this.color; }
    getX() { return this.x; }
    getY() { return this.y; }

    setAction(action: string) { this.action = action; }
    setSessionId(SessionId: string) { this.sessionId = SessionId; }
    setColor(color: string) { this.color = color; }
    setX(x: number) { this.x = x; }
    setY(y: number) { this.y = y; }
}
