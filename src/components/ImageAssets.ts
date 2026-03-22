// ImageAssets.ts - Dynamic image imports using Vite glob
import type { ImageMetadata } from 'astro'

// Auto-import all images from assets directory
const imageModules = import.meta.glob(
	'../assets/**/*.{jpg,jpeg,png,webp,gif,svg}',
	{
		eager: true,
		import: 'default',
	},
)

// Create mapping from file paths to imported images
const imageAssets: Record<string, any> = {}

for (const [path, module] of Object.entries(imageModules)) {
	// Convert path like '../assets/lynix.jpg' to './assets/lynix.jpg' and 'assets/lynix.jpg'
	const relativePath = path.replace('../assets/', './assets/')
	const shortPath = path.replace('../assets/', 'assets/')

	imageAssets[relativePath] = module
	imageAssets[shortPath] = module
}

// Function to get optimized image by path
export function getOptimizedImage(path: string): ImageMetadata | string {
	return imageAssets[path] || path
}
