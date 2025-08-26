"use client"
import React from "react"

type Props = {
  children: React.ReactNode
  maxLines?: number
  readMoreHref?: string
}

export default function OverflowClamp({ children, maxLines = 6, readMoreHref }: Props) {
  const [clamped, setClamped] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const isOverflowing = el.scrollHeight > el.clientHeight + 2
    setClamped(isOverflowing)
  }, [])

  return (
    <div>
      <div
        ref={ref}
        style={{ WebkitLineClamp: maxLines, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}
        className="[word-wrap:break-word]"
      >
        {children}
      </div>
      {clamped && readMoreHref ? (
        <a href={readMoreHref} className="text-sm underline mt-2 inline-block">Read more</a>
      ) : null}
    </div>
  )
}


