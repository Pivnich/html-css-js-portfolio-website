// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import { visualizer } from 'rollup-plugin-visualizer'

// const isProd = process.env.CI === 'true'

/** @type {import('astro').AstroUserConfig} */
const config = {
	integrations: [
		react(),
		{
			name: 'build-listener',
			hooks: {
				'astro:build:done': async ({ dir }) => {
					console.log(`✅ Build completed! Output: ${dir}`)
					// Cache information logged here
					console.log('📊 Bundle analysis available in ./dist/stats.html')
				},
			},
		},
	],
	site: 'https://vulchyn.com',
	base: '',
	image: {
		// Image optimization settings
		service: {
			entrypoint: 'astro/assets/services/sharp',
		},
	},
	vite: {
		// Enable Vite caching for faster rebuilds
		build: {
			rollupOptions: {
				plugins: [
					visualizer({
						open: false,
						gzipSize: true,
						brotliSize: true,
						filename: 'dist/stats.html',
					}),
				],
			},
		},
	},
}

// https://astro.build/config
export default defineConfig(config)
