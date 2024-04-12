import { ReactNode } from 'react'

export default function Step({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <li className="mx-4">
      <input type="checkbox" id={title} className={`peer mr-2`} />
      <label
        htmlFor={title}
        className={`text-foreground/90 text-lg font-semibold hover:cursor-pointer peer-checked:line-through`}
      >
        {title}
      </label>
      <div
        className={`text-foreground/80 mx-6 text-sm peer-checked:line-through`}
      >
        {children}
      </div>
    </li>
  )
}
