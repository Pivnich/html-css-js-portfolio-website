import { motion } from 'framer-motion'
import type { ComponentPropsWithoutRef } from 'react'

export default function FramerInView({ className = '', children, ...rest }: ComponentPropsWithoutRef<'div'>) {
	return (
		// @ts-ignore - Framer Motion type conflict with React onDrag
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 20, scale: 0.98 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.55, ease: 'easeOut' }}
			{...rest}
		>
			{children}
		</motion.div>
	)
}
