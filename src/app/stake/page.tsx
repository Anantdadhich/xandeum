'use client'

import { useState, useEffect } from 'react'
import {
    Coins,
    ArrowRight,
    TrendingUp,
    Clock,
    Shield,
    Wallet,
    CheckCircle,
    XCircle,
    ExternalLink
} from 'lucide-react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import {
    LAMPORTS_PER_SOL,
    PublicKey,
    Transaction,
    StakeProgram,
    Authorized,
    Lockup,
    Keypair,
    SystemProgram
} from '@solana/web3.js'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

// Devnet validators to stake to
const DEVNET_VALIDATORS = [
    {
        name: 'Devnet Validator 1',
        pubkey: 'FwR3PbjS5iyqzLiLugrBqKSa5EKZ4vK9SKs7eQXtT59f',
        commission: 10
    },
    {
        name: 'Devnet Validator 2',
        pubkey: 'GkqYQysEGmuL6V2AJoNnWZUz2ZBGWhzQXsJiXm2CLZPL',
        commission: 8
    }
]

interface StakingInfo {
    apy: number
    exchangeRate: number
    totalStaked: number
    validators: number
    epoch: number
    minStake: number
}

type TxStatus = 'idle' | 'building' | 'signing' | 'confirming' | 'success' | 'error'

export default function StakePage() {
    const { connection } = useConnection()
    const { publicKey, connected, sendTransaction, signTransaction } = useWallet()
    const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake')
    const [amount, setAmount] = useState<string>('')
    const [stakingInfo, setStakingInfo] = useState<StakingInfo>({
        apy: 0,
        exchangeRate: 1.0,
        totalStaked: 0,
        validators: 0,
        epoch: 0,
        minStake: 0.01,
    })
    const [balance, setBalance] = useState<number>(0)
    const [selectedValidator, setSelectedValidator] = useState(DEVNET_VALIDATORS[0])
    const [txStatus, setTxStatus] = useState<TxStatus>('idle')
    const [txSignature, setTxSignature] = useState<string | null>(null)
    const [txError, setTxError] = useState<string | null>(null)

    // Fetch real epoch info from Solana RPC
    useEffect(() => {
        async function fetchEpochInfo() {
            try {
                const epochInfo = await connection.getEpochInfo()
                const voteAccounts = await connection.getVoteAccounts()

                // Calculate approximate APY based on Solana's inflation schedule
                // Current inflation ~5-6% annual, validators take ~5% commission avg
                const estimatedApy = 6.5 // Approximate Devnet APY

                setStakingInfo({
                    apy: estimatedApy,
                    exchangeRate: 1.0 + (epochInfo.epoch * 0.0001), // Simulated exchange rate growth
                    totalStaked: voteAccounts.current.reduce((acc, v) => acc + v.activatedStake, 0) / 1e9,
                    validators: voteAccounts.current.length,
                    epoch: epochInfo.epoch,
                    minStake: 0.01,
                })
            } catch (e) {
                console.error('Failed to fetch epoch info:', e)
            }
        }
        fetchEpochInfo()
    }, [connection])

    useEffect(() => {
        if (publicKey) {
            connection.getBalance(publicKey).then((lamports) => {
                setBalance(lamports / LAMPORTS_PER_SOL)
            }).catch(console.error)
        } else {
            setBalance(0)
        }
    }, [publicKey, connection])

    const solBalance = balance
    const outputAmount = amount ? (parseFloat(amount) * 0.98).toFixed(6) : '' // 2% for rent-exempt reserve

    const handleStake = async () => {
        if (!connected || !publicKey || !signTransaction) {
            setTxError('Wallet not connected')
            return
        }

        const stakeAmount = parseFloat(amount)
        if (isNaN(stakeAmount) || stakeAmount < stakingInfo.minStake) {
            setTxError(`Minimum stake is ${stakingInfo.minStake} SOL`)
            return
        }

        if (stakeAmount > balance - 0.01) { // Reserve for tx fee
            setTxError('Insufficient balance')
            return
        }

        try {
            setTxStatus('building')
            setTxError(null)
            setTxSignature(null)

            // Create a new stake account keypair
            const stakeAccount = Keypair.generate()
            const lamports = stakeAmount * LAMPORTS_PER_SOL
            const validatorPubkey = new PublicKey(selectedValidator.pubkey)

            // Get minimum balance for rent exemption
            const minimumRent = await connection.getMinimumBalanceForRentExemption(StakeProgram.space)
            const totalLamports = lamports + minimumRent

            // Create stake account instruction
            const createStakeAccountIx = StakeProgram.createAccount({
                fromPubkey: publicKey,
                stakePubkey: stakeAccount.publicKey,
                authorized: new Authorized(publicKey, publicKey),
                lockup: new Lockup(0, 0, publicKey),
                lamports: totalLamports
            })

            // Delegate stake instruction
            const delegateIx = StakeProgram.delegate({
                stakePubkey: stakeAccount.publicKey,
                authorizedPubkey: publicKey,
                votePubkey: validatorPubkey
            })

            // Build transaction
            const transaction = new Transaction()
            transaction.add(createStakeAccountIx)
            transaction.add(delegateIx)

            // Get recent blockhash
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized')
            transaction.recentBlockhash = blockhash
            transaction.feePayer = publicKey

            // Sign with stake account keypair
            transaction.partialSign(stakeAccount)

            setTxStatus('signing')

            // Send transaction
            const signature = await sendTransaction(transaction, connection, {
                signers: [stakeAccount]
            })

            setTxStatus('confirming')
            setTxSignature(signature)

            // Wait for confirmation
            const confirmation = await connection.confirmTransaction({
                signature,
                blockhash,
                lastValidBlockHeight
            }, 'confirmed')

            if (confirmation.value.err) {
                throw new Error('Transaction failed')
            }

            setTxStatus('success')
            setAmount('')

            // Refresh balance
            const newBalance = await connection.getBalance(publicKey)
            setBalance(newBalance / LAMPORTS_PER_SOL)

        } catch (err: any) {
            console.error('Staking error:', err)
            setTxStatus('error')
            setTxError(err.message || 'Transaction failed')
        }
    }

    const handleUnstake = async () => {
        // For demo purposes, show that unstaking requires waiting for epoch
        setTxError('Unstaking requires deactivation and waiting for the epoch to end. This is a demo on Devnet.')
        setTxStatus('error')
    }

    const resetTxState = () => {
        setTxStatus('idle')
        setTxSignature(null)
        setTxError(null)
    }

    const getStatusMessage = () => {
        switch (txStatus) {
            case 'building': return 'Building transaction...'
            case 'signing': return 'Please sign in your wallet...'
            case 'confirming': return 'Confirming on-chain...'
            case 'success': return 'Stake successful!'
            case 'error': return txError || 'Transaction failed'
            default: return null
        }
    }

    return (
        <div className="min-h-screen py-12">
            <div className="container-main max-w-lg mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">Stake SOL</h1>
                    <p className="text-[var(--foreground-muted)] max-w-md mx-auto">
                        Stake your SOL to earn {stakingInfo.apy}% APY on Devnet. Real native Solana staking.
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14F195]/10 border border-[#14F195]/30">
                        <div className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
                        <span className="text-xs font-medium text-[#14F195]">DEVNET</span>
                    </div>
                </div>

                {/* Staking Card */}
                <div className="glass-card p-6 md:p-8 space-y-6 relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 blur-[100px] pointer-events-none" />

                    {/* Tabs */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-[var(--background)] rounded-xl">
                        {(['stake', 'unstake'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); resetTxState(); }}
                                className={`py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === tab
                                    ? 'bg-[var(--card)] text-white shadow-lg'
                                    : 'text-[var(--foreground-muted)] hover:text-white'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Validator Selection */}
                    {activeTab === 'stake' && (
                        <div className="space-y-2">
                            <label className="text-sm text-[var(--foreground-muted)]">Select Validator</label>
                            <div className="grid grid-cols-2 gap-2">
                                {DEVNET_VALIDATORS.map((v) => (
                                    <button
                                        key={v.pubkey}
                                        onClick={() => setSelectedValidator(v)}
                                        className={`p-3 rounded-xl text-left transition-all ${selectedValidator.pubkey === v.pubkey
                                            ? 'bg-[var(--accent-subtle)] border-2 border-[var(--accent)]'
                                            : 'bg-[var(--background)] border border-[var(--card-border)] hover:border-[var(--accent)]/50'
                                            }`}
                                    >
                                        <div className="text-sm font-medium text-white">{v.name}</div>
                                        <div className="text-xs text-[var(--foreground-muted)]">{v.commission}% fee</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <label className="text-[var(--foreground-muted)]">
                                    {activeTab === 'stake' ? 'You stake' : 'You unstake'}
                                </label>
                                <span className="text-sm text-[var(--foreground-muted)]">
                                    Balance: {solBalance.toFixed(4)} SOL
                                </span>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--background)]">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#14F195] flex items-center justify-center text-black font-bold text-xs">SOL</div>
                                    <span className="font-bold text-white">SOL</span>
                                </div>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => { setAmount(e.target.value); resetTxState(); }}
                                    placeholder="0.00"
                                    min={stakingInfo.minStake}
                                    step="0.01"
                                    className="flex-1 bg-transparent text-right text-2xl font-bold text-white placeholder:text-[var(--foreground-muted)] focus:outline-none"
                                />
                            </div>

                            {/* Quick Percentages */}
                            <div className="flex justify-end gap-2">
                                {[25, 50, 75, 100].map((percent) => (
                                    <button
                                        key={percent}
                                        onClick={() => {
                                            const maxUsable = Math.max(0, solBalance - 0.01) // Reserve for fees
                                            setAmount(((maxUsable * percent) / 100).toFixed(4))
                                            resetTxState()
                                        }}
                                        className="px-2 py-1 rounded text-xs font-medium text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-colors"
                                    >
                                        {percent}%
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center text-[var(--foreground-muted)]">
                            <ArrowRight className="w-6 h-6 rotate-90" />
                        </div>

                        {/* Output Preview */}
                        <div className="p-4 rounded-xl bg-[var(--background)] text-center">
                            <p className="text-sm text-[var(--foreground-muted)] mb-1">
                                {activeTab === 'stake' ? 'Staked Amount (after rent reserve)' : 'You receive'}
                            </p>
                            <p className="text-2xl font-bold text-white">
                                {outputAmount || '0.00'} SOL
                            </p>
                        </div>
                    </div>

                    {/* Transaction Status */}
                    {txStatus !== 'idle' && (
                        <div className={`p-4 rounded-xl flex items-center gap-3 ${txStatus === 'success' ? 'bg-[#14F195]/10 border border-[#14F195]/30' :
                            txStatus === 'error' ? 'bg-red-500/10 border border-red-500/30' :
                                'bg-[var(--accent-subtle)] border border-[var(--accent)]/30'
                            }`}>
                            {txStatus === 'success' && <CheckCircle className="w-5 h-5 text-[#14F195]" />}
                            {txStatus === 'error' && <XCircle className="w-5 h-5 text-red-400" />}
                            {['building', 'signing', 'confirming'].includes(txStatus) && (
                                <div className="w-5 h-5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                            )}
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${txStatus === 'success' ? 'text-[#14F195]' : txStatus === 'error' ? 'text-red-400' : 'text-white'}`}>
                                    {getStatusMessage()}
                                </p>
                                {txSignature && (
                                    <a
                                        href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1 mt-1"
                                    >
                                        View on Explorer <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    {connected ? (
                        <button
                            onClick={activeTab === 'stake' ? handleStake : handleUnstake}
                            disabled={!amount || parseFloat(amount) <= 0 || ['building', 'signing', 'confirming'].includes(txStatus)}
                            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Wallet className="w-5 h-5" />
                            {['building', 'signing', 'confirming'].includes(txStatus)
                                ? 'Processing...'
                                : (activeTab === 'stake' ? 'Stake SOL' : 'Unstake')}
                        </button>
                    ) : (
                        <div className="flex justify-center">
                            <WalletMultiButton style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--accent)', color: 'black', borderRadius: '12px', height: '56px', fontSize: '18px', fontWeight: 'bold' }} />
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass-card p-4 text-center">
                        <TrendingUp className="w-6 h-6 text-[#14F195] mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{stakingInfo.apy}%</div>
                        <div className="text-xs text-[var(--foreground-muted)]">APY</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <Coins className="w-6 h-6 text-[var(--accent)] mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">15.4M</div>
                        <div className="text-xs text-[var(--foreground-muted)]">TVL (SOL)</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <Clock className="w-6 h-6 text-[#A855F7] mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">~4h</div>
                        <div className="text-xs text-[var(--foreground-muted)]">Next Epoch</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <Shield className="w-6 h-6 text-[#3B82F6] mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{stakingInfo.validators}</div>
                        <div className="text-xs text-[var(--foreground-muted)]">Validators</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
