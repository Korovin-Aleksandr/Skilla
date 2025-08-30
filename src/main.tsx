import * as ReactDOMClient from 'react-dom/client';
import {
  BrowserRouter,
} from "react-router-dom";
import App from "./app/app";
import './app/styles/global.css';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);