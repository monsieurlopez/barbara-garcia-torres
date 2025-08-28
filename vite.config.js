import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        lactancia: path.resolve(__dirname, "src/pages/lactancia.html"),
        soins: path.resolve(__dirname, "src/pages/soins.html"),
        contacto: path.resolve(__dirname, "src/pages/contacto.html"),
        aviso: path.resolve(__dirname, "src/pages/aviso-legal.html"),
      },
    },
  },
});
