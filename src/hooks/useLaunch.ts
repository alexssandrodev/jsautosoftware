'use client';

import Launch from "@/models/Launch";
import Part from "@/models/Part";
import { useState } from "react";

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
