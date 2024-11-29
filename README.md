<p align = "center"> 
  <img src="./resources/icon.png" height="70" width="80" style="">
  <h2 align="center">Delta Vault</h2>
</p align = "center">
  <p align="center">
    <a href="https://youtu.be/7lgVWYOOpH0">Video Demo</a>
  </p>

<!-- - [About The Project](#about-the-project)
- [Inspiration](#inspiration)
- [Game Architecture](#game-architecture)
- [Game Features](#features)
- [Game Pics](#game-pics)
- [Run Locally](#run-locally)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Smart Contract](#smart-contract)
- [Future Work](#future-work)
- [Contact](#contact)
- [Acknowledgment](#acknowledgment)
- [Links And References](#links-and-references) -->
What is snowball?
<video width="100%" controls>
  <source src="https://static.okx.com/cdn/help/okex/earn/Snowball_video_english.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Strategy Overview

This strategy implements a dynamic hedging approach that generates buy/sell signals based on absolute returns and manages position sizes accordingly.

### Core Components

1. **Signal Generation**
```python
Signal = {
    'Buy'  : if AbsReturn >= threshold and AbsReturn < 0
    'Sell' : if AbsReturn >= threshold and AbsReturn > 0
}
```

2. **Position Sizing**
```python
BuySellQuantity = {
    if Signal == 'Buy':
        min(available_cash, initial_position_value - current_position_value) / current_price
        
    if Signal == 'Sell':
        max(-current_position, (initial_position_value - current_position_value) / current_price)
}
```

3. **Portfolio Updates**
```python
# Position Update
new_position = current_position + buy_sell_quantity

# Cash Balance Update
new_cash = current_cash - (buy_sell_quantity * current_price)

# Price Tracking
last_price = current_price
```

## Key Features

- **Mean Reversion**: Strategy assumes price movements beyond threshold will revert
- **Dynamic Position Sizing**: Adjusts position based on available capital and market conditions
- **Risk Management**: Built-in position limits based on cash constraints
- **Automated Rebalancing**: Continuously monitors and adjusts positions


## About The Project



## Inspiration



<center>

## Architecture
![alt text](/resources/contract_flow.png)

<!-- ![alt text](/resources/snowball-flow.png) -->

</center>

## Features


---
## Run Locally

### Frontend

### Backend

### Smart Contract

---
## Future Work 


---

## Contact
Twitter - @Krieger Mail - prsumit35@gmail.com


Project github: https://github.com/startup-dreamer/delta-vault

---

## Acknowledgment

Thanks to all the **Sponsors (Ethena and Goldsky) and Encode-Club** for making ***ETHENA
HACKATHON***. I would really appreciate the feedback/guidance from the judges.

---

## Links And References
- Deployed on Ethena Testnet: [Ethena-Developer](https://network.ethena.fi/developers)
- Ethena Docs: [Ethena](https://ethena-labs.gitbook.io/ethena-labs)
- Goldsky Docs: [Goldsky](https://docs.goldsky.com/)
- Pyth Address: [Pyth-Contract](https://docs.pyth.network/price-feeds/contract-addresses)
- OKX Snowball: [OKX-Snowball](https://www.okx.com/earn/snowball)
