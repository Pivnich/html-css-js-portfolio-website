import { motion } from 'framer-motion'
import type { ComponentPropsWithoutRef } from 'react'

export default function FramerSection({
	className = '',
	children,
	...rest
}: ComponentPropsWithoutRef<'section'>) {
	return (
		// @ts-expect-error - Framer Motion type conflict with React onDrag
		<motion.section
			className={className}
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.7, ease: 'easeOut' }}
			{...rest}
		>
			{children}
		</motion.section>
	)
}
