const PaymentContract = artifacts.require("PaymentContract");
const paymentTokenAddress = "0xA82EAf2c0e8100ECaB913A601f652F7C4151c549";

module.exports = function (deployer, network, addresses) {
  if (network === "development") {
    deployer.deploy(PaymentContract, paymentTokenAddress);
  } else if (network === "matic") {
    deployer.deploy(PaymentContract, paymentTokenAddress);
  }
};
