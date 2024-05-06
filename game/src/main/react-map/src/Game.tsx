export class Game{
    constructor(
        private players?: number,
        private imposters?: number,
        private crewMates?: number
    ){}


    getPlayers(){return this.players;}
    getImposters(){return this.imposters;}
    getCrewMates(){return this.crewMates;}

    setPlayers(players: number){this.players = players}
    setImposters(imposters: number){{this.imposters = imposters}}
    setCrewMates(crewMates: number){this.crewMates = crewMates;}
}