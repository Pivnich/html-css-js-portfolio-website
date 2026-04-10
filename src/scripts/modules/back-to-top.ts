// Back to top button functionality

const backToTopBtn: HTMLElement | null = document.getElementById('backToTop')

if (backToTopBtn) {
	// Back to top with throttle
	let scrollTimeout: number | undefined
	window.addEventListener('scroll', function (): void {
		clearTimeout(scrollTimeout)
		scrollTimeout = setTimeout(() => {
			const { innerHeight }: { innerHeight: number } = window
			const scrollTop: number = document.body.scrollTop || document.documentElement.scrollTop
			if (scrollTop > innerHeight / 2) {
				backToTopBtn.classList.add('show')
			} else {
				backToTopBtn.classList.remove('show')
			}
		}, 100) // Throttle at 100ms
	})

	backToTopBtn.addEventListener('click', (): void => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	})
}

export { backToTopBtn }
