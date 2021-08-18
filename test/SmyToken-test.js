const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('SmyToken contract', async () => {
  const CONTRACT_NAME = 'SmyToken';
  const SYMBOL = 'SMY';
  const TOTAL_SUPPLY = ethers.utils.parseEther('1000000');
  const INITIAL_SUPPLY = '1000000';
  const ZERO_ADDRESS = ethers.constants.AddressZero;
  let SmyToken, smyToken, owner, dev;

  beforeEach(async () => {
    [owner, dev] = await ethers.getSigners();
    SmyToken = await ethers.getContractFactory(CONTRACT_NAME);
    smyToken = await SmyToken.connect(owner).deploy(INITIAL_SUPPLY);
    await smyToken.deployed();
  });

  describe('Deployment', () => {
    it(`Should have name ${CONTRACT_NAME} & symbol ${SYMBOL} when created`, async () => {
      expect(await smyToken.name()).to.equal(CONTRACT_NAME);
      expect(await smyToken.symbol()).to.equal(SYMBOL);
    });

    it(`Should have total supply ${TOTAL_SUPPLY.toString()}`, async function () {
      expect(await smyToken.totalSupply()).to.equal(TOTAL_SUPPLY);
    });

    it('Should assign the total supply of tokens to the owner', async () => {
      expect(await smyToken.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY);
    });

    it('Should emit a Transfer event', async () => {
      expect(smyToken.deployTransaction)
        .to.emit(smyToken, 'Transfer')
        .withArgs(ZERO_ADDRESS, owner.address, TOTAL_SUPPLY);
    });
  });
});
