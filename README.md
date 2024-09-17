### Non-Fungible Tokens (NFTs)
The NFT is a digital asset representing real-world assets like art, music, in-game items, and videos. An NFT is created or “minted” from digital assets that represent tangible and intangible assets, including:  
- Arts 
- GIFs 
- Videos or sports clips 
- Collectibles 
- Virtual avatars and video game skins 
- Designer sneakers 
- Music
  
NFTs or Non-Fungible Token are currently taking the digital art and collectibles world by storm. Digital artists and content creators see their lives change due to significant sales to a new crypto-audience. Many big names are also joining this Nft train as they spot a brand new opportunity to connect with fans. But digital art is just a way to use NFTs. They will be accustomed to representing ownership of any unique asset, a deed for an item within the digital or physical realm. These things are not interchangeable with other items because they have unique properties.

NFTs are booming in 2022. This NFT boom era started last year in 2021, with pfp as nft format, then slowly shifted towards art and picture NFTs. We live in the age of in-game items, music NFTs, NFTs tickets, etc. Now Music artists prefer launching an nft of their new album rather than posting the music on streaming apps.

<img width="646" alt="image" src="https://github.com/user-attachments/assets/dfa7a20c-3517-4b46-8aef-0684dfd8df78">
<img width="672" alt="image" src="https://github.com/user-attachments/assets/72f2bf54-cba9-4b67-8f8b-0a476dea1fa4">

### Problem statement

The major problem with the hype about NFTs is the skyrocketing prices of these NFTs, making them difficult to follow, especially for people with average financial status. Moreover, most of the NFTs purchased end up sitting idle in the owner's wallet, i.e., without generating any yield for the owner. The only appreciation the owner receives on the NFT is when it resales at a higher price than when he bought it. Hence, we try to develop a solution that solves both the issues mentioned above.

Distribution of NFT in different categories:  

<img width="381" alt="image" src="https://github.com/user-attachments/assets/433615c1-8618-47cf-9bd0-75dc5142dbfc">

### Proposed Solution

Owners who wish to rent out their NFTs can list them on the platform by specifying the collateral amount, the daily rent charge, and the maximum number of days one can rent that NFT. The renters who come across a particular NFT of interest can then initiate the NFT renting process by specifying the number of days they wish to borrow the NFT. After depositing the collateral and renting charge, the collateral and renting amount is deposited into a smart contract, with the predefined terms of the contract. The ownership of the NFT is transferred to the renter and the renting charge to the lender. The renter then returns the NFT after the renting period and collects the collateral.

### Demo video for project

[Project Demo Video](https://drive.google.com/file/d/1rHLgUhHrhhn-G_JAJhO75F-Pb6-LYZCe/view)

### NFT Lifecycle for our app

<img width="447" alt="image" src="https://github.com/user-attachments/assets/bd728cfd-3e21-4771-ae1e-850019c447b9">


### Tech Stack

<img width="984" alt="image" src="https://github.com/user-attachments/assets/b31530b6-21e8-4a31-9c4a-bc7683d70938">

Related another repository: https://github.com/meetjain74/HardhatNFTRental

### Algorithms

#### Lend NFT
- Inputs: NFT, Number of Days, Due Date
- Approve contract address for NFT Transfer
- Transfer NFT from lender to contract address
  
<img width="951" alt="image" src="https://github.com/user-attachments/assets/bed6c385-d770-4c8a-ab73-562344815a3e">
<img width="972" alt="image" src="https://github.com/user-attachments/assets/d5d67bdc-bdd2-4b5b-a2de-c4024498cbbd">
<img width="979" alt="image" src="https://github.com/user-attachments/assets/8f751113-e0fc-4207-ba77-ba7d64f81592">
<img width="957" alt="image" src="https://github.com/user-attachments/assets/f286fab7-020e-4b21-9157-73ccf04a55ed">

#### Rent NFT
- Inputs: NFT, Number of Days, Payment
- Sufficient funds to be paid
- Should not rent for more number of days than available
- Transfer rent to lender
- Transfer NFT from contract address to borrower

<img width="974" alt="image" src="https://github.com/user-attachments/assets/3609a87b-a9d1-4cdc-bde5-d1b639f8b475">
<img width="971" alt="image" src="https://github.com/user-attachments/assets/6c7b7eb9-ce31-418b-a502-3e3c8f778b8e">
<img width="973" alt="image" src="https://github.com/user-attachments/assets/61476431-78b7-4321-86e8-983cc1721833">
<img width="964" alt="image" src="https://github.com/user-attachments/assets/748f7437-64d7-4aa1-aa1f-118d63ee6bf9">
<img width="965" alt="image" src="https://github.com/user-attachments/assets/6f86c022-48b8-4750-8226-e9cf37423810">

#### Stop Lend (Called by lender)

- Inputs: NFT
- Should not be already rented 
- Transfer NFT from contract address to lender

<img width="974" alt="image" src="https://github.com/user-attachments/assets/caeeee77-6d25-4e55-a47a-dbd462452e1e">
<img width="954" alt="image" src="https://github.com/user-attachments/assets/b9980ea3-4c5a-47a5-a487-3a846959779a">

#### Claim collateral (Called by lender)

- Inputs: NFT
- Transfer collateral to lender

<img width="972" alt="image" src="https://github.com/user-attachments/assets/f1be945f-3b82-4bda-bda8-e207b6d54a45">
<img width="963" alt="image" src="https://github.com/user-attachments/assets/78cfb373-be2f-41b2-8cb5-0b93d7f52d25">

#### Return NFT (Called by borrower)

- Inputs: NFT
- Transfer collateral to borrower
- Transfer NFT to either contract address or lender address depending on time

<img width="966" alt="image" src="https://github.com/user-attachments/assets/81373bef-75fd-44a3-b38b-bddbc1ad014d">
<img width="955" alt="image" src="https://github.com/user-attachments/assets/57008154-84d3-4acc-9eff-bf2be1b1f7dd">
<img width="959" alt="image" src="https://github.com/user-attachments/assets/e31a0d7c-9e4e-44bf-b8fa-36821e231dc8">

### OTT Subscription Use case

If netflix subscription is given as NFT then any user can lend his subscription when he is not watching and another person can rent the subscription only for the number of days needed. 

<img width="497" alt="image" src="https://github.com/user-attachments/assets/b0f14150-3eba-4b51-a1ef-2cb52a4661f0">

### Revenue Model

- Lending Charge: Lending your nft to the platform may be charged in order to generate revenue. 
- Late Fee: If borrower of the nft is delinquent, we may impose a late fee on the renter. 

### Future Scope

- Credit score
- Capped collateral
- Buy recommendation
- Rent bidding



