import Tip from './Tip'
import EthName from './EthName'

const Answer = function ({ number, answer, accounts, isLoggedIn }) {
  const reply = {__html: answer.reply}
  return (
    <div className="answer">
      <h3>Reply #{number}</h3>
      <div className="main" dangerouslySetInnerHTML={reply}></div>
      <div className="meta">
        <EthName address={answer.account} />
        <Tip isLoggedIn={isLoggedIn} accounts={accounts} address={answer.account} />
      </div>
    </div>
  )
}

export default Answer;