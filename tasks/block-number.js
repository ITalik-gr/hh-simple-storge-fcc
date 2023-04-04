const { task } = require('hardhat/config')

task('block-number', 'Prints the current block number').setAction(
  // можна спочатку .addParam( ) додать щоб вказать що приймає наш такс якшо треба

  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Block number: ${blockNumber}`)
  }
)

module.exports = {

}