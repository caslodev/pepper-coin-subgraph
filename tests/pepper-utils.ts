import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  ClaimEnabledStatusChanged,
  ClaimStartBlockChanged,
  Claimed,
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
} from "../generated/Pepper/Pepper"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createClaimEnabledStatusChangedEvent(
  status: boolean
): ClaimEnabledStatusChanged {
  let claimEnabledStatusChangedEvent =
    changetype<ClaimEnabledStatusChanged>(newMockEvent())

  claimEnabledStatusChangedEvent.parameters = new Array()

  claimEnabledStatusChangedEvent.parameters.push(
    new ethereum.EventParam("status", ethereum.Value.fromBoolean(status))
  )

  return claimEnabledStatusChangedEvent
}

export function createClaimStartBlockChangedEvent(
  newStartBlock: BigInt
): ClaimStartBlockChanged {
  let claimStartBlockChangedEvent =
    changetype<ClaimStartBlockChanged>(newMockEvent())

  claimStartBlockChangedEvent.parameters = new Array()

  claimStartBlockChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newStartBlock",
      ethereum.Value.fromUnsignedBigInt(newStartBlock)
    )
  )

  return claimStartBlockChangedEvent
}

export function createClaimedEvent(
  account: Address,
  amountStakingPool: BigInt,
  amountStaking: BigInt
): Claimed {
  let claimedEvent = changetype<Claimed>(newMockEvent())

  claimedEvent.parameters = new Array()

  claimedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam(
      "amountStakingPool",
      ethereum.Value.fromUnsignedBigInt(amountStakingPool)
    )
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam(
      "amountStaking",
      ethereum.Value.fromUnsignedBigInt(amountStaking)
    )
  )

  return claimedEvent
}

export function createEpochLengthChangedEvent(
  epochLength: i32
): EpochLengthChanged {
  let epochLengthChangedEvent = changetype<EpochLengthChanged>(newMockEvent())

  epochLengthChangedEvent.parameters = new Array()

  epochLengthChangedEvent.parameters.push(
    new ethereum.EventParam(
      "epochLength",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(epochLength))
    )
  )

  return epochLengthChangedEvent
}

export function createMinimumCHZStakedAmountChangedEvent(
  chzAmount: BigInt
): MinimumCHZStakedAmountChanged {
  let minimumChzStakedAmountChangedEvent =
    changetype<MinimumCHZStakedAmountChanged>(newMockEvent())

  minimumChzStakedAmountChangedEvent.parameters = new Array()

  minimumChzStakedAmountChangedEvent.parameters.push(
    new ethereum.EventParam(
      "chzAmount",
      ethereum.Value.fromUnsignedBigInt(chzAmount)
    )
  )

  return minimumChzStakedAmountChangedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRewardsCHZStakedAmountChangedEvent(
  pepperAmount: BigInt
): RewardsCHZStakedAmountChanged {
  let rewardsChzStakedAmountChangedEvent =
    changetype<RewardsCHZStakedAmountChanged>(newMockEvent())

  rewardsChzStakedAmountChangedEvent.parameters = new Array()

  rewardsChzStakedAmountChangedEvent.parameters.push(
    new ethereum.EventParam(
      "pepperAmount",
      ethereum.Value.fromUnsignedBigInt(pepperAmount)
    )
  )

  return rewardsChzStakedAmountChangedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createStakingContractChangedEvent(
  newStakingContract: Address
): StakingContractChanged {
  let stakingContractChangedEvent =
    changetype<StakingContractChanged>(newMockEvent())

  stakingContractChangedEvent.parameters = new Array()

  stakingContractChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newStakingContract",
      ethereum.Value.fromAddress(newStakingContract)
    )
  )

  return stakingContractChangedEvent
}

export function createStakingPoolContractChangedEvent(
  newStakingPoolContract: Address
): StakingPoolContractChanged {
  let stakingPoolContractChangedEvent =
    changetype<StakingPoolContractChanged>(newMockEvent())

  stakingPoolContractChangedEvent.parameters = new Array()

  stakingPoolContractChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newStakingPoolContract",
      ethereum.Value.fromAddress(newStakingPoolContract)
    )
  )

  return stakingPoolContractChangedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}
