const defaultSidebar = [
  { label: "Overview", link: "/learn/overview" },
  {
    label: "Learn Dusk",
    items: [
      { label: "Introduction", link: "learn/introduction" },
      { label: "Core Values", link: "learn/core-values" },
      { label: "Core Components", link: "learn/core-components" },
      { label: "Block Explorer", link: "learn/block-explorer" },
      { label: "Tokenomics", link: "learn/tokenomics" },
      { label: "Transaction Fees & Gas", link: "learn/tx-fees" },
      { label: "Transaction Models", link: "learn/tx-models" },
      { label: "Token Standards", link: "learn/token-standards" },
      { label: "Get involved & Community", link: "learn/community" },
      { label: "Glossary", link: "learn/glossary" },
    ],
  },
  {
    label: "FAQ & Guides",
    items: [
      { label: "Dusk-ERC20 Staking", link: "/learn/guides/erc20-staking/" },
      { label: "BEP2 migration", link: "/learn/guides/bep2-migration/" },
      { label: "Restore Block Height", link: "/learn/guides/restore-height/" },
    ],
  },
  {
    label: "Deep Dive",
    items: [
      { label: "Introduction", link: "learn/deep-dive/introduction" },
      {
        label: "Transaction Models",
        items: [
          {
            label: "Transactions",
            link: "learn/deep-dive/transaction_models/transactions",
          },
          {
            label: "Phoenix",
            link: "learn/deep-dive/transaction_models/phoenix",
          },
          {
            label: "Moonlight",
            link: "learn/deep-dive/transaction_models/moonlight",
          },
          {
            label: "Zedger",
            link: "learn/deep-dive/transaction_models/zedger",
          },
        ],
        collapsed: true,
      },
      {
        label: "Cryptography",
        items: [
          {
            label: "Zero Knowledge Proofs",
            link: "learn/deep-dive/cryptography/zkp",
          },
          { label: "Circuits", link: "learn/deep-dive/cryptography/circuits" },
          {
            label: "IOP and PCS",
            link: "learn/deep-dive/cryptography/iop_pcs",
          },
          { label: "PLONK", link: "learn/deep-dive/cryptography/plonk" },
          { label: "KZG", link: "learn/deep-dive/cryptography/kzg" },
          { label: "BLS12-381", link: "learn/deep-dive/cryptography/bls" },
          { label: "Hashing", link: "learn/deep-dive/cryptography/hashing" },
        ],
        collapsed: true,
      },
      {
        label: "Assets & Regulations",
        items: [
          {
            label: "MiCA",
            link: "learn/deep-dive/assets-and-regulations/mica",
          },
          {
            label: "Security Lifecycle",
            link: "learn/deep-dive/assets-and-regulations/lifecycle",
          },
          {
            label: "Security Dematerialization",
            link: "learn/deep-dive/assets-and-regulations/dematerialization",
          },
        ],
        collapsed: true,
      },
      { label: "Economic Protocol", link: "learn/deep-dive/economic-protocol" },
      { label: "Piecrust VM", link: "learn/deep-dive/piecrust" },
      {
        label: "Succinct Attestation Consensus",
        link: "learn/deep-dive/succinct-attestation",
      },
      {
        label: "Additional Resources",
        link: "learn/deep-dive/additional-resources",
      },
    ],
    collapsed: true,
  },
];

export default defaultSidebar;