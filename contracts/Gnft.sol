pragma solidity >=0.4.21 <0.7.0;

// SPDX-License-Identifier: MIT
//pragma solidity ^0.8.2;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract Gnft is ERC721Full {

    string[] public svgs;
    uint256[] public strengths;
    uint256[] public costs;
    uint256[] public types;
    uint256[] public rarities;
    mapping(string => bool) _svgExists;
    
    constructor() public ERC721Full("GamingNFT", "GNFT") {}
    
    function random() internal view returns (uint) {
        return uint8(uint256(keccak256(abi.encode(block.timestamp, block.difficulty))) % 1000) + 1;
    }
    
    function mint(string memory _svg) public {
        // does same svg exist already?
        require(!_svgExists[_svg]);
        
        // save svg in list of all svgs
        svgs.push(_svg);
        uint _id = svgs.length - 1;
        
        _safeMint(msg.sender, _id);
        _svgExists[_svg] = true;

        // generate features: strength, cost, typ, rarity
        uint rand = random();
        strengths.push(rand);
        costs.push(rand % 2);
        types.push(rand % 3);
        rarities.push(rand % 5);
    }

    function allowBuy(uint256 _tokenId, uint256 _price) external {
        require(msg.sender == ownerOf(_tokenId), 'Not owner of this token');
        require(_price > 0, 'Price zero');
        tokenIdToPrice[_tokenId] = _price;
    }

    function disallowBuy(uint256 _tokenId) external {
        require(msg.sender == ownerOf(_tokenId), 'Not owner of this token');
        tokenIdToPrice[_tokenId] = 0;
    }
    
    function buy(uint256 _tokenId) external payable {
        uint256 price = tokenIdToPrice[_tokenId];
        require(price > 0, 'This token is not for sale');
        require(msg.value == price, 'Incorrect value');
        
        address seller = ownerOf(_tokenId);
        _transfer(seller, msg.sender, _tokenId);
        tokenIdToPrice[_tokenId] = 0; // not for sale anymore
        payable(seller).transfer(msg.value); // send the ETH to the seller

        emit NftBought(seller, msg.sender, msg.value);
    }
}