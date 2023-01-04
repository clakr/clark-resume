import React from 'react'

const DefinitionList = ({ children }: React.PropsWithChildren) => {
  return (
    <dl className="!mt-2 grid grid-cols-1 leading-5 sm:grid-cols-7">
      {children}
    </dl>
  )
}

export default DefinitionList
