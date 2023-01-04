import React, { useCallback } from 'react'

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
  const getTimeframe = useCallback(() => {
    if (timeframeTo) {
      return `${timeframeFrom.getFullYear()} - ${timeframeTo.getFullYear()}`
    }

    return `${timeframeFrom?.getFullYear()} - Present`
  }, [timeframeFrom, timeframeTo])

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
        <label className="text-base opacity-75">{getTimeframe()}</label>
      </div>

      {children}
    </div>
  )
}

export default OrganizationItem
