import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        lactancia: path.resolve(__dirname, "public/pages/lactancia.html"),
        soins: path.resolve(__dirname, "public/pages/soins.html"),
        contacto: path.resolve(__dirname, "public/pages/contacto.html"),
        aviso: path.resolve(__dirname, "public/pages/aviso-legal.html"),
      },
    },
  },
});
