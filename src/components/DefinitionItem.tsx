import React from 'react'

type DefinitionItemProps = {
  term: string
  description: string
}

const DefinitionItem = ({ term, description }: DefinitionItemProps) => {
  return (
    <>
      <dt className="col-span-1 font-bold opacity-75 sm:col-span-2 xl:col-span-1">
        {term}
      </dt>
      <dd className="col-span-1 mb-4 sm:col-span-5 sm:mb-0 xl:col-span-6">
        {description}
      </dd>
    </>
  )
}

export default DefinitionItem
