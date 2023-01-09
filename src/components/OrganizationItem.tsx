import React, { useState, useEffect } from 'react'

type OrganizationItemProps = {
  position: string | null
  organization: string
  organizationLocation: string
  timeframeFrom: Date
  timeframeTo: Date | null
}

const OrganizationItem = ({
  position,
  




  organization,
  organizationLocation,
  timeframeFrom,
  timeframeTo,
  children,
}: React.PropsWithChildren<OrganizationItemProps>) => {

  const [timeframe, setTimeframe] = useState('')

  const getDate = (timeframe: Date) => {
    return `${new Intl.DateTimeFormat('en-PH', {
      month: 'long'
    }).format(timeframe)} ${timeframe.getFullYear()}` 
  }
  
  console.log(timeframeFrom.getMonth())

  useEffect(() => {

    const getTimeframe = () => {

      if(timeframeTo){
        setTimeframe(`${getDate(timeframeFrom)} - ${getDate(timeframeTo)}`)
        return
      }
      


      setTimeframe(`${getDate(timeframeFrom)} - Present`)

    }

    getTimeframe()

  }, [timeframeTo, timeframeFrom])

  return (
    <div className="space-y-2">
      <div className="text-lg leading-4 lg:leading-3">
        <h4>
          {position !== 'Student' && (
            <span className="mr-2 font-bold">{position},</span>
          )}
          {organization}

          <span className="ml-2 text-xs font-bold opacity-75">
            {organizationLocation}
          </span>
        </h4>
        <label className="text-base opacity-75">{timeframe}</label>
      </div>

      {children}
    </div>
  )
}

export default OrganizationItem
