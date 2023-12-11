export function Rule({ title, description }: { title: string, description: string }) {
  return (
    <div className="mb-3 pr-6">
      <span className="text-indigo-500 font-bold">{title}:</span>
      <p>{description}</p>
    </div>
  )
}