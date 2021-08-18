/* eslint-disable comma-dangle */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
const hre = require('hardhat');
const { ethers } = require('hardhat');
const { deployed } = require('./SmyToken-deployed');

const CONTRACT_NAME = 'SmyToken';
const INITIAL_SUPPLY = ethers.utils.parseEther('1000000');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // Optionnel car l'account deployer est utilisé par défaut
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  // We get the Token contract to deploy
  const SmyToken = await hre.ethers.getContractFactory(CONTRACT_NAME);
  const smyToken = await SmyToken.deploy(INITIAL_SUPPLY, deployer.address);

  // Attendre que le contrat soit réellement déployé, cad que la transaction de déploiement
  // soit incluse dans un bloc
  await smyToken.deployed();

  // update deployed.json and print usefull information on the console.
  await deployed(CONTRACT_NAME, hre.network.name, smyToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
