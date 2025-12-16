import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function AnimatedFormContainer({
    title,
    description,
    children,
    success,
    successMessage = "Request Submitted Successfully!",
    animationType = "checkmark",
    className
}) {
    return (
        <motion.div
            className={`relative w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 ${className || ''}`}
            animate={
                success && animationType === "color-shift"
                    ? { backgroundColor: "#ecfdf5" } // green-50
                    : {}
            }
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-gray-100">
                {success ? successMessage : title}
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-300">
                {!success && description}
            </p>

            <AnimatePresence mode="wait">
                {!success ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-4"
                    >
                        {children}
                    </motion.div>
                ) : (
                    /* Success Animation */
                    animationType === "checkmark" && (
                        <motion.div
                            key="checkmark"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="flex flex-col items-center justify-center mt-4 gap-4"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-24 w-24 text-green-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.8 }}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>

                        </motion.div>
                    )
                )}
            </AnimatePresence>
        </motion.div>
    )
}
