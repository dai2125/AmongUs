import React, { useEffect } from "react";
// @ts-ignore
import style from './MapGridStyle.module.css';

interface MapGridProps {
    xPos: number;
    yPos: number;
    onMove: (x: number, y: number) => void; // Define onMove prop
}

const MapGrid: React.FC<MapGridProps> = ({ xPos, yPos, onMove }) => {
    useEffect(() => {
        const handleMove = (event: KeyboardEvent) => {
            let newXPos = xPos;
            let newYPos = yPos;

            switch (event.key) {
                case 'ArrowUp':
                    newXPos = Math.max(0, xPos - 1);
                    break;
                case 'ArrowDown':
                    newXPos = Math.min(grid.length - 1, xPos + 1);
                    break;
                case 'ArrowLeft':
                    newYPos = Math.max(0, yPos - 1);
                    break;
                case 'ArrowRight':
                    newYPos = Math.min(grid[0].length - 1, yPos + 1);
                    break;
                default:
                    break;
            }

            // Check if the new position is valid (not on a # cell)
            if (grid[newXPos][newYPos] !== '#') {
                onMove(newXPos, newYPos);
            }
        };

        window.addEventListener('keydown', handleMove);

        return () => {
            window.removeEventListener('keydown', handleMove);
        };
    }, [xPos, yPos, onMove]);

    const grid: any[][] = [
        ['#', '#', '#', '.', '#', '#', '#', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#'],
        ['.', '.', '.', '#', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.'],
        ['#', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '#', '#', '.', '#', '#', '#', '#'],
        ['#', '#', '#', '.', '#', '#', '#', '#'],
        ['#', '#', '#', '.', '#', '#', '#', '#'],
        ['#', '#', '#', '.', '#', '#', '#', '#'],
        ['#', '#', '#', '.', '#', '#', '#', '#'],
    ];

    // Sight radius
    const radius = 3;

    const startRow = Math.max(0, xPos - radius);
    const endRow = Math.min(grid.length - 1, xPos + radius);
    const startCol = Math.max(0, yPos - radius);
    const endCol = Math.min(grid[0].length - 1, yPos + radius);

    // Load subGrid
    const subGrid: any[][] = [];
    for (let i = startRow; i <= endRow; i++) {
        const row = [];
        for (let j = startCol; j <= endCol; j++) {
            row.push(grid[i][j]);
        }
        subGrid.push(row);
    }

    // Center View
    const paddingTop = Math.max(0, radius - xPos) * 30;
    const paddingLeft = Math.max(0, radius - yPos) * 30;

    return (
        <div className={style.root} style={{ paddingTop, paddingLeft }}>
            {subGrid.map((row, rowIndex) => (
                <div key={rowIndex} className={style.row}>
                    {row.map((cell, colIndex) => (
                        <span key={colIndex} className={style.cell}>
                            {rowIndex + startRow === xPos && colIndex + startCol === yPos ? '@' : cell}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default MapGrid;
