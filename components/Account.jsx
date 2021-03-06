import EthName from './EthName'

const Account = function ({ accounts, connect, isLoggedIn }) {
  if (isLoggedIn) {
    return <EthName address={accounts[0]} />
    } else {
      return <button onClick={connect}>Connect</button>
    }
}

export default Account;