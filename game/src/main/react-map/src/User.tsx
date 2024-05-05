export class User{
    constructor(
        private name?: string,
        private password?: string
    ){}


    getUsername(){return this.name;}
    getPassword(){return this.password;}

    setUsername(username: string){{this.name = username}}
    setPassword(password: string){this.password = password;}
}