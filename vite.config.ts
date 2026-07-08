import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/youth-ai-build-lab/",
  plugins: [react()],
  test: {
    environment: "node",
  },
});
