const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "TokenMaster"
  const SYMBOL = "TM"

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster")
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)
  await tokenMaster.deployed()

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`)

  // List 6 events
  const occasions = [
    {
      name: "UFC Miami",
      cost: tokens(3),
      tickets: 0,
      date: "May 31",
      time: "6:00PM EST",
      location: "Miami-Dade Arena - Miami, FL"
    },
    {
    name: "Men's Asia Cup Hockey",
    cost: tokens(3),
    tickets: 0,
    date: "August 27 - September 7",
    time: "TBD",
    location: "Rajgir, Bihar, India"
    },
    {
      name: "ETH Privacy Hackathon",
      cost: tokens(0.25),
      tickets: 200,
      date: "9 December 2025",
      time: "10:00AM TRT",
      location: "Turkey, Istanbul"
    },
    {
    name: "ICC Women's Cricket World Cup",
    cost: tokens(3),
    tickets: 0,
    date: "February - March 2026",
    time: "TBD",
    location: "Bengaluru, Guwahati, Indore, Visakhapatnam, India"
    },
    {
    name: "Raksha Bandhan Festival",
    cost: tokens(3),
    tickets: 0,
    date: "August 9",
    time: "All Day",
    location: "Nationwide, India"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});