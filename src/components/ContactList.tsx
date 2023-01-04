import React from 'react'

type ContactListProps = {
  icon: JSX.Element
  content: string
}

const ContactList = ({ icon, content }: ContactListProps) => {
  return (
    <li className="flex items-start gap-4 leading-5">
      <span>{icon}</span>
      {content}
    </li>
  )
}

export default ContactList
