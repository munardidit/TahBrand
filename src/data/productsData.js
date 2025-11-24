// src/data/productsData.js
import pjstacked from '../assets/pjstacked.png';
import pinktoteshowcase from '../assets/Pinktoteshowcase.png';
import blacktote from '../assets/blacktote.png';
import lifestyletotebag from '../assets/Lifestyletotebag.png';
import bhoodie from '../assets/Bhoodie.png';
import blacktote2 from '../assets/blacktotenewmerch.png';
import pjhang from '../assets/pjhang.png';
import redhood from '../assets/redhood.png';
import pinktote2nd from '../assets/pinktote2nd.png';

export const productsData = [
  {
    id: 1,
    name: 'TAH Christmas Pyjamas',
    price: 'USD 10',
    images: [pjstacked, pjhang], // array with 1 image
    type: 'hoodie',
    color: 'Orange',
    category: 'Apparels',
  },
  {
    id: 2,
    name: 'Black TAH Hoodie',
    price: 'USD 10',
    images: [pinktoteshowcase, pinktote2nd], // multiple images
    type: 'hoodie',
    color: 'Black',
    category: 'Hoodies',
  },
  {
    id: 3,
    name: 'Orange TAH Oversized Hoodie',
    price: 'USD 10',
    images: [blacktote, blacktote2],
    type: 'hoodie',
    color: 'Orange',
    category: 'Hoodies',
  },
  {
    id: 4,
    name: 'Orange TAH Oversized Hoodie',
    price: 'USD 10',
    images: [lifestyletotebag],
    type: 'hoodie',
    color: 'Orange',
    category: 'Hoodies',
  },
  {
    id: 5,
    name: 'Black TAH Hoodie',
    price: 'USD 10',
    images: [bhoodie],
    type: 'hoodie',
    color: 'Black',
    category: 'Hoodies',
  },
  {
    id: 6,
    name: 'Orange TAH Oversized Hoodie',
    price: 'USD 10',
    images: [redhood],
    type: 'hoodie',
    color: 'Orange',
    category: 'Hoodies',
  },
];
