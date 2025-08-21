import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./categorypage.css";  

// Import your product images
import shoes1 from "../assets/shoes1.jpg";
import shoes2 from "../assets/shoes2.webp";
import shoes from "../assets/shoes.jpg";
import shoes3 from "../assets/shoes3.jpg";
import shoes4 from "../assets/shoes4.jpg";
import shoes5 from "../assets/shoes5.jpg";
import shoes6 from "../assets/shoes6.jpg";
import shoes7 from "../assets/shoes7.jpg";

import shirts1 from "../assets/shirts1.jpeg";
import shirts2 from "../assets/shirts2.jpeg";
import shirts3 from "../assets/shirts3.jpeg";
import shirts4 from "../assets/shirts4.jpeg";
import shirts5 from "../assets/shirts5.jpeg";
import shirts6 from "../assets/shirts6.jpeg";
import shirts7 from "../assets/shirts7.jpeg";
import shirts8 from "../assets/shirts8.jpeg";
// import shirts9 from "../assets/shirts9.jpeg";
// import shirts10 from "../assets/shirts10.jpeg";S

//Jacket images 
import jacket1 from "../assets/jacket1.jpg";
import jacket2 from "../assets/jacket2.jpg";
import jacket3 from "../assets/jacket3.jpg";
import jacket4 from "../assets/jacket4.jpg";
import jacket5 from "../assets/jacket5.jpg";
import jacket6 from "../assets/jacket6.jpg";
import jacket7 from "../assets/jacket7.jpg";
import jacket8 from "../assets/jacket8.jpg";
import jacket9 from "../assets/jacket9.jpg";

//Hoodie images
import hoodies1 from "../assets/hoodies1.jpeg";
import hoodies2 from "../assets/hoodies2.jpeg";
import hoodies3 from "../assets/hoodies3.jpeg";
import hoodies4 from "../assets/hoodies4.jpeg";
import hoodies5 from "../assets/hoodies5.jpeg";
import hoodies6 from "../assets/hoodies6.jpeg";
import hoodies7 from "../assets/hoodies7.jpeg";
import hoodies8 from "../assets/hoodies8.jpeg";
import hoodies9 from "../assets/hoodies9.jpeg";

//Handbag images
import handbag1 from "../assets/handbag1.jpeg";
import handbag2 from "../assets/handbag2.jpeg";
import handbag3 from "../assets/handbag3.jpeg";
import handbag4 from "../assets/handbag4.jpeg";
import handbag5 from "../assets/handbag5.jpeg";
import handbag6 from "../assets/handbag6.jpeg";
import handbag7 from "../assets/handbag7.jpeg";
import handbag8 from "../assets/handbag8.jpeg";
import handbag9 from "../assets/handbag9.jpeg";
import handbag10 from "../assets/handbag10.jpeg";
import handbag11 from "../assets/handbag11.jpeg";

//Mobile images
import mobile1 from "../assets/mobile1.jpeg"; 
import mobile2 from "../assets/mobile2.jpeg";
import mobile3 from "../assets/mobile3.jpeg";
import mobile4 from "../assets/mobile4.jpeg";
import mobile5 from "../assets/mobile5.jpeg";
import mobile6 from "../assets/mobile6.jpeg";
import mobile7 from "../assets/mobile7.jpeg";

//Laptop images
import laptops1 from "../assets/laptops1.jpeg";
import laptops2 from "../assets/laptops2.jpeg";
import laptops3 from "../assets/laptops3.jpeg";
import laptops4 from "../assets/laptops4.jpeg";
import laptops5 from "../assets/laptops5.jpeg";
import laptops6 from "../assets/laptops6.jpeg";
import laptops7 from "../assets/laptops7.jpeg";
import laptops8 from "../assets/laptops8.jpeg";

//Smart Watchs images
import smartwatchs1 from "../assets/smartwatchs1.jpeg";
import smartwatchs2 from "../assets/smartwatchs2.jpeg";
import smartwatchs3 from "../assets/smartwatchs3.jpeg";
import smartwatchs4 from "../assets/smartwatchs4.jpeg";
import smartwatchs5 from "../assets/smartwatchs5.jpeg";
import smartwatchs6 from "../assets/smartwatchs6.jpeg";
import smartwatchs7 from "../assets/smartwatchs7.jpeg";
import smartwatchs8 from "../assets/smartwatchs8.jpeg";

//Smart Tvs images
import smartTvs1 from "../assets/smartTvs1.jpeg";
import smartTvs2 from "../assets/smartTvs2.jpeg";
import smartTvs3 from "../assets/smartTvs3.jpeg";
import smartTvs4 from "../assets/smartTvs4.jpeg";
import smartTvs5 from "../assets/smartTvs5.jpeg";
import smartTvs6 from "../assets/smartTvs6.jpeg";
import smartTvs7 from "../assets/smartTvs7.jpeg";
import smartTvs8 from "../assets/smartTvs8.jpeg";

//Action toys images
import actiontoys1 from "../assets/actiontoys1.jpeg";
import actiontoys2 from "../assets/actiontoys2.jpeg";
import actiontoys3 from "../assets/actiontoys3.jpeg";
import actiontoys4 from "../assets/actiontoys4.jpeg";
import actiontoys5 from "../assets/actiontoys5.jpeg";
import actiontoys6 from "../assets/actiontoys6.jpeg";
import actiontoys7 from "../assets/actiontoys7.jpeg";
import actiontoys8 from "../assets/actiontoys8.jpeg";
import actiontoys9 from "../assets/actiontoys9.jpeg";

//Remote Control toys images
import remotecontroltoys1 from "../assets/remotecontroltoys1.jpeg";
import remotecontroltoys2 from "../assets/remotecontroltoys2.jpeg";
import remotecontroltoys3 from "../assets/remotecontroltoys3.jpeg";
import remotecontroltoys4 from "../assets/remotecontroltoys4.jpeg";
import remotecontroltoys5 from "../assets/remotecontroltoys5.jpeg";
import remotecontroltoys6 from "../assets/remotecontroltoys6.jpeg";
import remotecontroltoys7 from "../assets/remotecontroltoys7.jpeg";
import remotecontroltoys8 from "../assets/remotecontroltoys8.jpeg";
import remotecontroltoys9 from "../assets/remotecontroltoys9.jpeg";
import remotecontroltoys10 from "../assets/remotecontroltoys10.jpeg";
import remotecontroltoys11 from "../assets/remotecontroltoys11.jpeg";

//Soft Toys image
import softteddytoys1 from "../assets/softteddytoys1.jpeg";
import softteddytoys2 from "../assets/softteddytoys2.jpeg";
import softteddytoys3 from "../assets/softteddytoys3.jpeg";
import softteddytoys4 from "../assets/softteddytoys4.jpeg";
import softteddytoys5 from "../assets/softteddytoys5.jpeg";
import softteddytoys6 from "../assets/softteddytoys6.jpeg";
import softteddytoys7 from "../assets/softteddytoys7.jpeg";
import softteddytoys8 from "../assets/softteddytoys8.jpeg";
import softteddytoys9 from "../assets/softteddytoys9.jpeg";
import softteddytoys10 from "../assets/softteddytoys10.jpeg";
import softteddytoys11 from "../assets/softteddytoys11.jpeg";
import softteddytoys12 from "../assets/softteddytoys12.jpeg";

//Fiction Books images
import fictionbooks1 from "../assets/fictionbooks1.jpeg";
import fictionbooks2 from "../assets/fictionbooks2.jpeg";
import fictionbooks3 from "../assets/fictionbooks3.jpeg";
import fictionbooks4 from "../assets/fictionbooks4.jpeg";
import fictionbooks5 from "../assets/fictionbooks5.jpeg";
import fictionbooks6 from "../assets/fictionbooks6.jpeg";
import fictionbooks7 from "../assets/fictionbooks7.jpeg";
// import fictionbooks8 from "../assets/fictionbooks8.jpeg";
import fictionbooks9 from "../assets/fictionbooks9.jpeg";

//Personal Devlopment Books images
import personaldevelopmentbooks1 from "../assets/personaldevelopmentbooks1.jpeg";
import personaldevelopmentbooks2 from "../assets/personaldevelopmentbooks2.jpeg";
import personaldevelopmentbooks3 from "../assets/personaldevelopmentbooks3.jpeg";
import personaldevelopmentbooks4 from "../assets/personaldevelopmentbooks4.jpeg";
import personaldevelopmentbooks5 from "../assets/personaldevelopmentbooks5.jpeg";
import personaldevelopmentbooks6 from "../assets/personaldevelopmentbooks6.jpeg";
import personaldevelopmentbooks7 from "../assets/personaldevelopmentbooks7.jpeg";
import personaldevelopmentbooks8 from "../assets/personaldevelopmentbooks8.jpeg";

//Educational Books images
import educationalbooks1 from "../assets/educationalbooks1.jpeg";
import educationalbooks2 from "../assets/educationalbooks2.jpeg";
import educationalbooks3 from "../assets/educationalbooks3.jpeg";
import educationalbooks4 from "../assets/educationalbooks4.jpeg";
import educationalbooks5 from "../assets/educationalbooks5.jpeg";
import educationalbooks6 from "../assets/educationalbooks6.jpeg";
import educationalbooks7 from "../assets/educationalbooks7.jpeg";
import educationalbooks8 from "../assets/educationalbooks8.jpeg";
import educationalbooks9 from "../assets/educationalbooks9.jpeg";
import educationalbooks10 from "../assets/educationalbooks10.jpeg";

// All products
const products = [
  { id: 1, name: "Nike Air Zoom", price: "$25", image: shoes1, category: "shoes" },
  { id: 2, name: "Adidas Runner", price: "$40", image: shoes2, category: "shoes" },
  { id: 3, name: "Classic Sneakers", price: "$35", image: shoes, category: "shoes" },
  { id: 4, name: "Puma Speed", price: "$30", image: shoes3, category: "shoes" },
  { id: 5, name: "Reebok Flex", price: "$28", image: shoes4, category: "shoes" },
  { id: 6, name: "New Balance 574", price: "$45", image: shoes5, category: "shoes" },
  { id: 7, name: "Asics Gel-Kayano", price: "$50", image: shoes6, category: "shoes" },
  { id: 8, name: "Under Armour HOVR", price: "$55", image: shoes7, category: "shoes" },
  { id: 9, name: "Casual Cotton Tee", price: "$18", image: shirts1, category: "shirts" },
  { id: 10, name: "Slim Fit Polo", price: "$25", image: shirts2, category: "shirts" },
  { id: 11, name: "Classic White Shirt", price: "$30", image: shirts3, category: "shirts" },
  { id: 12, name: "Graphic Printed Tee", price: "$20", image: shirts4, category: "shirts" },
  { id: 13, name: "Stylish Hoodie", price: "$35", image: shirts5, category: "shirts" },
  { id: 14, name: "Denim Jacket", price: "$50", image: shirts6, category: "shirts" },
  { id: 15, name: "Casual Chinos", price: "$40", image: shirts7, category: "shirts" },
  { id: 16, name: "Formal Trousers", price: "$45", image: shirts8, category: "shirts" },
  { id: 17, name: "Classic Denim Jacket", price: "$45", image: jacket1, category: "jacket" },
    { id: 18, name: "Leather Biker Jacket", price: "$75", image: jacket2, category: "jacket" },
    { id: 19, name: "Bomber Jacket", price: "$60", image: jacket3, category: "jacket" },
    { id: 20, name: "Puffer Jacket", price: "$65", image: jacket4, category: "jacket" },
    { id: 21, name: "Hooded Parka", price: "$70", image: jacket5, category: "jacket" },
    { id: 22, name: "Trench Coat", price: "$80", image: jacket6, category: "jacket" },
    { id: 23, name: "Windbreaker Jacket", price: "$50", image: jacket7, category: "jacket" },
    { id: 24, name: "Varsity Jacket", price: "$55", image: jacket8, category: "jacket" },
    { id: 25, name: "Faux Fur Jacket", price: "$68", image: jacket9, category: "jacket" },
    { id: 26, name: "Urban Street Hoodie", price: "$35", image: hoodies1, category: "hoodies" },
    { id: 27, name: "Classic Pullover Hoodie", price: "$30", image: hoodies2, category: "hoodies" },
    { id: 28, name: "Zippered Sports Hoodie", price: "$40", image: hoodies3, category: "hoodies" },
    { id: 29, name: "Fleece Lined Hoodie", price: "$45", image: hoodies4, category: "hoodies" },
    { id: 30, name: "Oversized Graphic Hoodie", price: "$38", image: hoodies5, category: "hoodies" },
    { id: 31, name: "Lightweight Summer Hoodie", price: "$28", image: hoodies6, category: "hoodies" },
    { id: 32, name: "Tie-Dye Hoodie", price: "$33", image: hoodies7, category: "hoodies" },
    { id: 33, name: "Minimalist Plain Hoodie", price: "$32", image: hoodies8, category: "hoodies" },
    { id: 34, name: "Vintage Washed Hoodie", price: "$37", image: hoodies9, category: "hoodies" },
    { id: 35, name: "Classic Leather Tote", price: "$85", image: handbag1, category: "handbag" },
    { id: 36, name: "Quilted Chain Bag", price: "$120", image: handbag2, category: "handbag" },
    { id: 37, name: "Crossbody Mini Bag", price: "$60", image: handbag3, category: "handbag" },
    { id: 38, name: "Boho Fringe Handbag", price: "$70", image: handbag4, category: "handbag" },
    { id: 39, name: "Structured Satchel", price: "$95", image: handbag5, category: "handbag" },
    { id: 40, name: "Bucket Shoulder Bag", price: "$80", image: handbag6, category: "handbag" },
    { id: 41, name: "Elegant Clutch Purse", price: "$50", image: handbag7, category: "handbag" },
    { id: 42, name: "Canvas Shopper Tote", price: "$40", image: handbag8, category: "handbag" },
    { id: 43, name: "Metallic Evening Bag", price: "$110", image: handbag9, category: "handbag" },
    { id: 44, name: "Designer Logo Handbag", price: "$150", image: handbag10, category: "handbag" },
    { id: 45, name: "Casual Drawstring Bag", price: "$65", image: handbag11, category: "handbag" },
     { id: 46, name: "Iphone 16", price: "$65", image: mobile1, category: "mobile" },
      { id: 47, name: "samsung s24 ultra", price: "$65", image: mobile2, category: "mobile" },
      { id: 48, name: "oneplus 13", price: "$65", image: mobile3, category: "mobile" },
      { id: 49, name: "googlepixel7 pro", price: "$65", image: mobile4, category: "mobile" },
      { id: 50, name: "iphone 15 Blue", price: "$65", image: mobile5, category: "mobile" },
      { id: 51, name: "iphone 16 pro", price: "$65", image: mobile6, category: "mobile" },
      { id: 52, name: "samsung fold", price: "$65", image: mobile7, category: "mobile" },
      { id: 53, name: "MacBook Air M3 (2024)", price: "$1199", image: laptops1, category: "laptops",},
        { id: 54, name: "MacBook Pro 16\" M3 Max", price: "$3299", image: laptops2, category: "laptops",},
        { id: 55, name: "Dell XPS 15 (2024)", price: "$1499", image: laptops3, category: "laptops",},
        { id: 56, name: "HP Spectre x360 14", price: "$1399", image: laptops4, category: "laptops",},
        { id: 57, name: "Lenovo ThinkPad X1 Carbon Gen 12", price: "$1799", image: laptops5, category: "laptops",},
        { id: 58, name: "Asus ROG Zephyrus G14 (2024)", price: "$1599", image: laptops6, category: "laptops",},
        { id: 59, name: "Acer Swift X 14", price: "$1099", image: laptops7, category: "laptops",},
        { id: 60, name: "Microsoft Surface Laptop 6", price: "$1399", image: laptops8, category: "laptops",},
        { id: 61, name: "Apple Watch Series 9", price: "$399", image: smartwatchs1, category: "smartwatchs",},
          { id: 62, name: "Samsung Galaxy Watch 6", price: "$299", image: smartwatchs2, category: "smartwatchs",},
          { id: 63, name: "Garmin Venu 3", price: "$449", image: smartwatchs3, category: "smartwatchs",},
          { id: 64, name: "Fitbit Versa 4", price: "$199", image: smartwatchs4, category: "smartwatchs",},
          { id: 65, name: "Google Pixel Watch 2", price: "$349", image: smartwatchs5, category: "smartwatchs",},
          { id: 66, name: "Amazfit GTR 4", price: "$179", image: smartwatchs6, category: "smartwatchs",},
          { id: 67, name: "OnePlus Watch 2", price: "$299", image: smartwatchs7, category: "smartwatchs",},
          { id: 68, name: "Noise ColorFit Ultra 3", price: "$79", image: smartwatchs8, category: "smartwatchs",},
           { id: 69, name: "Samsung 55\" QLED 4K Smart TV", price: "$899", image: smartTvs1, category: "smarttvs",},
            { id: 70, name: "Sony Bravia 65\" OLED 4K TV", price: "$1,799", image: smartTvs2, category: "smarttvs",},
            { id: 71, name: "LG 50\" 4K UHD Smart TV", price: "$599", image: smartTvs3, category: "smarttvs",},
            { id: 72, name: "TCL 43\" 4K Roku Smart TV", price: "$349", image: smartTvs4, category: "smarttvs",},
            { id: 73, name: "Hisense 65\" ULED 4K Smart TV", price: "$649", image: smartTvs5, category: "smarttvs",},
            { id: 74, name: "OnePlus 55\" Y1S Pro 4K Smart TV", price: "$499", image: smartTvs6, category: "smarttvs",},
            { id: 75, name: "Mi 55\" 4K Horizon Edition TV", price: "$459", image: smartTvs7, category: "smarttvs",},
            { id: 76, name: "Vu 65\" 4K Premium Smart TV", price: "$579", image: smartTvs8, category: "smarttvs",},
              { id: 77, name: "Iron Man Action Figure", price: "$49", image: actiontoys1, category: "actiontoys",},
              { id: 78, name: "Gojo Satoru Figure", price: "$42", image: actiontoys2, category: "actiontoys",},
              { id: 79, name: "Spider-Man with Swords", price: "$54", image: actiontoys3, category: "actiontoys",},
              { id: 80, name: "Carnage Statue", price: "$59", image: actiontoys4, category: "actiontoys",},
              { id: 81, name: "Spider-Man Action Figure", price: "$47", image: actiontoys5, category: "actiontoys",},
              { id: 82, name: "Iron Man Armor", price: "$64", image: actiontoys6, category: "actiontoys",},
              { id: 83, name: "Hulkbuster Iron Man 1/12th Scale Collectible Figure", price: "$79", image: actiontoys7, category: "actiontoys",},
              { id: 84, name: "Batman Action Figure", price: "$51", image: actiontoys8, category: "actiontoys",},
              { id: 85, name: "Batman Action Figure", price: "$53", image: actiontoys9, category: "actiontoys",},
               { id: 86, name: "CRH Remote Control Train", price: "$349", image: remotecontroltoys1, category: "remotecontroltoys",},
                { id: 87, name: "Robot Titan-32", price: "$499", image: remotecontroltoys2, category: "remotecontroltoys",},
                { id: 88, name: "Police Car Transformer Toy", price: "$399", image: remotecontroltoys3, category: "remotecontroltoys",},
                { id: 89, name: "SMART PICKS", price: "$359", image: remotecontroltoys4, category: "remotecontroltoys",},
                { id: 90, name: "Remote Control Transforming Car Robot", price: "$429", image: remotecontroltoys5, category: "remotecontroltoys",},
                { id: 91, name: "Remote Control Transforming Car Robot", price: "$429", image: remotecontroltoys6, category: "remotecontroltoys",},
                { id: 92, name: "Remote-controlled robotic dinosaur", price: "$459", image: remotecontroltoys7, category: "remotecontroltoys",},
                { id: 93, name: "Wild Hunt", price: "$379", image: remotecontroltoys8, category: "remotecontroltoys",},
                { id: 94, name: "ARMOR REMOTE CONTROL", price: "$389", image: remotecontroltoys9, category: "remotecontroltoys",},
                { id: 95, name: "Remote Control Formula 1 Car", price: "$419", image: remotecontroltoys10, category: "remotecontroltoys",},
                { id: 96, name: "Remote Control Stunt Car", price: "$449", image: remotecontroltoys11, category: "remotecontroltoys",},
                { id: 97, name: "CuddleMochi Teddy Bear", price: "$29", image: softteddytoys1, category: "softteddytoys",},
                  { id: 98, name: "Lilac Cuddle Duo Teddy Bear", price: "$34", image: softteddytoys2, category: "softteddytoys",},
                  { id: 99, name: "Blue Stitch Plush", price: "$25", image: softteddytoys3, category: "softteddytoys",},
                  { id: 100, name: "Plush Shark Toy", price: "$27", image: softteddytoys4, category: "softteddytoys",},
                  { id: 101, name: "Pikachu Plush Toy", price: "$30", image: softteddytoys5, category: "softteddytoys",},
                  { id: 102, name: "GROIC plush toy", price: "$33", image: softteddytoys6, category: "softteddytoys",},
                  { id: 103, name: "Light brown plush teddy bear", price: "$28", image: softteddytoys7, category: "softteddytoys",},
                  { id: 104, name: "Brown Teddy Bear", price: "$27", image: softteddytoys8, category: "softteddytoys",},
                  { id: 105, name: "Pooh Bear Plush Toy", price: "$32", image: softteddytoys9, category: "softteddytoys",},
                  { id: 106, name: "Plush Toy Dog with Red Scarf", price: "$26", image: softteddytoys10, category: "softteddytoys",},
                  { id: 107, name: "Two Hugging Plush Dogs", price: "$35", image: softteddytoys11, category: "softteddytoys",},
                  { id: 108, name: "Cute Plush Toy with Purple Hair", price: "$29", image: softteddytoys12, category: "softteddytoys",},
                  { id: 109, name: "Two Colleen Hoover Books", price: "$34", image: fictionbooks1, category: "fictionbooks",},
                    { id: 110, name: "All the Light We Cannot See", price: "$22", image: fictionbooks2, category: "fictionbooks",},
                    { id: 111, name: "The Girl on the Train", price: "$19", image: fictionbooks3, category: "fictionbooks",},
                    { id: 112, name: "Powerless, Reckless, and Powerful", price: "$39", image: fictionbooks4, category: "fictionbooks",},
                    { id: 113, name: "The Secret Lives of Introverts", price: "$18", image: fictionbooks5, category: "fictionbooks",},
                    { id: 114, name: "Everything I Never Told You by Celeste Ng", price: "$21", image: fictionbooks6, category: "fictionbooks",},
                    { id: 115, name: "A Walk to Remember", price: "$17", image: fictionbooks7, category: "fictionbooks",},
                    // { id: 116, name: "A Walk to Remember", price: "$29", image: fictionbooks8, category: "fictionbooks",},
                    { id: 117, name: "They Both Die at the End by Adam Silvera", price: "$20", image: fictionbooks9, category: "fictionbooks",},
                    { id: 118, name: "The Mountain Is You by Brianna Wiest", price: "$24", image: personaldevelopmentbooks1, category: "personaldevelopmentbooks",},
                      { id: 119, name: "Ego is the Enemy Book Cover", price: "$22", image: personaldevelopmentbooks2, category: "personaldevelopmentbooks",},
                      { id: 120, name: "The Science of Self-Discipline by Peter Hollins", price: "$20", image: personaldevelopmentbooks3, category: "personaldevelopmentbooks",},
                      { id: 121, name: "Single. On Purpose. by John Kim", price: "$21", image: personaldevelopmentbooks4, category: "personaldevelopmentbooks",},
                      { id: 122, name: "The Power of Letting Go Book Cover", price: "$23", image: personaldevelopmentbooks5, category: "personaldevelopmentbooks",},
                      { id: 123, name: "You Become What You Think", price: "$19", image: personaldevelopmentbooks6, category: "personaldevelopmentbooks",},
                      { id: 124, name: "Thinking, Fast and Slow by Daniel Kahneman", price: "$28", image: personaldevelopmentbooks7, category: "personaldevelopmentbooks",},
                      { id: 125, name: "Master Your Emotions Book Cover", price: "$21", image: personaldevelopmentbooks8, category: "personaldevelopmentbooks",},
                      { id: 126, name: "Do the Hard Things First by Scott Allan", price: "$21", image: educationalbooks1, category: "educationalbooks",},
                        { id: 127, name: "The Laws of Human Nature by Robert Greene", price: "$28", image: educationalbooks2, category: "educationalbooks",},
                        { id: 128, name: "Physical Intelligence by Claire Dale and Patricia Peyton", price: "$24", image: educationalbooks3, category: "educationalbooks",},
                        { id: 129, name: "Dopamine Detox by Thibaut Meurisse", price: "$18", image: educationalbooks4, category: "educationalbooks",},
                        { id: 130, name: "Master Your Potential by Thibaut Meurisse", price: "$22", image: educationalbooks5, category: "educationalbooks",},
                        { id: 131, name: "How to Listen with Intention", price: "$20", image: educationalbooks6, category: "educationalbooks",},
                        { id: 132, name: "Visual Thinking by Temple Grandin", price: "$26", image: educationalbooks7, category: "educationalbooks",},
                        { id: 133, name: "The Organized Mind", price: "$27", image: educationalbooks8, category: "educationalbooks",},
                        { id: 134, name: "Your Brain is Playing Tricks on You", price: "$19", image: educationalbooks9, category: "educationalbooks",},
                        { id: 135, name: "Win Every Argument by Mehdi Hasan", price: "$23", image: educationalbooks10, category: "educationalbooks",},
];

const CategoryPage = () => {
  const { name } = useParams(); // category name from URL
  const categoryName = name.toLowerCase();
  const { addToCart, isInCart } = useCart();

  const filteredProducts = products.filter(
    (product) => product.category === categoryName
  );

  return (
    <div className="category-page">
      <h2 className="category-heading">Products in "{categoryName}"</h2>
      {filteredProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card1">
              <img
                src={product.image}
                alt={product.name}
                className="product-image1"
              />
              <h4>{product.name}</h4>
              <p>{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                disabled={isInCart(product.id)}
              >
                {isInCart(product.id) ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
