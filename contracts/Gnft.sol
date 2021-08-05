pragma solidity >=0.4.21 <0.7.0;

// SPDX-License-Identifier: MIT
//pragma solidity ^0.8.2;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract Gnft is ERC721Full {

    string[] public svgs;
    mapping(string => bool) _svgExists;
    
    constructor() public ERC721Full("GamingNFT", "GNFT") {}
    
    function mint(string memory _svg) public {
        // does same svg exist already?
        require(!_svgExists[_svg]);
        
        // save svg in list of all svgs
        svgs.push(_svg);
        uint _id = svgs.length - 1;
        
        _safeMint(msg.sender, _id);
        _svgExists[_svg] = true;
    }
}