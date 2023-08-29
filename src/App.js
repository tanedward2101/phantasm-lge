import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { ConnectWallet, ThirdwebProvider, useContractRead, useContract, useAddress, Web3Button } from "@thirdweb-dev/react";

// Your smart contract address

function App() {
  const address = useAddress();
  const abi = [
    {
      "inputs": [
        {
          "internalType": "contract IERC20",
          "name": "_TKN",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_TKNPRICE",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
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
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalRaised",
          "type": "uint256"
        }
      ],
      "name": "Buy",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "Claim",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "TKN",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "TKNPRICE",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "buy",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claimToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ethergth",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "etherneded",
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
      "name": "ethgathered",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getMaxAllocation",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getPendingTKN",
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
      "name": "isPublic",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
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
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "remainToken",
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
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "teamAddr",
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
      "name": "totalRaised",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tsClaimable",
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
      "name": "tsPublic",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "claimed",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "maxAlloc",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  const contractAddress = '0x4f6005E36BD3A4FCf55997bF8a1AFD689E58AF6e'
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useContractRead(contract, "ethergth");
  const [inputValue, setInputValue] = useState('');
  // Mengatur nilai input saat komponen di-render
  useEffect(() => {
    setInputValue(0.1);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const setMax = () => {
    setInputValue(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan nilai input yang sudah diambil
    // console.log('Nilai input yang diambil:', inputValue);
    document.getElementById('getValue').innerHTML = inputValue;
  };


  return (

    <div className="App">
      <header className="App-header">
        <nav>
          <div style={{ display: 'flex', float: 'right' }}>
            <img src='https://phantasmrealm.com/wp-content/uploads/2023/07/ERA-white.png' style={{ height: '100%', margin: 'auto 30px' }} />
            {/* <button onclick="window.location.href='https://phantasmrealm.com/explore-the-realm/#hex'" class="shiny2"> Connect Wallet</button> */}
            <ConnectWallet />
          </div>
        </nav>

        <img src="https://phantasmrealm.com/wp-content/uploads/2023/07/MAINLOGO_UPDATED-1.png" alt="logo" />
        <p className='description my-8'>
          Phantasm is a distinctive fusion of DEX protocols with on-chain mythical game where you can utilize your cryptocurrencies and boost with NFT to increase your rewards.
        </p>

        <div className="grid grid-cols-3 gap-3 bg-transparant mb-10 wd-80">
          <div className='raised'>
            <img src="https://phantasmrealm.com/wp-content/uploads/2023/07/Target.png" />
            <h3>Target Raised<br /><strong>100 ETH</strong></h3>
          </div>
          <div className='raised'>
            <img src="https://phantasmrealm.com/wp-content/uploads/2023/07/Bangungan.png" />
            <h3>Total Raised<br /><strong>{data}
              {/* <Web3Button
                contractAbi={abi}
                contractAddress={contractAddress} // Your smart contract address
                action={async (contract) => {
                  contract
                }}
              >
                Execute Action
              </Web3Button> */}
            </strong></h3>
          </div>
          <div className='raised'>
            <img src="https://phantasmrealm.com/wp-content/uploads/2023/07/COIN_PTSM_LOGO-1.png" />
            <h3>PRICE<br /><strong>$0.001</strong></h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 wd-80">
          <div className="grid grid-cols-1 gap-1 bg-transparant-nopadding">
            <div className='p-3 raised-header'>MAIN EVENT DETAILS</div>
            <div className="grid grid-cols-2 gap-2 p-5">
              <div className='raised-desc'>
                <h3>05/06/2023<br></br>15:00 UTC<br></br><br></br>Soft Cap :<br></br>50 ETH</h3>
              </div>
              <div className='raised-desc'>
                <h3>End Date 06/06/2023<br></br>15:00 UTC<br></br><br></br>Hard Cap :<br></br>150 ETH</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 bg-transparant-nopadding">
            <form onSubmit={handleSubmit}>
              <div className='p-3 raised-header'>SALE</div>
              <div className='form-group'>
                <input type="number"
                  value={inputValue}
                  onChange={handleInputChange} min={0.1} step={0.1} max={1} maxLength={1} className='form-input' id="sale" placeholder="Masukkan teks di sini..." />
                <button className='pull-right btn-submit' type='button' onClick={setMax}>MAX</button>
              </div>
              <div className="grid grid-cols-2 gap-2 p-5">
                <div className='raised-desc'>
                  <h3>
                    Min Allocation :<br /><br />
                    MAx Allocation :<br /><br />
                    Your Contribution :<br /><br />
                  </h3>
                </div>
                <div className='raised-desc pull-right'>
                  <h3>
                    0.1<br /><br />
                    1<br /><br />
                    <b id='getValue'>...</b><br /><br />
                  </h3>
                </div>
              </div>

              <button className='btn-submit text-center' type="submit">SUBMIT</button>
            </form>


          </div>
        </div>
      </header>
    </div>

  );
}

export default App;
