#Setup Project
1. install truffle compiler (v5.4.3) `install npm@5.4.3`
2. install ganache (GUI)
    1. add truffle config within "contract" tab in ganache by adding truffle-config.js
    2. make sure port is set as seen in the truffle-config.js
  
3. install chrome extension <b>metaMask</b> and add the ganache network as RPC network
  
    ![picture alt](./vapp/src/assets/readme/metaMaskRPC.PNG)
   
4. Install dependencies inside the root folder of this project with `npm install`
4. Migrate contract by running the command `truffle migrate` within the root folder of this project
5. Run Vue application by moving to the vapp directory `cd vapp` followed by `npm run serve`
6. Open the Webapp (default localhost:8080)
7. Connect ganache Accounts to Metamask by importing the private key from ganache
   ![picture alt](./vapp/src/assets/readme/importAccountToMetamask.PNG)
   
Showcase of application
![picture alt](./vapp/src/assets/readme/showcase.gif "Showcase")