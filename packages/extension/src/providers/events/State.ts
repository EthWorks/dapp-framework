import type { ChainCall } from './Message'

export interface StateEntry {
  address: string
  data: string
  value: string
}

export interface StateUpdate {
  address: string
  data: string
  previous: string | undefined
  current: string | undefined
}

export interface InitEvent {
  type: 'INIT'
  time: string
}

export interface NetworkConnectedEvent {
  type: 'NETWORK_CONNECTED'
  time: string
  network: string
  chainId: number
}

export interface NetworkDisconnectedEvent {
  type: 'NETWORK_DISCONNECTED'
  time: string
}

export interface BlockFoundEvent {
  type: 'BLOCK_FOUND'
  time: string
  network: string
  blockNumber: number
}

export interface CallsUpdatedEvent {
  type: 'CALLS_UPDATED'
  time: string
  network: string
  added: {
    address: string
    data: string
  }[]
  removed: {
    address: string
    data: string
  }[]
  persisted: {
    address: string
    data: string
  }[]
}

export interface StateUpdatedEvent {
  type: 'STATE_UPDATED'
  time: string
  network: string
  blockNumber: number
  multicallAddress: string
  duration: number
  updated: StateUpdate[]
  persisted: StateEntry[]
}

export interface FetchErrorEvent {
  type: 'FETCH_ERROR'
  time: string
  network: string
  blockNumber: number
  multicallAddress: string
  duration: number
  error: string
  calls: {
    address: string
    data: string
  }[]
}

export type Event =
  | InitEvent
  | NetworkConnectedEvent
  | NetworkDisconnectedEvent
  | BlockFoundEvent
  | CallsUpdatedEvent
  | StateUpdatedEvent
  | FetchErrorEvent

export interface State {
  currentNetwork: string | undefined
  blockNumbers: {
    [network: string]: number
  }
  state: {
    [network: string]: StateEntry[] | undefined
  }
  calls: ChainCall[]
  events: Event[]
}
