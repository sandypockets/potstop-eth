import { web3 } from '../lib/web3'

export default function Tip ({ isLoggedIn, accounts, address }) {
  address = address.toString()
  const send = function () {
    if (isLoggedIn) {
      const tipAmount = web3.utils.toWei("0.01", "ether")
      window.ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: accounts[0],
          to: address,
          value: web3.utils.toHex(tipAmount)
        }]
      })
    } else {
      alert("Please connect a wallet")
    }
  }

  return (
    accounts[0] !== address && <button disabled={!isLoggedIn} onClick={send}>Tip 0.01 ETH</button>
  )
}
