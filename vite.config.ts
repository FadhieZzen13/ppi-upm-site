import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Tunnels used to share the site: ngrok and Tailscale Funnel.
const TUNNEL_HOSTS = [".ngrok-free.app", ".ngrok-free.dev", ".ngrok.app", ".ngrok.dev", ".ts.net"];

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  // Let tunnels reach the dev/preview server (Vite blocks unknown hosts by default).
  server: { allowedHosts: TUNNEL_HOSTS },
  preview: { allowedHosts: TUNNEL_HOSTS },
});
