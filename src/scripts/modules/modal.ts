// Modal functionality

const modalTriggers: NodeListOf<HTMLElement> =
	document.querySelectorAll('.modal-trigger')
const modalBackdrop: HTMLElement | null = document.querySelector('.backdrop')

// Toggle modal
function toggleModal(): void {
	const modal: HTMLElement | null = document.querySelector('.modal')
	if (modal) modal.classList.toggle('active')
}

// Set modal content
function setModalContent(content: string): void {
	const modalBody: HTMLElement | null = document.querySelector('.modal-body')
	if (modalBody) modalBody.innerHTML = content
}

// Modal backdrop click handler
if (modalBackdrop) {
	modalBackdrop.addEventListener('click', toggleModal)
}

// Modal trigger click handler
modalTriggers.forEach(function (modalTrigger: HTMLElement): void {
	modalTrigger.addEventListener(
		'click',
		function (this: HTMLElement, e: Event): void {
			const modalInjectContainer: HTMLElement | null = (e.target as HTMLElement)
				?.nextSibling?.nextSibling as HTMLElement
			if (!modalInjectContainer?.classList?.contains('modal-inject')) return

			const modalContent: string = modalInjectContainer.innerHTML
			setModalContent(modalContent)
			toggleModal()
		},
	)
})

export { toggleModal, setModalContent }
