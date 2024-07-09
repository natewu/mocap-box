import { Engine } from "./lib/Engine/engine";
import { create } from 'zustand'

interface EngineState {
   engine: Engine | undefined;
   setEngine: (engine: Engine) => void;
}

export const useEngine = create<EngineState>((set) => ({
   engine: new Engine(undefined, 1, 1),
   setEngine: (engine: Engine) => set({ engine: engine })
}))