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
    const index = players.findIndex(player => player.userId === newPlayer.userId);
    if (index !== -1) {
        players[index] = newPlayer;
    } else {
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
