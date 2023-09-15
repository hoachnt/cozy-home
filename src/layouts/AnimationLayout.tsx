'use client'

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export const AnimationLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const pathname = usePathname()

    return (
        <motion.div
            key={pathname}
            initial={{ x: "100%" }}
            animate={{ x: 0, }}
            exit={{ x: "-100%", }}
            transition={{
                type: "spring",
                stiffness: 160,
                damping: 20,
            }}
        >
            {children}
        </motion.div>
    )
}