const Gnft = artifacts.require('./Gnft.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Gnft', (accounts) => {
  let contract

  before(async () => {
    contract = await Gnft.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'GamingNFT')
    })

    it('has a symbol', async () => {
      const symbol = await contract.symbol()
      assert.equal(symbol, 'GNFT')
    })

  })

  describe('minting', async () => {

    
    it('creates a new token', async () => {
      let j = '<svg class="svg-icon" viewBox="0 0 20 20"><path d="M17.218,2.268L2.477,8.388C2.13,8.535,2.164,9.05,2.542,9.134L9.33,10.67l1.535,6.787c0.083,0.377,0.602,0.415,0.745,0.065l6.123-14.74C17.866,2.46,17.539,2.134,17.218,2.268 M3.92,8.641l11.772-4.89L9.535,9.909L3.92,8.641z M11.358,16.078l-1.268-5.613l6.157-6.157L11.358,16.078z"></path></svg>'
      const result = await contract.mint(j)
      const totalSupply = await contract.totalSupply()
      // SUCCESS
      assert.equal(totalSupply, 1)
      const event = result.logs[0].args
      assert.equal(event.tokenId.toNumber(), 0, 'id is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
      assert.equal(event.to, accounts[0], 'to is correct')

      // FAILURE: cannot mint same color twice
      await contract.mint(j).should.be.rejected;
    })
  })

  describe('indexing', async () => {
    it('lists gnfts', async () => {
      // Mint 3 more tokens
      await contract.mint('1')
      await contract.mint('2')
      await contract.mint('3')
      const totalSupply = await contract.totalSupply()

      let svg
      let result = []

      for (var i = 2; i <= totalSupply; i++) {
        svg = await contract.svgs(i - 1)
        result.push(svg)
      }

      let expected = ['1', '2', '3']
      assert.equal(result.join(','), expected.join(','))
    })
  })
  describe('allowBuy', async () => {


    it('allows tokens to be buyed', async () => {
      const account0 = '0xA8396C0D3Df03e909a114e217891a6f44C55c605';
      const account1 = '0xE8AA202DbfB3c4bAff15bE72A44B82b698efE99F';
      const result = await contract.mint('abc')
      const totalSupply = await contract.isApprovedForAll('0xA8396C0D3Df03e909a114e217891a6f44C55c605','0xE8AA202DbfB3c4bAff15bE72A44B82b698efE99F')
      // SUCCESS
      assert.equal(totalSupply, true)
      const event = result.logs[0].args
      assert.equal(event.tokenId.toNumber(), 0, 'id is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
      assert.equal(event.to, accounts[0], 'to is correct')

      // FAILURE: cannot mint same color twice
      await contract.mint(j).should.be.rejected;
    })
  })

})