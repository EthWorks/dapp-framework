import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider'
import { ChainId } from '../../constants'

interface TransactionStarted {
  type: 'transactionStarted'
  transaction: TransactionResponse
  submittedAt: number
}

interface TransactionSuccedd {
  type: 'transactionSuccedd'
  transaction: TransactionResponse
  receipt: TransactionReceipt
  submittedAt: number
}

interface TransactionFailed {
  type: 'transactionFailed'
  transaction: TransactionResponse
  receipt: TransactionReceipt
  submittedAt: number
}

interface WalletConnected {
  type: 'walletConnected'
  address: string
}

export type Notification = TransactionStarted | TransactionSuccedd | TransactionFailed | WalletConnected

export type NotificationWithChainId = Notification & { chainId: ChainId }

export type Notifications = {
  [T in ChainId]?: Notification[]
}

export const DEFAULT_NOTIFICATIONS: Notifications = {}