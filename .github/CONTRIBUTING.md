# Contributing to the Documentation

## Contribution Process

1. **Branching:** Always open Pull Requests against the `main` branch.
2. **Reviews:** Request reviews per our usual way of working.

## Guidelines

The following guidelines are meant to help maintain high-quality, consistent, and user-friendly documentation while keeping the maintenance burden as low as reasonably possible.

The value of our documentation lies in providing a well-structured, comprehensive knowledge hub, reducing the need for users to search across various resources. This requires clearly defined categories and well-organized content that equips users with the necessary knowledge in an accessible and logical order.

### Target Audience

Consider the knowledge level of your audience. Here are some examples:
- **Non technical readers:** Avoid excessive detail. Provide insightful yet high-level, easily digestible overviews and content.
- **Technical Beginners:** Provide detailed explanations and examples. Avoid assuming prior knowledge.
- **Technical Advanced Users:** Be concise and focus on key details. Avoid over-explaining concepts they likely already understand.

### Current Target Audiences

We have distinguished content placement through different docs and sub-sections within them:

#### Learn docs

This serves as the general documentation hub for all user groups, covering general topics that don't fit into specific docs like smart contract programming or node operations.

##### Learn section

Targeted at non-technical readers and newcomers i.e., primarily end-users that use Dusk by being holders, consumers etc. Focus on concise, high-level, and easily understandable content. When applicable, mention not only the "what" but also the "why" — especially the reasons behind it and the **benefits** for Dusk and its users.

##### Deep Dive section

For advanced users from any background who are interested in highly detailed, technical, or conceptual information related to Dusk and its concepts, hence the term "deep dive." This section can also include pages that mostly reference external content like the Dusk-protocol writings.

#### Developer docs

These docs are for developers who want to build on Dusk, whether by creating on-chain smart contracts or integrating Dusk’s technology into their projects.

##### Smart Contracts section

For both beginner and advanced users who want to develop smart contracts on Dusk.

##### Integrations section

For beginner and advanced users who want to integrate the Dusk blockchain into their applications. This section also includes information for smart contract developers seeking specific integration features like from execution-core.

#### Node docs

These docs are for both beginner and advanced users who want to run a Dusk node, stake, contribute to consensus, and explore related topics.

#### Grants docs

These docs are for users interested in participating in the grant program and actively developing something for or on Dusk.

### Avoid Redundancy

- **Cross-Referencing:** Avoid duplicating content across the documentation. Use cross-references where necessary.
- **External References:** Link to the original source when referencing larger external content instead of copying it.
- **Source Prioritization:** For (technical) topics that may be subject to change, always reference the most direct and authoritative source (often the original or primary source) to minimize maintenance burdens.

### Conciseness

- **Clarity:** Ensure content is straightforward and direct.
- **Examples & Illustrations:** Where applicable use or refer to examples and illustrations to clarify complex concepts.
- **Terminology:** Limit the use of niche or overly technical terms. When necessary, explain them clearly or add them to the Glossary.

### Content Structure

- **Article Size:** Prefer large articles over multiple small pages to keep the structure clean.
- **Table of Contents:** Ensure each page includes a table of contents for easy navigation.
- **Section Placement:** Categorize new content correctly based on the target audience and topic.
- **Page Data:** Always add title and description to the beginning of the page.
- **Search Optimization:** Add "Dusk" as a context keyword in the **description** sentences where possible (SEO relevant).
    - For example: "Run a Provisioner" could be "Run a Dusk Provisioner" or "Run a Provisioner on Dusk".

### Content & Tone of Voice

- **Language Consistency:** Use American English.
- **Adapt to the Audience:** Adapt the tone according to the target audience. Maintain a professional yet approachable and including tone.
- **Conversational & Including:** Use "we" where applicable (e.g., in guides), to make the documentation feel more conversational and inclusive of the reader.
- **Abbreviations:** Introduce terms in expanded form first, followed by the abbreviation in parentheses (e.g., Decentralized Finance (DeFi)). Use the abbreviation consistently thereafter.

### Formatting

- **Headers & Titles:** Use consistent header levels and title casing.
- **Code Snippets:** Include code snippets where applicable, formatted with backticks.
- **Highlighting:** Prefer bold for emphasis but use it sparingly. Use backticks for code functions, file names, and paths.
