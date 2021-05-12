import React from 'react'
import type { StateUpdatedEvent } from '../../../providers/events/State'
import { Text, Title } from './components'
import { CallList } from './components/CallList'

interface Props {
  event: StateUpdatedEvent
}

export function StateUpdatedPreview({ event }: Props) {
  return (
    <>
      {event.updated.length > 0 && (
        <>
          <Title>Modified state entries</Title>
          <CallList calls={event.updated} network={event.network} />
        </>
      )}
      {event.persisted.length > 0 && (
        <>
          <Title>Persisted state entries</Title>
          <CallList calls={event.persisted} network={event.network} />
        </>
      )}
      {event.persisted.length === 0 && <Text>No other state</Text>}
    </>
  )
}
