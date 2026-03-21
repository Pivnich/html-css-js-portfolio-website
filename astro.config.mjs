// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

// const isProd = process.env.CI === 'true'

const config = {
	integrations: [react()],
	site: 'https://vulchyn.com',
	base: '',
}

// https://astro.build/config
export default defineConfig(config)
