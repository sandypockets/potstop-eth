import Web3 from 'web3';

let web3 = new Web3(Web3.givenProvider || "wss://mainnet.infura.io/ws/v3/28696900a2cf490eb160741dc63e4707")

export { web3 }