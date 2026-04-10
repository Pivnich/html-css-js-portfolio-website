// Accordion functionality

// Cache accordion elements
const headers: NodeListOf<HTMLElement> = document.querySelectorAll('.accordion-item-header')
const items: NodeListOf<HTMLElement> = document.querySelectorAll('.accordion-item')
const arrows: NodeListOf<HTMLElement> = document.querySelectorAll('.accordion-item-arrow')

// Pause videos (non-blocking, without await)
function pauseVideosInAccordion(activeAccordion: HTMLElement | null): void {
	if (!activeAccordion) return

	// Regular videos
	const videos: HTMLCollectionOf<HTMLVideoElement> = activeAccordion.getElementsByTagName('video')
	for (const video of videos) {
		video.muted = true
		video.pause()
	}

	// YouTube videos (asynchronous, but don't wait)
	const accordioniFrames: NodeListOf<HTMLElement> = activeAccordion.querySelectorAll('lite-youtube')
	for (const iframe of accordioniFrames) {
		const isActive: boolean = iframe.classList.contains('lyt-activated')
		if (isActive) {
			;(iframe as any)
				.getYTPlayer()
				.then((video: any) => video.pauseVideo())
				.catch(() => {})
		}
	}
}

// Close accordion
function closeAccordion(body: HTMLElement, item: HTMLElement): void {
	pauseVideosInAccordion(item)
	body.style.maxHeight = ''
	item.classList.remove('active')
}

// Open accordion
function openAccordion(item: HTMLElement, body: HTMLElement, index: number): void {
	// Scroll to active accordion (optimized for performance)
	const firstItemTop: number = items[0].getBoundingClientRect().top + window.scrollY
	const headerHeight: number = headers[index].offsetHeight
	const gap: number =
		parseFloat(getComputedStyle(item.parentElement as HTMLElement).gap || '0') || 0
	let scrollToY: number = firstItemTop + index * (headerHeight + gap)

	// Add offset for hamburger-nav on mobile (if it's fixed)
	const hamburgerNav: HTMLElement | null = document.getElementById('hamburger-nav')
	if (hamburgerNav && window.innerWidth <= 768) {
		scrollToY -= hamburgerNav.offsetHeight
	}

	// Use requestAnimationFrame for smooth scroll without blocking
	requestAnimationFrame(() => {
		window.scrollTo({ top: scrollToY, behavior: 'smooth' })
	})

	item.classList.add('active')
	body.style.maxHeight = body.scrollHeight + 'px'
}

// Header click handler
headers.forEach(function (header: HTMLElement, index: number): void {
	header.addEventListener('click', function (this: HTMLElement): void {
		const item: HTMLElement | null = this.parentElement as HTMLElement
		const body: HTMLElement | null = item.querySelector('.accordion-item-body')

		// Close if already active
		if (item.classList.contains('active')) {
			closeAccordion(body!, item)
			return
		}

		const activeItem: HTMLElement | null = document.querySelector('.accordion-item.active')
		if (activeItem) {
			closeAccordion(activeItem.querySelector('.accordion-item-body')!, activeItem)
		}

		openAccordion(item, body!, index)
	})
})

// Arrow handler
arrows.forEach(function (arrow: HTMLElement): void {
	arrow.addEventListener('click', function (this: HTMLElement, e: Event): void {
		e.stopPropagation()

		const item: HTMLElement | null = this.closest('.accordion-item')
		const body: HTMLElement | null = item!.querySelector('.accordion-item-body')
		const header: HTMLElement | null = item!.querySelector('.accordion-item-header')

		// Smooth scroll to header
		header!.scrollIntoView({ behavior: 'smooth', block: 'start' })

		// Close after scroll
		setTimeout(() => closeAccordion(body!, item!), 300)
	})
})

export { openAccordion, closeAccordion }
