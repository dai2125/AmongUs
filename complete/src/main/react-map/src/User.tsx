export class User{
    constructor(
        private name: string,
        private email: string,
        private password: string
    ){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    getUsername(){return this.name;}
    getEmail(){return this.email;}
    getPassword(){return this.password;}

    setUsername(username: string){{this.name = username}}
    setEmail(email: string){this.email = email;}
    setPassword(password: string){this.password = password;}
}