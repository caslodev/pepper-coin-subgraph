# Pepper Token Subgraph

This subgraph indexes and tracks Pepper token claims and aggregated statistics on the Chiliz Chain. It tracks individual claim events and maintains aggregated statistics about total claims and amounts.

## Deployment Information

- **Network**: Chiliz Chain
- **Contract Address**: [0x60F397acBCfB8f4e3234C659A3E10867e6fA6b67](https://chiliscan.com/token/0x60F397acBCfB8f4e3234C659A3E10867e6fA6b67)
- **Contract Code & ABI**: [View on ChiliScan](https://chiliscan.com/token/0x60F397acBCfB8f4e3234C659A3E10867e6fA6b67/contract/code)

### Contract Details
- **Token Name**: Pepper Token
- **Token Symbol**: PEPPER
- **Decimals**: 18
- **Max Supply**: 8,888,888,888 PEPPER

## Schema

### Entities

#### Claimed
Tracks individual claim events:
- `id`: Unique identifier (transaction hash)
- `account`: Address of the claimer
- `amountStakingPool`: Amount claimed from staking pool
- `amountStaking`: Amount claimed from direct staking
- `blockNumber`: Block number of the claim
- `timestamp`: Timestamp of the claim

#### ClaimedAggregated
Maintains aggregated statistics:
- `id`: Unique identifier ("total")
- `totalAmountStaking`: Total amount claimed through direct staking
- `totalClaims`: Total number of claim operations executed

## Queries

### Get Total Claims Statistics
```graphql
query GetClaimStats {
  claimedAggregateds(where: {id: "total"}) {
    totalAmountStaking
    totalClaims
  }
}
```

### Get Individual Claims
```graphql
query GetClaims {
  claimeds {
    account
    amountStaking
    amountStakingPool
    blockNumber
    timestamp
  }
}
```

## Development

### Prerequisites
- Node.js
- Graph CLI: `npm install -g @graphprotocol/graph-cli`
- Graph TS: `npm install -g @graphprotocol/graph-ts`

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate types:
   ```bash
   graph codegen
   ```
4. Build subgraph:
   ```bash
   graph build
   ```

### Configuration

Update your `subgraph.yaml` with the correct network and contract address:

```yaml
dataSources:
  - kind: ethereum/contract
    name: Pepper
    network: chiliz
    source:
      address: "0x60F397acBCfB8f4e3234C659A3E10867e6fA6b67"
      abi: Pepper
      startBlock: 17281665  # Replace with the contract deployment block
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - Claimed
        - ClaimedAggregated
      abis:
        - name: Pepper
          file: ./abis/Pepper.json
      eventHandlers:
        - event: Claimed(indexed address,indexed uint256,indexed uint256)
          handler: handleClaimed
      file: ./src/mapping.ts
```

### Deployment
Deploy to the Graph Node:
```bash
graph deploy --node <NODE_URL> --ipfs <IPFS_URL> <SUBGRAPH_NAME>
```

## Contract Features

The Pepper token contract includes the following key features:
- ERC20 token with capped supply
- Staking rewards distribution
- Claim functionality for both staking pool and direct staking
- Role-based access control
- Reentrancy protection
- Validator management system

### Key Functions
- `claim()`: Allows users to claim their PEPPER rewards
- `calculateRewards()`: Calculates pending rewards for an address
- `getPendingClaim()`: Returns the total pending rewards for the caller

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT

## Links & Resources

- [Contract on ChiliScan](https://chiliscan.com/token/0x60F397acBCfB8f4e3234C659A3E10867e6fA6b67)
- [Contract Source Code](https://chiliscan.com/token/0x60F397acBCfB8f4e3234C659A3E10867e6fA6b67/contract/code)
- [Chiliz Chain Documentation](https://docs.chiliz.com)