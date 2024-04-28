let action1: string = '';
let userId = '';
let color = '';
let x = 0;
let y = 0;

export const getAction = () => {
    return action1;
}

export const setAction = (action: string) => {
    action1 = action;
}

export const getUserId = () => {
    return userId;
}

export const setUserIdStore = (id: string) => {
    userId = id;
}

export const getColor = () => {
    return color;
}

export const setColor = (c: string) => {
    color = c;
}

export const getX = () => {
    return x;
}

export const setX = (xPos: number) => {
    x = xPos;
}

export const getY = () => {
    return y;
}

export const setY = (yPos: number) => {
    y = yPos;
}
