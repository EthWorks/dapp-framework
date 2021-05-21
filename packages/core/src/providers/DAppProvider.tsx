import { ReactNode, useEffect } from 'react'
import { MULTICALL_ADDRESSES } from '../constants'
import { Config } from '../model/config/Config'
import { ConfigProvider } from '../providers/config/provider'
import { BlockNumberProvider } from './blockNumber/provider'
import { ChainStateProvider } from './chainState'
import { useConfig } from './config/context'
import { EthersProvider } from './EthersProvider'
import { NotificationsProvider } from './notifications/provider'
import { NetworkActivator } from './NetworkActivator'
import { TransactionProvider } from './transactions/provider'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useEthers } from '..'

function LoginProvider() {
  const { activate } = useEthers()
  const { supportedChains } = useConfig()

  const eagerConnect = async () => {
    const injected = new InjectedConnector({ supportedChainIds: supportedChains })
    if (await injected.isAuthorized()) {
      activate(injected)
    }
  }

  useEffect(() => {
    eagerConnect()
  }, [])

  return null
}

interface DAppProviderProps {
  children: ReactNode
  config: Config
}

export function DAppProvider({ config, children }: DAppProviderProps) {
  return (
    <ConfigProvider config={config}>
      <DAppProviderWithConfig>{children}</DAppProviderWithConfig>
    </ConfigProvider>
  )
}

interface WithConfigProps {
  children: ReactNode
}

function DAppProviderWithConfig({ children }: WithConfigProps) {
  const { multicallAddresses } = useConfig()
  const multicallAddressesMerged = { ...MULTICALL_ADDRESSES, ...multicallAddresses }
  return (
    <EthersProvider>
      <BlockNumberProvider>
        <NetworkActivator />
        <ChainStateProvider multicallAddresses={multicallAddressesMerged}>
          <NotificationsProvider>
            <TransactionProvider>
              <LoginProvider />
              {children}
            </TransactionProvider>
          </NotificationsProvider>
        </ChainStateProvider>
      </BlockNumberProvider>
    </EthersProvider>
  )
}
