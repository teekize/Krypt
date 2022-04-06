// https://eth-rinkeby.alchemyapi.io/v2/sFVOgjHPJhvfBL65DsD_DktSTNrxy21d

require("@nomiclabs/hardhat-waffle");

module.exports={
  solidity:"0.8.0",
  networks:{
    rinkeby:{
      url:"https://eth-rinkeby.alchemyapi.io/v2/sFVOgjHPJhvfBL65DsD_DktSTNrxy21d",
      accounts:["2cec49e74ad791be6b5c86262a27029436d63eb19924931bd203f01953f7262e"]
    }
  }

}
