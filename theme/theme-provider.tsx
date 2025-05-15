"use client"

import { createContext, useState, useContext, type ReactNode } from "react"
import { colors } from "./colors"

type ThemeMode = "light" | "dark"
type PersonaMode = "her" | "him"
type PersonaType = "flow" | "truth"

interface ThemeContextType {
  mode: ThemeMode
  toggleMode: () => void
  personaMode: PersonaMode
  setPersonaMode: (mode: PersonaMode) => void
  persona: PersonaType
  setPersona: (type: PersonaType) => void
  colors: typeof colors
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>("light")
  const [personaMode, setPersonaMode] = useState<PersonaMode>("her")
  const [persona, setPersona] = useState<PersonaType>("flow")

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light")
  }

  const value = {
    mode,
    toggleMode,
    personaMode,
    setPersonaMode,
    persona,
    setPersona,
    colors,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
