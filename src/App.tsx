import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Intro from "./components/Intro";
import Eggdle from "./components/eggdle/Eggdle";
import Conneggtions from "./components/conneggtions/Conneggtions";
import Victory from "./components/Victory";
import { isRandomMode, onGameModeChange } from "./lib/gameMode";
import { getRandomEasterWord } from "./lib/words";

export default function App() {
  const [randomMode, setRandomMode] = useState(isRandomMode);

  useEffect(() => onGameModeChange(() => setRandomMode(isRandomMode())), []);

  const targetWord = randomMode ? getRandomEasterWord() : "PEEPS";

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/intro" replace />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/eggdle" element={<Eggdle targetWord={targetWord} />} />
        <Route path="/conneggtions" element={<Conneggtions />} />
        <Route path="/victory" element={<Victory />} />
        <Route path="*" element={<Navigate to="/intro" replace />} />
      </Route>
    </Routes>
  );
}
