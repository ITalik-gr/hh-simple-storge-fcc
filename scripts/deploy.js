

// import

const { ethers, run, network } = require('hardhat'); // з хардехету витягн ethers.js


// func main()
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage'); // фактори контракта по назві
  console.log('Deploying...');
  const simpleStorage = await SimpleStorageFactory.deploy(); 
  await simpleStorage.deployed(); // ждем розгортання
  // для розгортання можна не вказувати валет, прайват кей, лінк на блокчейн, тоді воно розгортає в своєму хардхетовськом
  console.log(`Deployed contract to: ${simpleStorage.address}`)

  if (network.config.chainId === 4 && process.env.PRIVATE_KEY) {
    console.log('Tyt if gryz')
    await simpleStorage.deployTransaction.wait(6); // чекаєм 6 блоків
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`CrrVall: ${currentValue}`)

  // change crrval

  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);

  const updatedValue = await simpleStorage.retrieve();
  console.log(`CrrVall: ${updatedValue}`)

}



// etherscan verify
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}

// main()

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })