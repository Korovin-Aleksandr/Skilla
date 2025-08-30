import { Route, Routes } from "react-router-dom";
import { CallList } from "../pages/call-list";

export default function App() {
    return (
       <Routes>
            <Route path="/" element={<CallList/>} />
       </Routes>
    );
}