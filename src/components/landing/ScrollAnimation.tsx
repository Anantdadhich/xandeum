'use client'

import { useEffect, useRef, useState } from 'react'

// CSS animations for scroll reveal
export const scrollAnimationStyles = `
@keyframes scrollFadeInUp {
    from {
        opacity: 0;
        transform: translateY(60px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scrollFadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.scroll-animate {
    opacity: 0;
}

.scroll-animate.is-visible {
    animation: scrollFadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.scroll-animate-fade.is-visible {
    animation: scrollFadeIn 0.8s ease-out forwards;
}
`

// Hook for scroll-triggered animations
export function useScrollAnimation(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [threshold])

    return { ref, isVisible }
}

// Wrapper component for scroll animations
export function ScrollReveal({
    children,
    className = '',
    delay = 0,
    threshold = 0.15,
}: {
    children: React.ReactNode
    className?: string
    delay?: number
    threshold?: number
}) {
    const { ref, isVisible } = useScrollAnimation(threshold)

    return (
        <div
            ref={ref}
            className={`scroll-animate ${isVisible ? 'is-visible' : ''} ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}
