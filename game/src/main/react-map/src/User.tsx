export class User {
    constructor(
        private name?: string,
        private password?: string,
        public color?: string,
    ) {
    }


    getUsername() {
        return this.name;
    }

    getPassword() {
        return this.password;
    }

    getOldPassword() {
        return this.password;
    }

    getEmail() {
        return this.name;
    }

    getColor() {
        return this.color;
    }

    setUsername(username: string) {
        {
            this.name = username
        }
    }

    setPassword(password: string) {
        this.password = password;
    }

    setOldPassword(password: string) {
        this.password = password;
    }

    setEmail(email: string) {
        this.name = email;
    }

    setColor(color: string) {
        this.color = color;
    }
}
