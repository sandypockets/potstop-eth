import Head from 'next/head'
import Image from 'next/image'

import { useState, useEffect } from 'react';

import Account from '../components/Account'
import Answer from '../components/Answer'
import AnswerForm from '../components/AnswerForm'
import EthName from "../components/EthName";

export default function Home() {
  const [accounts, setAccounts] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    if (accounts.length > 0) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [accounts])

  useEffect(async function() {
    if (window.ethereum) {
      const loadedAccount = await window.ethereum.request({ method: "eth_accounts" })
      setAccounts(loadedAccount)
      window.ethereum.on("accountsChanged", function(updatedAccountInfo) {
        setAccounts(updatedAccountInfo)
      })
    }
    fetch("/api/answers")
      .then(response => response.json())
      .then(data => { setAnswers(data.answers) })
      .then(() => setIsLoading(false))
      .catch((error) => console.error(error))
  }, [])

  const connect = async function() {
    if (window.ethereum) {
      const accountsArr = await window.ethereum.request({ method: "eth_requestAccounts" })
      accountsArr.length > 0 && setAccounts(accountsArr)
    } else {
      alert("You need an ETH wallet to sign up")
    }
  }

  const AnswersSection = () => {
    return (
      <>
        <section className="answers">
          {isLoading &&
            <div className="loading">Loading answers...</div>
          }
          {!isLoading &&
            answers.map((answer, index) => (
              <article key={index}>
                <Answer answer={answer} accounts={accounts} isLoggedIn={isLoggedIn} number={answer.answerId} />
              </article>
            ))
          }
        </section>
        <section>
          <AnswerForm accounts={accounts} setAnswers={setAnswers} isLoggedIn={isLoggedIn} />
        </section>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Looking for feedback as a beginner – Feedback forum – Potstop </title>
        <meta property="og:title" content="Looking for feedback as a beginner on Potstop" />
        <meta property="og:description" content="This is a project on the SuperHi Crypto + Web3 for Creatives course" />
        <meta property="og:image" content="/social.png" />
      </Head>
      <main>
        <header>
          <h1>Potstop</h1>
          <form>
            <input type="text" placeholder="Search" />
          </form>
          <Account accounts={accounts} connect={connect} isLoggedIn={isLoggedIn} />
        </header>
        <section className="question">
          <div className="main">
            <h3>Feedback forum</h3>
            <h2>Looking for feedback as a beginner</h2>
            <p>Hey everyone, I&apos;m a new potter, just 4 weeks into my journey, and I&apos;m looking to get some feedback on what I&apos;ve made so far. I&apos;m particularly interested in how to make rustic looking bowls and pots, and I&apos;d love to know what the best tools to use would be!</p>
            <div className="slides">
              <Image src="/image-1.jpg" width="600" height="800" />
              <Image src="/image-2.jpg" width="600" height="800" />
              <Image src="/image-3.jpg" width="600" height="800" />
              <Image src="/image-4.jpg" width="600" height="800" />
            </div>
          </div>
          <div className="meta">
            <EthName address={"0xb25bf3990c5a274a758a2a3a4cc90b3e407eaaf4"} />
          </div>
        </section>
        <AnswersSection />
      </main>
    </>
  )
}
