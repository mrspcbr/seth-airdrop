import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import {
  useConnect,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import contractInterface from '../contract-abi.json';

const contractConfig = {
  addressOrName: '0xAD8E4AB03391fc3465a18fBd72dE37C455EA317b',
  contractInterface: contractInterface,
};

const Home: NextPage = () => {
  const { isConnected } = useConnect();

  const {
    data: mintData,
    write: claimTokens,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
  } = useContractWrite(contractConfig, 'claimTokens');

  const { isSuccess: txSuccess } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const isMinted = txSuccess;

  return (
    <div className="page">
      <div className="container">
        <div style={{ flex: '1 1 auto' }}>
          <div>
            <h1 style={{ fontFamily: 'sans-serif' }}>$SETH Airdrop Claim</h1>
            <p style={{ margin: '12px 0 24px', fontFamily: 'sans-serif' }}>
              Claim your $SETH Airdrops by connecting your wallet & clicking claim! Be sure to use the wallet that you used to send in the SOY tokens!
            </p>
            <ConnectButton />
            {isConnected && !isMinted && (
              <button
                style={{ marginTop: 24 }}
                disabled={isMintLoading || isMintStarted}
                className="button"
                data-mint-loading={isMintLoading}
                data-mint-started={isMintStarted}
                onClick={() => claimTokens()}
              >
                {isMintLoading && 'Checking your Airdrop...'}
                {isMintStarted && 'Claiming...'}
                {!isMintLoading && !isMintStarted && 'Claim $SETH Airdrop'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
