import React from 'react'

type ContactItemProps = {
  title: string
}

const ContactItem = ({
  title,
  children,
}: React.PropsWithChildren<ContactItemProps>) => {
  return (
    <article className="flex flex-col gap-2 lg:gap-4">
      <h3 className="text-xl font-bold tracking-wider">{title}</h3>
      {children}
    </article>
  )
}

export default ContactItem
