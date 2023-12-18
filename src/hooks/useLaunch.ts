'use client';

import { useState } from "react";
import Launch from "../models/Launch";

function useLaunch() {
    const dataStorage = JSON.parse(localStorage.getItem('launchs') || '[]');
    // const auxNameStorage = JSON.parse(localStorage.getItem('aux-name') || '[]');
    
    const [launch, setLaunch] = useState<Launch[]>(dataStorage);
    // const [auxName, setAuxName] = useState<string[]>(auxNameStorage);

    return {
        launch,
        setLaunch,
        // auxName,
        // setAuxName
    }
}

export default useLaunch;
