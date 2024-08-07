const defaultSidebar = [
    { label: 'Overview', link: '/learn/overview' },
    {
        label: 'Learn Dusk',
        items: [
            { label: "Introduction", link: 'learn/introduction' },
            { label: 'Core Values', link: 'learn/core-values' },
            { label: "Block Explorer", link: "learn/block-explorer" },
            { label: "Tokenomics", link: 'learn/tokenomics' },
            { label: "Transaction Fees & Gas", link: 'learn/tx-fees' },
            { label: "Transaction Models", link: 'learn/tx-models' },
            { label: "ZK Crypto", link: 'learn/zk-crypto' },
            { label: "Community", link: "learn/community" },
        ],
    },
    {
        label: "FAQ & Guides",
        items: [
            { label: "Wallet Guide", link: "404" },
            { label: "Dusk-ERC20 Staking", link: "/learn/guides/erc20-staking/" },
            { label: "BEP2 migration", link: "/learn/guides/bep2-migration/" },
        ],
    },
    {
        label: "Deep Dive",
        items: [
            {
                label: 'Transaction Models',
                items: [
                    { label: "Phoenix", link: 'learn/deep-dive/transaction_models/phoenix' },
                    { label: "Moonlight", link: 'learn/deep-dive/transaction_models/moonlight' },
                    { label: "Zedger", link: 'learn/deep-dive/transaction_models/zedger' },
                ],
                collapsed: true,
            },
            {
                label: 'Cryptography',
                items: [
                    { label: "IOP and PCS", link: 'learn/deep-dive/cryptography/iop_pcs' },
                    { label: "PLONK", link: 'learn/deep-dive/cryptography/plonk' },
                    { label: "KZG", link: 'learn/deep-dive/cryptography/kzg' },
                    { label: "BLS12-381", link: 'learn/deep-dive/cryptography/bls' },
                ],
                collapsed: true,
            },
            {
                label: 'Assets & Regulations',
                items: [
                    { label: "MiCA", link: 'learn/deep-dive/assets-and-regulations/mica' },
                    { label: "Security Lifecycle", link: 'learn/deep-dive/assets-and-regulations/lifecycle' },
                    { label: "Security Dematerialization", link: 'learn/deep-dive/assets-and-regulations/dematerialization' },

                ],
                collapsed: true,
            },
            { label: "Economic Protocol", link: 'learn/deep-dive/economic-protocol' },
            { label: "Succinct Attestation Consensus", link: 'learn/deep-dive/succinct-attestation' },
            { label: "Additional Resources", link: 'learn/deep-dive/additional-resources' },
        ],
        collapsed: true,
    },
];

export default defaultSidebar;