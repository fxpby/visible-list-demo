import { defineConfig } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import presetUno from '@unocss/preset-uno'
export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetUno(),
    presetRemToPx({ baseFontSize: 4 }),
    // ...other presets
  ],
})
