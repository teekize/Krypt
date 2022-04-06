import React, { useState, useEffect,useContext } from "react";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  return transactionsContract
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setcurrentAccount]=useState("");
    const [formData, setFormData]=useState({
        addressTo:"",
        amount:"",
        message:""

    })
    const [isLoading, setIsloading]=useState(false);
    const [transactionCount, setTransactionCount]=useState(localStorage.getItem("transactionCount"));


    const handleChange=(e,name)=>{
        setFormData((prevState)=>({...prevState, [name]:e.target.value}))
    }
    const checkIfWalletIsConnected=async()=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const accounts= await ethereum.request({method:"eth_accounts"});
            if(accounts.length){
                setcurrentAccount(accounts[0]);
                console.log(currentAccount)
                
            }else{
                console.log("no account found")
            }

        }catch(e){
            console.log(e)
            throw new Error("No ethereum account!")
        }
    }

    const connectWallet=async()=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const accounts= await ethereum.request({method:"eth_requestAccounts"});

            setcurrentAccount(accounts[0]);
        }catch(e){
            console.log(e)
            throw new Error("No ethereum account!")
        }
    }

    const sendTransaction=async()=>{
        try{
            if(!ethereum) return alert("Please install Metamask!");
            const { addressTo,amount,message} =formData;
            const transactionContract=getEthereumContract();
            const parsedAmount=ethers.utils.parseEther(amount);

            await ethereum.request({
                method:"eth_sendTransaction", 
                params:[{
                    from:currentAccount,
                    to:addressTo,
                    gas:"0x5208",
                    value:parsedAmount._hex,

                }]
            })

           const transHash= await transactionContract.addToBlockchain(addressTo,parsedAmount,message);
           setIsloading(true);
           console.log(`Loading -${transHash.hash}`)

           await transHash.wait();
           setIsloading(false);
           console.log(`Success -${transHash.hash}`)

           const transactionCount=await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber())

        }catch(e){
            console.log(e)
            throw new Error("No ethereum account!")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

  return (
    <TransactionContext.Provider value={{connectWallet,currentAccount ,formData,setFormData,handleChange,sendTransaction}}>
      {children}
    </TransactionContext.Provider>
  );
};
