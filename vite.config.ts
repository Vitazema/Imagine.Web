import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

export default defineConfig({
  plugin: [react()],
  build: {
    outDir: "./build",
  },
})
