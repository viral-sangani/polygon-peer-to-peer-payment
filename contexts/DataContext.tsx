declare let window: any;
import { createContext, useContext, useState } from "react";
import Web3 from "web3";
import PaymentContract from "../abis/PaymentContract.json";
import PaymentToken from "../abis/PaymentToken.json";

interface DataContextProps {
  account: string;
  paymentContract: any;
  loading: boolean;
  loadWallet: () => Promise<void>;
  sendPayment: ({
    amount,
    toAddress,
  }: {
    amount: any;
    toAddress: any;
  }) => Promise<any>;
  balance: number;
}

const DataContext = createContext<DataContextProps | null>(null);

export const DataProvider: React.FC = ({ children }) => {
  const data = useProviderData();

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext<DataContextProps | null>(DataContext);

export const useProviderData = () => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<string>();
  const [paymentContract, setPaymentContract] = useState<any>();
  const [paymentToken, setPaymentToken] = useState<any>();
  const [balance, setBalance] = useState<number>();

  const loadWallet = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const web3 = window.web3;
      var allAccounts = await web3.eth.getAccounts();

      setAccount(allAccounts[0]);

      const paymentContractData = PaymentContract.networks["80001"];
      const paymentTokenData = PaymentToken.networks["80001"];

      if (paymentContractData && paymentTokenData) {
        var paymentContractInstance = new web3.eth.Contract(
          PaymentContract.abi,
          paymentContractData.address
        );
        setPaymentContract(paymentContractInstance);

        var paymentTokenInstance = new web3.eth.Contract(
          PaymentToken.abi,
          paymentTokenData.address
        );
        setPaymentToken(paymentTokenInstance);
        var bal = await paymentTokenInstance.methods
          .balanceOf(allAccounts[0])
          .call();
        setBalance(bal);
      } else {
        window.alert("TestNet not found");
      }
      setLoading(false);
    } else {
      window.alert("Non-Eth browser detected. Please consider using MetaMask.");
    }
  };

  const sendPayment = async ({ amount, toAddress }) => {
    try {
      const amountInWei = window.web3.utils.toWei(amount, "ether");
      var bal = await paymentToken.methods.balanceOf(account).call();
      if (bal < amountInWei) {
        return "You don't have enough balance";
      }
      const txHash = await paymentToken.methods
        .transfer(toAddress, amountInWei)
        .send({
          from: account,
        });
      var bal = await paymentToken.methods.balanceOf(account).call();
      setBalance(bal);
      return "Payment success";
    } catch (e) {
      return e.message;
    }
  };

  return {
    account,
    paymentContract,
    loading,
    loadWallet,
    sendPayment,
    balance,
  };
};
