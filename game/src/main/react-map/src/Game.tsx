export class Game{
    constructor(
        private id?: number,
        private players?: number,
        private imposters?: number,
        private crewMates?: number
    ){}

    getId(){return this.id;}
    getPlayers(){return this.players;}
    getImposters(){return this.imposters;}
    getCrewMates(){return this.crewMates;}

    setId(id: number){this.id = id}
    setPlayers(players: number){this.players = players;}
    setImposters(imposters: number){this.imposters = imposters;}
    setCrewMates(crewMates: number){this.crewMates = crewMates;}
}