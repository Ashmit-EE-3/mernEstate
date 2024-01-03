// vite.config.js
import { defineConfig } from "file:///D:/Web%20Development/Project/Project%20Real%20Estate%20Marketplace/client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Web%20Development/Project/Project%20Real%20Estate%20Marketplace/client/node_modules/@vitejs/plugin-react-swc/index.mjs";
var vite_config_default = defineConfig({
  server: {
    proxy: {
      "/api": { target: "http://localhost:3000", secure: false }
    }
  },
  plugins: [react()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXZWIgRGV2ZWxvcG1lbnRcXFxcUHJvamVjdFxcXFxQcm9qZWN0IFJlYWwgRXN0YXRlIE1hcmtldHBsYWNlXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcV2ViIERldmVsb3BtZW50XFxcXFByb2plY3RcXFxcUHJvamVjdCBSZWFsIEVzdGF0ZSBNYXJrZXRwbGFjZVxcXFxjbGllbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1dlYiUyMERldmVsb3BtZW50L1Byb2plY3QvUHJvamVjdCUyMFJlYWwlMjBFc3RhdGUlMjBNYXJrZXRwbGFjZS9jbGllbnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNlcnZlciA6IHtcbiAgICBwcm94eSA6IHtcbiAgICAgICcvYXBpJyA6IHt0YXJnZXQgOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJywgc2VjdXJlIDogZmFsc2UgfSxcbiAgICB9XG4gIH0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVZLFNBQVMsb0JBQW9CO0FBQ3BhLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFTO0FBQUEsSUFDUCxPQUFRO0FBQUEsTUFDTixRQUFTLEVBQUMsUUFBUyx5QkFBeUIsUUFBUyxNQUFNO0FBQUEsSUFDN0Q7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQ25CLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
