import {getX} from "./store";

interface Player {
    action: string;
    userId: string;
    color: string;
    x: number;
    y: number;
    draw: (Player) => void;
}

let players: Player[] = [];

export const upsertPlayer = (newPlayer: Player) => {
    console.log('New Player: ', newPlayer.userId + ' X ', newPlayer.x + ' Y ', newPlayer.y + ' Color ', newPlayer.color);
    const index = players.findIndex(player => player.userId === newPlayer.userId);
    if (index !== -1) {
        // Aktualisiere den bestehenden Spieler
        players[index] = newPlayer;
    } else {
        // Füge einen neuen Spieler hinzu
        players.push(newPlayer);
    }
};

export const getPlayer = (userId: string): Player | undefined => {
    return players.find(player => player.userId === userId);
};

export const removePlayer = (userId: string) => {
    players = players.filter(player => player.userId !== userId);
};

export const getAllPlayers = (): Player[] => {
    return players;
};

export const draw = (context) => {
    context.fillStyle = 'red';
    context.fillRect(10, 10, 25, 25);
}
