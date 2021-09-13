import { parseISO, format } from 'date-fns'
import { Ifo, PoolConfig, FarmConfig } from '../../src/config/constants/types'
import { SettingsType } from './types'

export const getIfos = (data) => {
  const ifos: Ifo = data.map((ifo) => {
    const lunchTime2 = parseISO(ifo.launch_datetime)
    return {
      id: ifo._id,
      address: ifo.address,
      isActive: ifo.is_active,
      name: ifo.name,
      subTitle: ifo?.sub_title,
      description: ifo?.description,
      launchDate: format(lunchTime2, 'yyyy-MM-dd'),
      launchTime: format(lunchTime2, 'HH:mm:ss'),
      saleAmount: ifo.sale_amount,
      raiseAmount: ifo.raise_amount,
      dustToBurn: ifo.burn_amount,
      projectSiteUrl: ifo.project_url,
      currency: ifo.currency,
      currencyAddress: ifo.currency_address,
      tokenDecimals: ifo.decimals,
      releaseBlockNumber: ifo.release_block,
    }
  })
  return ifos
}

export const getPools = (data) => {
  const pools: PoolConfig = data.map((pool) => {
    return {
      sousId: pool.sous_id,
      tokenName: pool?.token?.name,
      stakingTokenName: pool?.quote_token?.name,
      stakingLimit: pool?.staking_limit,
      stakingTokenAddress: pool?.quote_token?.mainnet_address,
      contractAddress: {
        56: pool.contract_address,
        97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      },
      poolCategory: pool.category,
      projectLink: pool.project_url,
      harvest: pool.harvest,
      tokenPerBlock: pool.token_per_block,
      sortOrder: pool.ranking,
      isFinished: pool.is_finished,
      tokenDecimals: pool?.token?.decimals,
    }
  })
  return pools
}

export const getFarms = (data) => {
  const farms: FarmConfig = data.map((farm) => {
    return {
      pid: farm.pid,
      lpSymbol: farm.lp_symbol,
      lpAddresses: {
        56: farm.lp_mainnet_address,
        97: '0x9cDf469a82b20108DF6a52469Ca4ddc42E76Ef53',
      },
      tokenSymbol: farm?.token?.symbol,
      tokenAddresses: {
        56: farm?.token?.mainnet_address,
        97: '0x9cDf469a82b20108DF6a52469Ca4ddc42E76Ef53',
      },
      quoteTokenSymbol: farm?.quote_token?.symbol,
      quoteTokenAdresses: farm?.quote_token?.mainnet_address,
      isCommunity: farm?.is_community,
    }
  })
  return farms
}

export const getFormattedData = (type: SettingsType, data) => {
  const handler = {
    IFO: () => getIfos(data),
    POOL: () => getPools(data),
    FARM: () => getFarms(data),
  }

  const factory = () => {
    return handler[type]()
  }

  return factory()
}
