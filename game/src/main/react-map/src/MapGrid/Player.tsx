export class Player {

    constructor(
        private userName: string,
        private action: string,
        private sessionId: string,
        private color: string,
        private x: number,
        private y: number,
        private task1: string,
        private task2: string,
        private task3: string,
        private role: string,
        private movable : boolean = true
    ) {
        this.userName = userName;
        this.action = "";
        this.sessionId = sessionId;
        this.color = color;
        this.x = x;
        this.y = y;
        this.task1 = task1;
        this.task2 = task2;
        this.task3 = task3;
        this.role = role;
    }

    getUserName() { return this.userName; }
    getAction() { return this.action; }
    getSessionId() { return this.sessionId; }
    getColor() { return this.color; }
    getX() { return this.x; }
    getY() { return this.y; }
    getTask1() { return this.task1; }
    getTask2() { return this.task2; }
    getTask3() { return this.task3; }
    getRole() { return this.role; }
    getMovable() { return this.movable; }

    setUserName(userName: string) { this.userName = userName; }
    setAction(action: string) { this.action = action; }
    setSessionId(SessionId: string) { this.sessionId = SessionId; }
    setColor(color: string) { this.color = color; }
    setX(x: number) { this.x = x; }
    setY(y: number) { this.y = y; }
    setTask1(task1: string) { this.task1 = task1; }
    setTask2(task2: string) { this.task2 = task2; }
    setTask3(task3: string) { this.task3 = task3; }
    setRole(role: string) { this.role = role; }
    setMovable(movable: boolean) { this.movable = movable; }
}
