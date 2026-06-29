import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
    server:{port:5173}
})



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     tailwindcss({
//       theme: {
//         extend: {
//           gridTemplateColumns: {
//             auto: 'repeat(auto-fill, minmax(200px, 1fr))',
//           },
//         },
//       },
//     }),
//     react(),
//   ],
// })
