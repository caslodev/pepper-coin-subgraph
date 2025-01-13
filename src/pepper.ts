import { BigInt } from "@graphprotocol/graph-ts"
import {
  Approval as ApprovalEvent,
  ClaimEnabledStatusChanged as ClaimEnabledStatusChangedEvent,
  ClaimStartBlockChanged as ClaimStartBlockChangedEvent,
  Claimed as ClaimedEvent,
  EpochLengthChanged as EpochLengthChangedEvent,
  MinimumCHZStakedAmountChanged as MinimumCHZStakedAmountChangedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  RewardsCHZStakedAmountChanged as RewardsCHZStakedAmountChangedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  StakingContractChanged as StakingContractChangedEvent,
  StakingPoolContractChanged as StakingPoolContractChangedEvent,
  Transfer as TransferEvent
} from "../generated/Pepper/Pepper"
import {
  Approval,
  ClaimEnabledStatusChanged,
  ClaimStartBlockChanged,
  Claimed,
  ClaimedAggregated,
  ClaimedAggregatedPerDay,
  EpochLengthChanged,
  MinimumCHZStakedAmountChanged,
  OwnershipTransferred,
  RewardsCHZStakedAmountChanged,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  StakingContractChanged,
  StakingPoolContractChanged,
  Transfer
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClaimEnabledStatusChanged(
  event: ClaimEnabledStatusChangedEvent
): void {
  let entity = new ClaimEnabledStatusChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.status = event.params.status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClaimStartBlockChanged(
  event: ClaimStartBlockChangedEvent
): void {
  let entity = new ClaimStartBlockChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newStartBlock = event.params.newStartBlock

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClaimed(event: ClaimedEvent): void {
  let entity = new Claimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.amountStakingPool = event.params.amountStakingPool
  entity.amountStaking = event.params.amountStaking

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  const timestamp = event.block.timestamp.toI64() * 1000
  const date = new Date(timestamp)

  const dateStr = date.getUTCFullYear().toString() +
    (date.getUTCMonth() + 1).toString().padStart(2, '0') +
    date.getUTCDate().toString().padStart(2, '0')

  entity.save()

  // Update aggregate
  let aggregate = ClaimedAggregated.load("total")
  if (!aggregate) {
    aggregate = new ClaimedAggregated("total")
    aggregate.totalMintPepper = BigInt.fromI32(0)
    aggregate.totalClaims = BigInt.fromI32(0)
  }
  aggregate.totalMintPepper = aggregate.totalMintPepper.plus(event.params.amountStaking)
  aggregate.totalMintPepper = aggregate.totalMintPepper.plus(event.params.amountStakingPool)
  aggregate.totalClaims = aggregate.totalClaims.plus(BigInt.fromI32(1))
  aggregate.save()

  let aggregatePerDay = ClaimedAggregatedPerDay.load(dateStr)
  if (!aggregatePerDay) {
    aggregatePerDay = new ClaimedAggregatedPerDay(dateStr)
    aggregatePerDay.totalMintPepper = BigInt.fromI32(0)
    aggregatePerDay.totalClaims = BigInt.fromI32(0)
  }

  aggregatePerDay.totalMintPepper = aggregate.totalMintPepper.plus(event.params.amountStaking)
  aggregatePerDay.totalMintPepper = aggregate.totalMintPepper.plus(event.params.amountStakingPool)
  aggregatePerDay.totalClaims = aggregate.totalClaims.plus(BigInt.fromI32(1))

  aggregatePerDay.save()
}



export function handleEpochLengthChanged(event: EpochLengthChangedEvent): void {
  let entity = new EpochLengthChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.epochLength = event.params.epochLength

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMinimumCHZStakedAmountChanged(
  event: MinimumCHZStakedAmountChangedEvent
): void {
  let entity = new MinimumCHZStakedAmountChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.chzAmount = event.params.chzAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardsCHZStakedAmountChanged(
  event: RewardsCHZStakedAmountChangedEvent
): void {
  let entity = new RewardsCHZStakedAmountChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pepperAmount = event.params.pepperAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStakingContractChanged(
  event: StakingContractChangedEvent
): void {
  let entity = new StakingContractChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newStakingContract = event.params.newStakingContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStakingPoolContractChanged(
  event: StakingPoolContractChangedEvent
): void {
  let entity = new StakingPoolContractChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newStakingPoolContract = event.params.newStakingPoolContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
