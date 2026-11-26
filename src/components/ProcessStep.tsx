
import type { ReactNode } from 'react'

type ProcessIcon = 'conversation' | 'idea' | 'development' | 'launch'

interface ProcessStepProps {
  number: string
  title: string
  description: string
  icon: ProcessIcon
}

const icons: Record<ProcessIcon, ReactNode> = {
  conversation: (
    <>
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
      <path d="M8 11h8M8 15h5" />
    </>
  ),
  idea: (
    <>
      <path d="M9 18h6M10 22h4" />
      <path d="M15 14c.5-.6 1-1.2 1.5-1.8a6 6 0 1 0-9 0C8 12.8 8.5 13.4 9 14c.5.6 1 1.3 1 2h4c0-.7.5-1.4 1-2Z" />
      <path d="M12 2v1M4.9 4.9l.7.7M2 12h1M21 12h1M18.4 5.6l.7-.7" />
    </>
  ),
  development: (
    <>
      <path d="m8 17-5-5 5-5M16 7l5 5-5 5M14 4l-4 16" />
    </>
  ),
  launch: (
    <>
      <path d="M12 19c-4 0-7-3-7-7 0-5 7-10 14-10 0 7-5 14-7 14Z" />
      <path d="M9 15 4 20M5 16l-2 5 5-2M14 10h.01" />
      <path d="M12 19v3M5 12H2" />
    </>
  ),
}

function ProcessStep({
  number,
  title,
  description,
  icon,
}: ProcessStepProps) {
  return (
    <article className="process-step">
      <div className="process-step__number">
        {number}
      </div>

      <div className="process-step__icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icons[icon]}
        </svg>
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </article>
  )
}

export default ProcessStep
