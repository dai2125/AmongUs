import "../init.js";
import ReactDOM from 'react-dom/client';
import App from './App';
import './CSS/index.css';
import MapGrid from "./MapGrid/MapGridRECOVERY2";
import React from "react";


const rootNode = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootNode);

// root.render(<MapGridRECOVERY2/>);
root.render(<App />);
// root.render(<MapGridRECOVERY2 />);
