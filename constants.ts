import birthday from './images/emojis/Birthday.png';
import delicious from './images/emojis/Delicious.png';
import love from './images/emojis/Love.png';
import wineShop from './images/emojis/Wine Shop.png';
import cherry from './images/emojis/Cherry.png';
import redGrapes from './images/emojis/Red Grapes.png';
import cabernet from './images/emojis/Cabernet.png';
import redBottle from './images/emojis/Red Bottle.png';
import chardonnay from './images/emojis/Chardonnay.png'
import wineTesting from './images/emojis/Wine Tasting.png'
import twoThumbs from './images/emojis/Two Thumbs.png'


export const API_ENDPOINT = 'https://vault29-backend.innoventestech.in';

export enum AccountType {
  Email = 'Email',
  Facebook = 'Facebook'
}

export enum UserType {
  Consumer = 'Consumer',
  Winery = 'Winery',
  Other = 'Other'
}


export const imagesJSON = [
  {
    name: "emoticon_birthday",
    img: birthday,
    id: "1",
  },
  {
    name: "emoticon_delicious",
    img: delicious,
    id: "2",
  },
  {
    name: "emoticon_two-thumbs",
    img: twoThumbs,
    id: "3",
  },
  {
    name: "emoticon_heart",
    img: love,
    id: "4",
  },

  {
    name: "emoticon_red-grapes",
    img: redGrapes,
    id: "5",
  },
  {
    name: "moticon_wine-shop",
    img: wineShop,
    id: "6",
  },
  {
    name: "emoticon_cherry",
    img: cherry,
    id: "7",
  },
  {
    name: "emoticon_cabernet",
    img: cabernet,
    id: "8",
  },
  {
    name: "emoticon_red-bottle",
    img: redBottle,
    id: "9",
  },
  {
    name: "emoticon_chardonnay",
    img: chardonnay,
    id: "10",
  },
  {
    name: "emoticon_winetasting",
    img: wineTesting,
    id: "10",
  },
];

