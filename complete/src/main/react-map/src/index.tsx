import "../init.js";
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import MapGrid from "./MapGrid/MapGrid";
import React from "react";


const rootNode = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootNode);

// root.render(<MapGrid/>);
root.render(<App />);
// root.render(<MapGrid />);