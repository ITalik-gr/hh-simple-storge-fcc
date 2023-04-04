const {ethers} = require('hardhat');
const {expect, assert} = require('chai');

describe("SimpleStorage", () => {
  let SimpleStorageFactory;
  let c;
  beforeEach(async function() {
    SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');

    c = await SimpleStorageFactory.deploy()
  })

  it("Should start with favorit number 0", async function () {
    const currentValue = await c.retrieve(); 
    const expectedValue = '0';

    assert.equal(currentValue.toString(), expectedValue); // equal(1 аргумент порівнюється з 2)
    // expect(currentValue.toString()).to.eq(expectedValue); 
  })
  it("Should update when we call store", async function() {
    const expectedValue = '7';
    const txResponse = await c.store(expectedValue);
    await txResponse.wait(1);

    const currentValue = await c.retrieve();
    assert.equal(currentValue.toString(), expectedValue)
  })
})