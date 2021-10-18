import Head from "next/head";
import { useState } from "react";
import Web3 from "web3";
import Navbar from "../components/Navbar";
import TokensModal from "../components/TokensModal";
import { useData } from "../contexts/DataContext";

export default function Home() {
  const { account, selectedToken, sendPayment, balance } = useData();

  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [button, setButton] = useState("Send");

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="flex flex-col min-h-screen justify-start bg-gradient-to-b from-gray-800  to-gray-500">
      <Head>
        <title>Peer-to-Peer Payment dApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className="mt-36 flex justify-center items-start">
        <div className="w-full md:w-2/6 bg-gray-800 rounded-3xl p-4 mx-3">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-full flex flex-row justify-between">
              <span className="text-white text-lg text-start">Send Token</span>
              <span className="text-white text-base text-start font-bold font-inconsolata">
                {balance &&
                  `Balance: ${
                    selectedToken.decimals === 18
                      ? Web3.utils.fromWei(balance.toString(), "ether")
                      : balance / Math.pow(10, selectedToken.decimals)
                  } ${selectedToken.symbol}`}
              </span>
            </div>
            <div className="bg-gray-700 h-20 w-full my-1 border border-gray-600 rounded-3xl flex flex-row justify-between items-center px-4">
              <div className="flex flex-row items-center space-x-2">
                <TokensModal
                  closeModal={closeModal}
                  isOpen={isOpen}
                  openModal={openModal}
                >
                  <div
                    className="px-3 py-2 bg-gray-800 rounded-2xl flex flex-row items-center cursor-pointer"
                    onClick={openModal}
                  >
                    {selectedToken.logo ? (
                      <img
                        className="w-6 h-6 border rounded-full"
                        src={selectedToken.logo}
                      />
                    ) : (
                      <div className="w-6 h-6 border rounded-full text-white flex justify-center items-center font-bold">
                        {selectedToken.symbol[0]}
                      </div>
                    )}
                    <span className="text-white text-lg font-bold mx-2">
                      {selectedToken.symbol}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </TokensModal>
                <span
                  className="text-white text-base font-bold font-inconsolata cursor-pointer"
                  onClick={() => {
                    setAmount(
                      Web3.utils.fromWei(balance.toString(), "ether").toString()
                    );
                  }}
                >
                  MAX
                </span>
              </div>
              <input
                className="font-inconsolata text-3xl text-white bg-transparent w-2/4 text-right outline-none"
                placeholder="0.0"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#fff"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
              />
            </svg>
            <div className="bg-gray-700 h-20 w-full my-1 border border-gray-600 rounded-3xl flex flex-row justify-between items-center px-3">
              <input
                className="w-full font-inconsolata text-xl text-white bg-transparent outline-none"
                placeholder="Destination Address"
                value={toAddress}
                onChange={(e) => {
                  setToAddress(e.target.value);
                }}
              />
            </div>
            <div className="h-4" />
            <div
              className="h-16 w-full rounded-3xl flex justify-center items-center cursor-pointer"
              style={{ backgroundColor: "#214770" }}
              onClick={async () => {
                if (button !== "Sending...") {
                  setError("");
                  if (!account) {
                    setError("Please connect your wallet");
                  } else if (amount === "") {
                    setError("Please set amount");
                  } else if (toAddress === "") {
                    setError("Please set destination address");
                  } else {
                    setButton("Sending...");
                    var msg = await sendPayment({ amount, toAddress });
                    if ((await msg) === "Payment success") {
                      setAmount("");
                      setToAddress("");
                      setButton("Payment Success");
                      setTimeout(() => {
                        setButton("Send");
                      }, 1000);
                      setError("");
                    } else {
                      setError(msg);
                    }
                  }
                }
              }}
            >
              <span className="font-semibold text-xl text-blue-300">
                {button}
              </span>
            </div>
            {error && <span className="text-red-600 font-bold">*{error}</span>}
          </div>
        </div>
      </main>
    </div>
  );
}
