// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount = 0;
    event Transfer(
        address from,
        address receiver,
        uint256 amount,
        uint256 timestamp,
        string message
    );

    // transferStruct
    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        uint256 timestamp;
        string message;
    }

    // array of transactions
    TransferStruct[] transactions;

    function addToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message
    ) public {
        transactionCount += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                block.timestamp,
                message
            )
        );
        emit Transfer(msg.sender, receiver, amount, block.timestamp, message);
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
