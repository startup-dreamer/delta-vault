export const DELTA_VAULT_PRODUCT_ABI = [
	{
		"inputs": [],
		"name": "Claimed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DeltaVaultNotEnded",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DeltaVaultStarted",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidTokenParams",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "SafeERC20FailedOperation",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "usdAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "targetAmount",
				"type": "uint256"
			}
		],
		"name": "BuyShare",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "product",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "triggerPrice",
				"type": "uint256"
			}
		],
		"name": "KnockIn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "product",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "triggerPrice",
				"type": "uint256"
			}
		],
		"name": "KnockOut",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "product",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "currentPrice",
				"type": "uint256"
			}
		],
		"name": "PriceCheck",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "product",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum IStruct.DeltaVaultResultStatus",
				"name": "currentStatus",
				"type": "uint8"
			}
		],
		"name": "ProductStatusChange",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "_baseProfit",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "_boughtAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_period",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_priceObserver",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_startTime",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_targetDecimal",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_targetInitPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_targetKnockInPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_targetKnockOutPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_targetToken",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_targetTokenPythId",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_usdPythId",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_usdToken",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes[]",
				"name": "priceUpdateData",
				"type": "bytes[]"
			}
		],
		"name": "buyShare",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimReward",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "priceId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes[]",
				"name": "priceUpdateData",
				"type": "bytes[]"
			}
		],
		"name": "getLatestPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "hedge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "targetToken",
						"type": "address"
					},
					{
						"internalType": "bytes32",
						"name": "targetTokenPythId",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "targetInitPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "targetKnockInPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "targetKnockOutPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "period",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "baseProfit",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "usdToken",
						"type": "address"
					},
					{
						"internalType": "bytes32",
						"name": "usdPythId",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "priceObserver",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "pythAddress",
						"type": "address"
					}
				],
				"internalType": "struct IStruct.ProductInitArgs",
				"name": "args",
				"type": "tuple"
			}
		],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pyth",
		"outputs": [
			{
				"internalType": "contract IPyth",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalBoughtAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]