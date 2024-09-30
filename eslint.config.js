import antfu from '@antfu/eslint-config'
import eslintPluginTailwindCSS from 'eslint-plugin-tailwindcss'
import nuxt from './.nuxt/eslint.config.mjs'

const tailwind = eslintPluginTailwindCSS.configs['flat/recommended']

export default nuxt(
  antfu(
    {
      formatters: true,
    },
    tailwind,
  ),
)
