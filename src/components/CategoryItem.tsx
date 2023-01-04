import React from 'react'

type CategoryItemProps = {
  title: string
}

const CategoryItem = ({
  title,
  children,
}: React.PropsWithChildren<CategoryItemProps>) => {
  return (
    <article className="space-y-4 border-b-2 py-4 lg:py-8 [&:last-child]:border-b-0 [&:last-child]:pb-0 [&:nth-child(2)]:pt-0 [&:nth-child(2)]:lg:pt-4">
      <h3 className="text-xl font-bold tracking-wider opacity-50">{title}</h3>
      <div className="space-y-4 lg:space-y-8">{children}</div>
    </article>
  )
}

export default CategoryItem
