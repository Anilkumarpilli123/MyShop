const mongoose = require("mongoose");
const Product = require("./models/Product"); // your product schema
// require("dotenv").config();

const products = {
  fashion: [
    { id: 1, name: "Nike Air Zoom", price: "$25", image: "/assets/shoes1.jpg", category: "shoes", description: "Lightweight and breathable running shoes for everyday use.", features: ["Air Zoom technology", "Mesh upper", "Rubber outsole"], useCase: "Best for road running and gym workouts." },
    { id: 2, name: "Adidas Runner", price: "$40", image: "/assets/shoes2.jpg", category: "shoes", description: "Comfortable runners with great arch support.", features: ["Cloudfoam midsole", "Flexible knit upper", "Durable tread"], useCase: "Ideal for joggers and walkers." },
    { id: 3, name: "Classic Sneakers", price: "$35", image: "/assets/shoes3.jpg", category: "shoes", description: "Trendy sneakers for casual outings.", features: ["Stylish design", "Lace-up closure", "All-day comfort"], useCase: "Perfect for daily wear and street fashion." },
    { id: 4, name: "Puma Speed", price: "$30", image: "/assets/shoes4.jpg", category: "shoes", description: "Speed-enhancing shoes with great grip.", features: ["Speed traction sole", "Synthetic upper", "Comfort padding"], useCase: "Great for sports and gym training." },
    { id: 5, name: "Reebok Flex", price: "$28", image: "/assets/shoes5.jpg", category: "shoes", description: "Flexible sole that moves with your foot.", features: ["Flex grooves", "Mesh fabric", "Padded collar"], useCase: "Ideal for cardio and HIIT workouts." },
    { id: 6, name: "New Balance 574", price: "$45", image: "/assets/shoes6.jpg", category: "shoes", description: "Retro-style with modern comfort.", features: ["Cushioned midsole", "Classic suede design", "Supportive heel"], useCase: "Great for casual wear and long walks." },
    { id: 7, name: "Asics Gel-Kayano", price: "$50", image: "/assets/shoes7.jpg", category: "shoes", description: "Stability running shoe with gel support.", features: ["Gel cushioning", "Stabilizing heel clutch", "Breathable mesh"], useCase: "Perfect for overpronators and marathon training." },
    { id: 8, name: "Under Armour HOVR", price: "$55", image: "/assets/shoes8.jpg", category: "shoes", description: "Responsive and stylish training shoes.", features: ["HOVR cushioning", "Energy return", "Lightweight upper"], useCase: "Best for cross-training and casual wear." },
    { id: 9, name: "Casual Cotton Tee", price: "$18", image: "/assets/shirts1.jpg", category: "shirts", description: "A soft and breathable cotton T-shirt for everyday comfort.", features: ["100% cotton", "Regular fit", "Machine washable"], useCase: "Ideal for daily wear and casual outings." },
    { id: 10, name: "Slim Fit Polo", price: "$25", image: "/assets/shirts2.jpg", category: "shirts", description: "Smart and stylish polo shirt for a semi-formal look.", features: ["Pique fabric", "Collared neck", "Short sleeves"], useCase: "Great for casual Fridays or lunch dates." },
    { id: 11, name: "Classic White Shirt", price: "$30", image: "/assets/shirts3.jpg", category: "shirts", description: "Timeless white shirt with a crisp finish.", features: ["Cotton blend", "Button-down collar", "Long sleeves"], useCase: "Perfect for office wear or formal events." },
    { id: 12, name: "Graphic Printed Tee", price: "$20", image: "/assets/shirts4.jpg", category: "shirts", description: "Trendy T-shirt with bold, expressive prints.", features: ["Vibrant graphic", "Soft touch", "Relaxed fit"], useCase: "Best for weekend hangouts and casual wear." },
    { id: 13, name: "Stylish Hoodie", price: "$35", image: "/assets/shirts5.jpg", category: "shirts", description: "Rugged denim shirt for a cool, laid-back style.", features: ["Heavy denim fabric", "Chest pockets", "Snap buttons"], useCase: "Great for layering or wearing solo." },
    { id: 14, name: "Denim Jacket", price: "$50", image: "/assets/shirts6.jpg", category: "shirts", description: "Lightweight shirt made from breathable linen blend.", features: ["Linen-cotton mix", "Roll-up sleeves", "Relaxed fit"], useCase: "Perfect for summer days and vacations." },
    { id: 15, name: "Casual Chinos", price: "$40", image: "/assets/shirts7.jpg", category: "shirts", description: "Cozy flannel shirt with a classic checkered pattern.", features: ["Brushed flannel", "Warm and soft", "Button cuffs"], useCase: "Ideal for cool weather and layering." },
    { id: 16, name: "Formal Trousers", price: "$45", image: "/assets/shirts8.jpg", category: "shirts", description: "Comfortable henley with a touch of stretch.", features: ["3-button placket", "Slim fit", "Stretch fabric"], useCase: "Great for casual wear or under jackets." },
    { id: 17, name: "Classic Denim Jacket", price: "$45", image: "/assets/jacket1.jpg", category: "jacket", description: "Timeless denim jacket that suits any casual outfit.", features: ["Button-up front", "Chest pockets", "Durable denim fabric"], useCase: "Perfect for layering over T-shirts and hoodies." },
      { id: 18, name: "Leather Biker Jacket", price: "$75", image: "/assets/jacket2.jpg", category: "jacket", description: "Edgy and stylish leather jacket with a classic biker look.", features: ["Zippered pockets", "Asymmetrical front zip", "Faux leather material"], useCase: "Ideal for nights out and street fashion." },
      { id: 19, name: "Bomber Jacket", price: "$60", image: "/assets/jacket3.jpg", category: "jacket", description: "Lightweight and comfortable bomber jacket for cooler days.", features: ["Ribbed cuffs and hem", "Zipper closure", "Soft lining"], useCase: "Great for casual wear and fall evenings." },
      { id: 20, name: "Puffer Jacket", price: "$65", image: "/assets/jacket4.jpg", category: "jacket", description: "Warm and cozy puffer jacket designed to keep out the cold.", features: ["Down insulation", "Water-resistant", "Zip-up front"], useCase: "Best for winter wear and snowy conditions." },
      { id: 21, name: "Hooded Parka", price: "$70", image: "/assets/jacket5.jpg", category: "jacket", description: "Heavy-duty parka with a fur-lined hood for extra warmth.", features: ["Windproof shell", "Adjustable waist", "Fleece lining"], useCase: "Perfect for harsh weather and outdoor activities." },
      { id: 22, name: "Trench Coat", price: "$80", image: "/assets/jacket6.jpg", category: "jacket", description: "Elegant trench coat that adds sophistication to any look.", features: ["Double-breasted", "Waist belt", "Water-repellent fabric"], useCase: "Great for rainy days and formal outerwear." },
      { id: 23, name: "Windbreaker Jacket", price: "$50", image: "/assets/jacket7.jpg", category: "jacket", description: "Ultra-light windbreaker for active and windy days.", features: ["Packable design", "Elastic cuffs", "Ventilated back"], useCase: "Ideal for running, hiking, and travel." },
      { id: 24, name: "Varsity Jacket", price: "$55", image: "/assets/jacket8.jpg", category: "jacket", description: "Sporty varsity jacket with a college vibe.", features: ["Contrasting sleeves", "Snap buttons", "Soft lining"], useCase: "Perfect for casual hangouts and layering." },
      { id: 25, name: "Faux Fur Jacket", price: "$68", image: "/assets/jacket9.jpg", category: "jacket", description: "Luxurious faux fur jacket that feels ultra-soft.", features: ["Plush texture", "Hook closure", "Warm insulation"], useCase: "Best for evening outings and cold weather chic." },
      { id: 26, name: "Urban Street Hoodie", price: "$35", image: "/assets/hoodies1.jpg", category: "hoodies", description: "Casual and cozy pullover hoodie made from soft fleece.", features: ["Kangaroo pocket", "Adjustable drawstring hood", "Ribbed cuffs and hem"], useCase: "Perfect for daily wear, lounging, or layering in cooler weather." },
      { id: 27, name: "Classic Pullover Hoodie", price: "$30", image: "/assets/hoodies2.jpg", category: "hoodies", description: "Versatile zip-up hoodie that’s easy to wear and style.", features: ["Full zipper", "Split kangaroo pockets", "Fleece lining"], useCase: "Ideal for casual outings, workouts, and quick layering." },
      { id: 28, name: "Zippered Sports Hoodie", price: "$40", image: "/assets/hoodies3.jpg", category: "hoodies", description: "Trendy hoodie with bold graphic print and streetwear vibe.", features: ["Printed design", "Drawstring hood", "Soft inner lining"], useCase: "Great for making a statement on casual days or at events." },
      { id: 29, name: "Fleece Lined Hoodie", price: "$45", image: "/assets/hoodies4.jpg", category: "hoodies", description: "Relaxed-fit oversized hoodie for comfort and style.", features: ["Loose fit", "Dropped shoulders", "Brushed fleece fabric"], useCase: "Perfect for lounging, traveling, and cozy weekends." },
      { id: 30, name: "Oversized Graphic Hoodie", price: "$38", image: "/assets/hoodies5.jpg", category: "hoodies", description: "Stylish cropped hoodie with a sporty silhouette.", features: ["Shorter length", "Elastic waistband", "Soft cotton blend"], useCase: "Ideal for gym, casual wear, and pairing with high-waisted pants." },
      { id: 31, name: "Lightweight Summer Hoodie", price: "$28", image: "/assets/hoodies6.jpg", category: "hoodies", description: "Thick fleece hoodie to keep you warm in cold weather.", features: ["Thermal fleece lining", "Ribbed hems", "Heavyweight fabric"], useCase: "Great for winter, layering, and outdoor comfort." },
      { id: 32, name: "Tie-Dye Hoodie", price: "$33", image: "/assets/hoodies7.jpg", category: "hoodies", description: "Colorful tie-dye hoodie for a retro, fun look.", features: ["Unique dye pattern", "Drawstring hood", "Soft cotton material"], useCase: "Perfect for festivals, casual hangouts, and relaxed vibes." },
      { id: 33, name: "Minimalist Plain Hoodie", price: "$32", image: "/assets/hoodies8.jpg", category: "hoodies",  description: "Tailored hoodie with a slim fit for a clean look.", features: ["Tapered design", "Side pockets", "Stretch cotton fabric"], useCase: "Great for layering under jackets or wearing to casual meetups." },
      { id: 34, name: "Vintage Washed Hoodie", price: "$37", image: "/assets/hoodies9.jpg", category: "hoodies", description: "Ultra-warm hoodie lined with plush sherpa fleece.", features: ["Sherpa interior", "Zippered front", "Thick exterior material"], useCase: "Ideal for chilly mornings, outdoor walks, and winter wear." },
      { id: 35, name: "Classic Leather Tote", price: "$85", image: "/assets/handbag1.jpg", category: "handbag", description: "Elegant leather tote with ample space and timeless design.", features: ["Genuine leather", "Inner compartments", "Top handles"], useCase: "Perfect for work, meetings, and daily use." },
      { id: 36, name: "Quilted Chain Bag", price: "$120", image: "/assets/handbag2.jpg", category: "handbag", description: "Chic quilted handbag with metallic chain strap.", features: ["Quilted pattern", "Magnetic snap", "Gold-tone chain"], useCase: "Ideal for evening events and special occasions." },
      { id: 37, name: "Crossbody Mini Bag", price: "$60", image: "/assets/handbag3.jpg", category: "handbag", description: "Compact and lightweight crossbody bag for essentials.", features: ["Adjustable strap", "Zipper closure", "Minimalist design"], useCase: "Best for errands, walks, and festivals." },
      { id: 38, name: "Boho Fringe Handbag", price: "$70", image: "/assets/handbag4.jpg", category: "handbag", description: "Trendy handbag with fringe detailing and boho flair.", features: ["Suede-like material", "Tassel fringe", "Shoulder strap"], useCase: "Perfect for casual outfits and concerts." },
      { id: 39, name: "Structured Satchel", price: "$95", image: "/assets/handbag5.jpg", category: "handbag", description: "Polished satchel with structure and functionality.", features: ["Firm shape", "Double handles", "Interior zip pockets"], useCase: "Ideal for office, meetings, and formal wear." },
      { id: 40, name: "Bucket Shoulder Bag", price: "$80", image: "/assets/handbag6.jpg", category: "handbag", description: "Trendy bucket bag with drawstring and bucket silhouette.", features: ["Adjustable strap", "Drawstring closure", "Soft leather look"], useCase: "Great for weekend outings and casual wear." },
      { id: 41, name: "Elegant Clutch Purse", price: "$50", image: "/assets/handbag7.jpg", category: "handbag", description: "Slim and stylish clutch perfect for evening glamour.", features: ["Snap closure", "Slim profile", "Glossy finish"], useCase: "Ideal for parties, weddings, and formal dinners." },
      { id: 42, name: "Canvas Shopper Tote", price: "$40", image: "/assets/handbag8.jpg", category: "handbag", description: "Spacious tote made from sturdy canvas material.", features: ["Eco-friendly fabric", "Large capacity", "Open top"], useCase: "Best for shopping, groceries, and day trips." },
      { id: 43, name: "Metallic Evening Bag", price: "$110", image: "/assets/handbag9.jpg", category: "handbag", description: "Shiny evening bag with elegant metallic finish.", features: ["Hard shell", "Clasp closure", "Detachable chain strap"], useCase: "Perfect for galas, formal events, and date nights." },
      { id: 44, name: "Designer Logo Handbag", price: "$150", image: "/assets/handbag10.jpg", category: "handbag", description: "Luxury handbag featuring signature logo and premium quality.", features: ["Branded hardware", "Leather trim", "Interior organizer"], useCase: "Ideal for fashion-forward professionals and brand lovers." },
      { id: 45, name: "Casual Drawstring Bag", price: "$65", image: "/assets/handbag11.jpg", category: "handbag", description: "Relaxed bag with drawstring closure for a sporty look.", features: ["Durable nylon", "Front pocket", "Adjustable straps"], useCase: "Great for gym, travel, and everyday errands." },
  ],
   electronics:[
    {
    id: 46,
    name: "iPhone 16",
    price: "$1199",
    image: "/assets/mobile1.jpeg",
    category: "mobile",
    description: "Apple's latest flagship with cutting-edge performance and dynamic island design.",
    features: ["A18 Bionic chip", "6.1\" OLED display", "Face ID", "iOS 18"],
    useCase: "Ideal for users wanting top-tier performance, camera quality, and long-term software support."
  },
  {
    id: 47,
    name: "Samsung Galaxy S24 Ultra",
    price: "$1299",
    image: "/assets/mobile2.jpeg",
    category: "mobile",
    description: "A powerhouse Android device with a massive display and S Pen support.",
    features: ["Snapdragon 8 Gen 3", "200MP main camera", "120Hz 6.8\" AMOLED", "S Pen"],
    useCase: "Best for productivity, photography, and Android power users."
  },
  {
    id: 48,
    name: "OnePlus 13",
    price: "$899",
    image: "/assets/mobile3.jpeg",
    category: "mobile",
    description: "Flagship killer with clean software, fast charging, and elegant design.",
    features: ["Snapdragon 8 Gen 3", "120Hz AMOLED", "100W fast charging", "OxygenOS"],
    useCase: "Perfect for users wanting speed and minimal bloat in Android."
  },
  {
    id: 49,
    name: "Google Pixel 7 Pro",
    price: "$899",
    image: "/assets/mobile4.jpeg",
    category: "mobile",
    description: "Google’s top-tier Pixel with industry-leading computational photography.",
    features: ["Tensor G2 chip", "6.7\" LTPO OLED", "Google Camera AI", "Stock Android"],
    useCase: "Great for photography lovers and users who prefer stock Android with long support."
  },
  {
    id: 50,
    name: "iPhone 15 Blue",
    price: "$999",
    image: "/assets/mobile5.jpeg",
    category: "mobile",
    description: "The iPhone 15 in stunning blue, offering dynamic island and enhanced performance.",
    features: ["A16 Bionic chip", "6.1\" Super Retina XDR", "USB-C port", "Advanced camera system"],
    useCase: "Best for users upgrading from older iPhones looking for balance in price and performance."
  },
  {
    id: 51,
    name: "iPhone 16 Pro",
    price: "$1399",
    image: "/assets/mobile6.jpeg",
    category: "mobile",
    description: "Apple’s professional-grade phone with titanium body and ProMotion display.",
    features: ["A18 Pro chip", "120Hz ProMotion", "Triple camera with LiDAR", "iOS 18 Pro features"],
    useCase: "Perfect for professionals, content creators, and Apple ecosystem users."
  },
  {
    id: 52,
    name: "Samsung Galaxy Z Fold 5",
    price: "$1799",
    image: "/assets/mobile7.jpeg",
    category: "mobile",
    description: "Samsung’s premium foldable offering multitasking with a tablet-sized inner screen.",
    features: ["7.6\" foldable AMOLED", "Multi-window multitasking", "S Pen support", "Flex Mode"],
    useCase: "Ideal for business users, multitaskers, and early adopters of new tech."
  },
  { id: 53, name: "MacBook Air M3 (2024)", price: "$1199", image: "/assets/laptops1.jpeg", category: "laptops",
    description: "Ultra-thin and powerful MacBook Air with Apple's latest M3 chip, delivering exceptional battery life and speed.",
    features: ["Apple M3 chip", "13.6\" Retina display", "Up to 18 hours battery life"],
    useCase: "Ideal for students, professionals, and light creative tasks." },

  { id: 54, name: "MacBook Pro 16\" M3 Max", price: "$3299", image: "/assets/laptops2.jpeg", category: "laptops",
    description: "High-end performance laptop for creators and developers, packed with M3 Max chip and incredible graphics.",
    features: ["M3 Max chip", "32-core GPU", "Liquid Retina XDR display"],
    useCase: "Perfect for video editing, 3D rendering, and heavy development work." },

  { id: 55, name: "Dell XPS 15 (2024)", price: "$1499", image: "/assets/laptops3.jpeg", category: "laptops",
    description: "Premium Windows laptop with a stunning OLED display and strong internals packed in a sleek chassis.",
    features: ["Intel Core i7 14th Gen", "NVIDIA RTX 4050", "3.5K OLED touchscreen"],
    useCase: "Great for designers, coders, and multimedia professionals." },

  { id: 56, name: "HP Spectre x360 14", price: "$1399", image: "/assets/laptops4.jpeg", category: "laptops",
    description: "Convertible 2-in-1 laptop with excellent battery and a vivid touchscreen, perfect for on-the-go productivity.",
    features: ["Intel Evo platform", "360° hinge", "AMOLED touchscreen"],
    useCase: "Best for business travelers and digital artists." },

  { id: 57, name: "Lenovo ThinkPad X1 Carbon Gen 12", price: "$1799", image: "/assets/laptops5.jpeg", category: "laptops",
    description: "Business-class ultra-light laptop with military-grade durability and superb keyboard experience.",
    features: ["Intel Core Ultra 7", "Dolby Vision display", "Carbon fiber build"],
    useCase: "Made for enterprise users, consultants, and remote workers." },

  { id: 58, name: "Asus ROG Zephyrus G14 (2024)", price: "$1599", image: "/assets/laptops6.jpeg", category: "laptops",
    description: "Compact gaming powerhouse with AMD Ryzen and NVIDIA RTX for top-tier portable performance.",
    features: ["Ryzen 9 8945HS", "RTX 4060 GPU", "QHD+ 165Hz display"],
    useCase: "Perfect for gaming, streaming, and content creation." },

  { id: 59, name: "Acer Swift X 14", price: "$1099", image: "/assets/laptops7.jpeg", category: "laptops",
    description: "Budget-friendly creative laptop with strong specs and portability for students and creators.",
    features: ["Intel Core i7", "RTX 3050", "14\" 2.5K display"],
    useCase: "Great for photo editing, web development, and school work." },

  { id: 60, name: "Microsoft Surface Laptop 6", price: "$1399", image: "/assets/laptops8.jpeg", category: "laptops",
    description: "Sleek productivity laptop by Microsoft with powerful internals and clean Windows 11 experience.",
    features: ["Intel Core Ultra 7", "13.5\" PixelSense touchscreen", "Premium build quality"],
    useCase: "Best for professionals, educators, and business users." },

  { id: 61, name: "Apple Watch Series 9", price: "$399", image: "/assets/smartwatchs1.jpeg", category: "smartwatchs",
    description: "Advanced smartwatch with double tap gesture, always-on Retina display, and health tracking.",
    features: ["S9 chip", "Blood Oxygen & ECG apps", "Always-On Retina display"],
    useCase: "Ideal for iPhone users, fitness tracking, and health monitoring." },

  { id: 62, name: "Samsung Galaxy Watch 6", price: "$299", image: "/assets/smartwatchs2.jpeg", category: "smartwatchs",
    description: "Feature-rich Wear OS smartwatch with a stunning display and advanced health sensors.",
    features: ["BioActive Sensor", "Sleep Coaching", "AMOLED display"],
    useCase: "Best for Android users focused on health and seamless Samsung ecosystem integration." },

  { id: 63, name: "Garmin Venu 3", price: "$449", image: "/assets/smartwatchs3.jpeg", category: "smartwatchs",
    description: "Premium GPS smartwatch with long battery life and comprehensive fitness features.",
    features: ["Up to 14-day battery", "Built-in GPS", "Advanced sleep tracking"],
    useCase: "Perfect for outdoor fitness enthusiasts and athletes." },

  { id: 64, name: "Fitbit Versa 4", price: "$199", image: "/assets/smartwatchs4.jpeg", category: "smartwatchs",
    description: "Affordable fitness-focused smartwatch with heart rate tracking and built-in Alexa.",
    features: ["24/7 heart rate", "Built-in GPS", "Voice assistant support"],
    useCase: "Best for beginners or casual users focusing on basic fitness goals." },

  { id: 65, name: "Google Pixel Watch 2", price: "$349", image: "/assets/smartwatchs5.jpeg", category: "smartwatchs",
    description: "Sleek smartwatch designed for Pixel users with Fitbit health tracking and Wear OS.",
    features: ["Fitbit integration", "Safety Check", "Fast charging"],
    useCase: "Great for Pixel phone users who want a premium Google ecosystem experience." },

  { id: 66, name: "Amazfit GTR 4", price: "$179", image: "/assets/smartwatchs6.jpeg", category: "smartwatchs",
    description: "Stylish and affordable smartwatch with a wide range of sports modes and accurate GPS.",
    features: ["Dual-band GPS", "150+ sport modes", "Alexa built-in"],
    useCase: "Great for fitness lovers wanting solid features at a budget-friendly price." },

  { id: 67, name: "OnePlus Watch 2", price: "$299", image: "/assets/smartwatchs7.jpeg", category: "smartwatchs",
    description: "Battery-focused smartwatch with dual-engine architecture and Wear OS 4.",
    features: ["Dual OS system", "100-hour battery", "Military-grade durability"],
    useCase: "Ideal for OnePlus users and long battery seekers." },

  { id: 68, name: "Noise ColorFit Ultra 3", price: "$79", image: "/assets/smartwatchs8.jpeg", category: "smartwatchs",
    description: "Value smartwatch from Noise with AMOLED display and Bluetooth calling.",
    features: ["1.96\" AMOLED", "BT Calling", "Multiple watch faces"],
    useCase: "Great for budget-conscious users seeking stylish design and essential features." },
  
  {
    id: 69,
    name: "Samsung 55\" QLED 4K Smart TV",
    price: "$899",
    image: "/assets/smartTvs1.jpeg",
    category: "smartTvs",
    description: "A premium 4K QLED smart TV with Quantum Dot technology for vibrant colors and deep contrast.",
    features: ["Quantum Processor 4K", "Tizen OS", "Voice Assistant Support"],
    useCase: "Ideal for home theaters and streaming with vivid color and smart control features."
  },
  {
    id: 70,
    name: "Sony Bravia 65\" OLED 4K TV",
    price: "$1,799",
    image: "/assets/smartTvs2.jpeg",
    category: "smartTvs",
    description: "Top-tier OLED Smart TV with deep blacks and stunning visuals, powered by Google TV.",
    features: ["Cognitive Processor XR", "Dolby Vision", "Hands-Free Google Assistant"],
    useCase: "Best for cinema lovers and gamers wanting exceptional picture quality."
  },
  {
    id: 71,
    name: "LG 50\" 4K UHD Smart TV",
    price: "$599",
    image: "/assets/smartTvs3.jpeg",
    category: "smartTvs",
    description: "A powerful 4K TV with AI ThinQ, HDR support, and webOS for smart features.",
    features: ["α5 AI Processor", "HDR10 Pro", "Magic Remote"],
    useCase: "Perfect for mid-size living rooms and casual binge-watching."
  },
  {
    id: 72,
    name: "TCL 43\" 4K Roku Smart TV",
    price: "$349",
    image: "/assets/smartTvs4.jpeg",
    category: "smartTvs",
    description: "Affordable and user-friendly smart TV with built-in Roku and smooth streaming.",
    features: ["Roku TV Platform", "HDR Support", "Dual-Band Wi-Fi"],
    useCase: "Great choice for budget buyers and easy access to streaming apps."
  },
  {
    id: 73,
    name: "Hisense 65\" ULED 4K Smart TV",
    price: "$649",
    image: "/assets/smartTvs5.jpeg",
    category: "smartTvs",
    description: "ULED technology brings superior brightness, contrast, and motion with Google TV built-in.",
    features: ["Dolby Vision & Atmos", "Game Mode Pro", "120Hz refresh rate"],
    useCase: "Ideal for gamers and sports lovers wanting fluid visuals and rich audio."
  },
  {
    id: 74,
    name: "OnePlus 55\" Y1S Pro 4K Smart TV",
    price: "$499",
    image: "/assets/smartTvs6.jpeg",
    category: "smartTvs",
    description: "Stylish and powerful 4K TV with OnePlus Connect and Android TV experience.",
    features: ["Android TV 10", "Gamma Engine", "Hands-Free Voice Control"],
    useCase: "Perfect for tech-savvy users looking for value and smooth Android integration."
  },
  {
    id: 75,
    name: "Mi 55\" 4K Horizon Edition TV",
    price: "$459",
    image: "/assets/smartTvs7.jpeg",
    category: "smartTvs",
    description: "Smart TV with immersive display, PatchWall UI, and Vivid Picture Engine for enhanced clarity.",
    features: ["Bezel-less Design", "Vivid Picture Engine", "Google Assistant"],
    useCase: "Ideal for modern households seeking stylish design and smart UI."
  },
  {
    id: 76,
    name: "Vu 65\" 4K Premium Smart TV",
    price: "$579",
    image: "/assets/smartTvs8.jpeg",
    category: "smartTvs",
    description: "A value-packed 4K smart TV with Dolby Vision, MEMC, and advanced upscaling.",
    features: ["Dolby Vision + HDR10", "Dynamic Backlight", "Smart Remote"],
    useCase: "Great for budget-conscious families wanting a big screen with premium features."
  },
  ],
  toys: [
    {
    id: 77,
    name: "Iron Man Action Figure",
    price: "$49",
    image: "/assets/actiontoys1.jpeg",
    category: "actiontoys",
    description: "Highly detailed Iron Man collectible with articulated joints and battle armor design.",
    features: ["Poseable limbs", "Premium paint finish", "6-inch scale", "Collector's edition"],
    useCase: "Perfect for Marvel fans and collectors looking to enhance their superhero display shelf."
  },
  {
    id: 78,
    name: "Gojo Satoru Figure",
    price: "$42",
    image: "/assets/actiontoys2.jpeg",
    category: "actiontoys",
    description: "Stylish figure of the iconic Jujutsu Kaisen character with his signature blindfold.",
    features: ["Anime-accurate design", "Dynamic pose", "Sturdy base stand", "Collectible packaging"],
    useCase: "Ideal for anime enthusiasts and Jujutsu Kaisen fans seeking high-quality display pieces."
  },
  {
    id: 79,
    name: "Spider-Man with Swords",
    price: "$54",
    image: "/assets/actiontoys3.jpeg",
    category: "actiontoys",
    description: "Unique Spider-Man action figure wielding dual swords with a heroic stance.",
    features: ["Dual accessories", "Flexible joints", "Detailed costume", "6.5-inch height"],
    useCase: "Great for imaginative play or collectors who enjoy unique superhero variants."
  },
  {
    id: 80,
    name: "Carnage Statue",
    price: "$59",
    image: "/assets/actiontoys4.jpeg",
    category: "actiontoys",
    description: "Terrifyingly cool Carnage statue with incredible detail and dynamic sculpt.",
    features: ["Intricate sculpting", "High-quality resin", "Collector's display base", "Red symbiote texture"],
    useCase: "A must-have for Venomverse fans who appreciate dark, villainous character art."
  },
  {
    id: 81,
    name: "Spider-Man Action Figure",
    price: "$47",
    image: "/assets/actiontoys5.jpeg",
    category: "actiontoys",
    description: "Classic Spider-Man figure ready to swing into action with articulated limbs.",
    features: ["Iconic red-blue suit", "Web accessory", "Poseable body", "Kid-safe design"],
    useCase: "Perfect for kids and fans who want a versatile and fun Spider-Man figure."
  },
  {
    id: 82,
    name: "Iron Man Armor",
    price: "$64",
    image: "/assets/actiontoys6.jpeg",
    category: "actiontoys",
    description: "Armored Iron Man figure featuring a glowing chest arc reactor and sleek finish.",
    features: ["LED arc reactor", "Heavy armor detail", "Rotating joints", "Comic-style look"],
    useCase: "Ideal for collectors of high-tech suits and Iron Man legacy gear."
  },
  {
    id: 83,
    name: "Hulkbuster Iron Man 1/12th Scale Collectible Figure",
    price: "$79",
    image: "/assets/actiontoys7.jpeg",
    category: "actiontoys",
    description: "Massive Hulkbuster suit replica from the Avengers saga with intricate articulation.",
    features: ["Massive size", "Movable parts", "Movie-accurate detail", "Display-ready"],
    useCase: "Ultimate addition to any Avengers collection or fan of high-end Marvel collectibles."
  },
  {
    id: 84,
    name: "Batman Action Figure",
    price: "$51",
    image: "/assets/actiontoys8.jpeg",
    category: "actiontoys",
    description: "Gritty Batman figure modeled after the Dark Knight’s armored combat suit.",
    features: ["Utility belt detail", "Cape included", "Sturdy material", "Posing stand"],
    useCase: "Excellent for fans of DC Comics and superhero action poses."
  },
  {
    id: 85,
    name: "Batman Action Figure",
    price: "$53",
    image: "/assets/actiontoys9.jpeg",
    category: "actiontoys",
    description: "Classic Batman in blue-gray suit with bat-symbol and batarang accessory.",
    features: ["Retro costume design", "Included weapons", "High durability", "Comic-inspired look"],
    useCase: "Great for nostalgic collectors and Batman fans of all ages."
  },
  {
    id: 86,
    name: "CRH Remote Control Train",
    price: "$349",
    image: "/assets/remotecontroltoys1.jpeg",
    category: "remotecontroltoys",
    description: "High-speed CRH bullet train model with remote control functionality for smooth gliding motion.",
    features: ["Wireless remote", "Realistic train sounds", "LED headlights", "Rechargeable battery"],
    useCase: "Great for train enthusiasts and children interested in modern rail transport."
  },
  {
    id: 87,
    name: "Robot Titan-32",
    price: "$499",
    image: "/assets/remotecontroltoys2.jpeg",
    category: "remotecontroltoys",
    description: "A programmable robotic toy with lights, sound, and walking capabilities.",
    features: ["Voice control mode", "Programmable actions", "Dancing & walking", "LED facial display"],
    useCase: "Ideal for STEM learning and kids who enjoy tech-savvy toys."
  },
  {
    id: 88,
    name: "Police Car Transformer Toy",
    price: "$399",
    image: "/assets/remotecontroltoys3.jpeg",
    category: "remotecontroltoys",
    description: "A transforming police car that shifts into a robot with remote control commands.",
    features: ["One-button transformation", "Police siren effects", "360° spin", "LED lights"],
    useCase: "Perfect for action-loving kids and fans of transformation toys."
  },
  {
    id: 89,
    name: "SMART PICKS",
    price: "$359",
    image: "/assets/remotecontroltoys4.jpeg",
    category: "remotecontroltoys",
    description: "Sleek remote control car with stylish design and smooth steering mechanics.",
    features: ["2.4GHz remote", "Front/rear LED lights", "Durable plastic body", "Rechargeable battery"],
    useCase: "Suitable for casual indoor/outdoor RC car driving fun."
  },
  {
    id: 90,
    name: "Remote Control Transforming Car Robot",
    price: "$429",
    image: "/assets/remotecontroltoys5.jpeg",
    category: "remotecontroltoys",
    description: "Dual-function remote car that converts into a standing robot within seconds.",
    features: ["Automatic transformation", "Cool sound effects", "LED robot eyes", "High-speed wheels"],
    useCase: "Fun for kids who love racing and robotic transformation in one toy."
  },
  {
    id: 91,
    name: "Remote Control Transforming Car Robot",
    price: "$429",
    image: "/assets/remotecontroltoys6.jpeg",
    category: "remotecontroltoys",
    description: "Another stylish transforming RC car robot with high mobility and striking lights.",
    features: ["Easy transformation", "Stunt spinning", "Bright LEDs", "Durable wheels"],
    useCase: "Best for interactive play and racing battles between robots."
  },
  {
    id: 92,
    name: "Remote-controlled robotic dinosaur",
    price: "$459",
    image: "/assets/remotecontroltoys7.jpeg",
    category: "remotecontroltoys",
    description: "A lifelike robotic dinosaur toy that roars, walks, and lights up with remote control.",
    features: ["Dinosaur sounds", "Walking motion", "Colorful lights", "Rechargeable battery"],
    useCase: "Exciting toy for dinosaur fans and imaginative prehistoric play."
  },
  {
    id: 93,
    name: "Wild Hunt",
    price: "$379",
    image: "/assets/remotecontroltoys8.jpeg",
    category: "remotecontroltoys",
    description: "All-terrain remote control buggy built for speed and stunts outdoors.",
    features: ["Shock-absorbing tires", "High-speed motors", "4-wheel drive", "2.4GHz range"],
    useCase: "Ideal for outdoor RC racing and stunt driving on rough terrain."
  },
  {
    id: 94,
    name: "ARMOR REMOTE CONTROL",
    price: "$389",
    image: "/assets/remotecontroltoys9.jpeg",
    category: "remotecontroltoys",
    description: "Futuristic RC armored vehicle with a bold design and extreme stunt capabilities.",
    features: ["360° spin", "Anti-collision body", "Remote stunt control", "LED tire lights"],
    useCase: "Great for kids who enjoy stylish RC cars with aggressive driving features."
  },
  {
    id: 95,
    name: "Remote Control Formula 1 Car",
    price: "$419",
    image: "/assets/remotecontroltoys10.jpeg",
    category: "remotecontroltoys",
    description: "High-speed F1 car replica with remote steering and race-like acceleration.",
    features: ["F1 body design", "Precise turning radius", "Smooth grip tires", "Rechargeable power"],
    useCase: "Perfect for racing fans and kids who love fast, realistic RC cars."
  },
  {
    id: 96,
    name: "Remote Control Stunt Car",
    price: "$449",
    image: "/assets/remotecontroltoys11.jpeg",
    category: "remotecontroltoys",
    description: "A 4WD stunt car that can flip, rotate, and handle rough surfaces with ease.",
    features: ["Double-sided drive", "360° rotation", "LED wheels", "Shockproof build"],
    useCase: "Fun for high-action stunts indoors or on outdoor terrain like grass and gravel."
  },
    {
      id: 97,
      name: "CuddleMochi Teddy Bear",
      price: "$29",
      image: "/assets/softteddytoys1.jpeg",
      category: "softteddytoys",
      description: "Super soft teddy bear with a cuddly, mochi-like texture.",
      features: ["Premium plush material", "Machine washable", "Non-toxic", "Perfect hug size"],
      useCase: "Ideal for kids and adults seeking a snuggly bedtime companion."
    },
    {
      id: 98,
      name: "Lilac Cuddle Duo Teddy Bear",
      price: "$34",
      image: "/assets/softteddytoys2.jpeg",
      category: "softteddytoys",
      description: "Adorable lilac-colored teddy duo that’s perfect for twin cuddles.",
      features: ["Comes as a pair", "Soft lilac color", "Child-safe design", "Velvety texture"],
      useCase: "Best for gifting on birthdays and anniversaries or as nursery decor."
    },
    {
      id: 99,
      name: "Blue Stitch Plush",
      price: "$25",
      image: "/assets/softteddytoys3.jpeg",
      category: "softteddytoys",
      description: "Fan-favorite Stitch in plush form, perfect for Disney lovers.",
      features: ["Authentic Stitch design", "Ultra-soft fabric", "Compact and portable", "Durable stitching"],
      useCase: "Great for collectors or kids who love Disney characters."
    },
    {
      id: 100,
      name: "Plush Shark Toy",
      price: "$27",
      image: "/assets/softteddytoys4.jpeg",
      category: "softteddytoys",
      description: "Cute and huggable shark plush that’s more friend than fearsome.",
      features: ["Ocean-themed design", "Smooth plush finish", "Child-friendly eyes", "Flexible fins"],
      useCase: "Perfect for marine animal lovers and bedtime cuddle sessions."
    },
    {
      id: 101,
      name: "Pikachu Plush Toy",
      price: "$30",
      image: "/assets/softteddytoys5.jpeg",
      category: "softteddytoys",
      description: "Plush Pikachu ready to electrify your cuddle game!",
      features: ["Official Pokémon design", "Bright yellow color", "Soft cheeks", "Sturdy tail"],
      useCase: "Perfect for Pokémon fans and playful home decor."
    },
    {
      id: 102,
      name: "GROIC Plush Toy",
      price: "$33",
      image: "/assets/softteddytoys6.jpeg",
      category: "softteddytoys",
      description: "Cute and quirky GROIC plush character that sparks imagination.",
      features: ["Unique stylized look", "Hypoallergenic stuffing", "Soft limbs", "Child-safe"],
      useCase: "Ideal for gifting to creative kids or adding personality to a plush collection."
    },
    {
      id: 103,
      name: "Light Brown Plush Teddy Bear",
      price: "$28",
      image: "/assets/softteddytoys7.jpeg",
      category: "softteddytoys",
      description: "Classic light brown teddy with timeless charm and endless softness.",
      features: ["Traditional bear design", "Comfort-grip limbs", "Huggable size", "Embroidered eyes"],
      useCase: "Great as a baby shower gift or for soothing nighttime cuddles."
    },
    {
      id: 104,
      name: "Brown Teddy Bear",
      price: "$27",
      image: "/assets/softteddytoys8.jpeg",
      category: "softteddytoys",
      description: "Warm and cozy brown bear that fits perfectly in every hug.",
      features: ["Deep brown color", "Soft to the touch", "Friendly facial features", "Durable stuffing"],
      useCase: "Best companion for toddlers or room decor for plush collectors."
    },
    {
      id: 105,
      name: "Pooh Bear Plush Toy",
      price: "$32",
      image: "/assets/softteddytoys9.jpeg",
      category: "softteddytoys",
      description: "Beloved Winnie the Pooh in a soft, collectible plush form.",
      features: ["Iconic red shirt", "Chubby design", "Classic Pooh expression", "Soft, rounded edges"],
      useCase: "Perfect for Winnie the Pooh fans or themed kids’ rooms."
    },
    {
      id: 106,
      name: "Plush Toy Dog with Red Scarf",
      price: "$26",
      image: "/assets/softteddytoys10.jpeg",
      category: "softteddytoys",
      description: "Charming dog plush with a cozy red scarf that adds a splash of style.",
      features: ["Realistic dog design", "Removable scarf", "Loyal companion expression", "Silky fur feel"],
      useCase: "Great gift for pet lovers or as a bedtime buddy for little ones."
    },
    {
      id: 107,
      name: "Two Hugging Plush Dogs",
      price: "$35",
      image: "/assets/softteddytoys11.jpeg",
      category: "softteddytoys",
      description: "Adorable twin pups hugging each other tightly – heart-melting cuteness.",
      features: ["Attached hugging design", "Soft brown and white plush", "Symbol of friendship", "Compact form"],
      useCase: "Perfect for expressing love or friendship gifts on special occasions."
    },
    {
      id: 108,
      name: "Cute Plush Toy with Purple Hair",
      price: "$29",
      image: "/assets/softteddytoys12.jpeg",
      category: "softteddytoys",
      description: "Whimsical plush character with playful purple hair and a cheerful vibe.",
      features: ["Bright purple hair", "Stylized cartoon look", "Soft limbs and body", "Great cuddle size"],
      useCase: "Ideal for imaginative play or adding color to a plush collection."
    },
  ],
  books:[
  {
    id: 109,
    name: "Two Colleen Hoover Books",
    price: "$34",
    image: "/assets/fictionbooks1.jpeg",
    category: "fictionbooks",
    description: "A bestselling duo from Colleen Hoover exploring emotional romance and personal growth.",
    features: ["Emotionally gripping", "Modern romance", "Character-driven storytelling", "Highly rated on Goodreads"],
    useCase: "Ideal for readers who enjoy contemporary romance with deep emotional themes."
  },
  {
    id: 110,
    name: "All the Light We Cannot See",
    price: "$22",
    image: "/assets/fictionbooks2.jpeg",
    category: "fictionbooks",
    description: "A Pulitzer Prize-winning novel set in WWII, following the lives of a blind French girl and a German boy.",
    features: ["Historical fiction", "Pulitzer Prize winner", "Dual narrative", "Beautiful prose"],
    useCase: "Great for fans of literary fiction and WWII narratives."
  },
  {
    id: 111,
    name: "The Girl on the Train",
    price: "$19",
    image: "/assets/fictionbooks3.jpeg",
    category: "fictionbooks",
    description: "A psychological thriller about a woman who becomes entangled in a missing person investigation.",
    features: ["Suspenseful plot", "Unreliable narrator", "Bestseller", "Film adaptation"],
    useCase: "Perfect for readers who love gripping thrillers and psychological mysteries."
  },
  {
    id: 112,
    name: "Powerless, Reckless, and Powerful",
    price: "$39",
    image: "/assets/fictionbooks4.jpeg",
    category: "fictionbooks",
    description: "A set of emotionally rich romance novels dealing with power, vulnerability, and love.",
    features: ["New adult romance", "Strong character arcs", "Trilogy set", "Fan favorite series"],
    useCase: "Best for readers looking for engaging romance series with emotional depth."
  },
  {
    id: 113,
    name: "The Secret Lives of Introverts",
    price: "$18",
    image: "/assets/fictionbooks5.jpeg",
    category: "fictionbooks",
    description: "An insightful guide to understanding and embracing introversion in a noisy world.",
    features: ["Non-fiction blend", "Personality insights", "Empowering voice", "Highly relatable"],
    useCase: "Recommended for introverts and those wanting to better understand themselves or others."
  },
  {
    id: 114,
    name: "Everything I Never Told You by Celeste Ng",
    price: "$21",
    image: "/assets/fictionbooks6.jpeg",
    category: "fictionbooks",
    description: "A compelling story about family, identity, and secrets in 1970s America.",
    features: ["Character-driven", "Emotional depth", "Critically acclaimed", "Explores race and identity"],
    useCase: "Ideal for fans of literary fiction and family dramas."
  },
  {
    id: 115,
    name: "A Walk to Remember",
    price: "$17",
    image: "/assets/fictionbooks7.jpeg",
    category: "fictionbooks",
    description: "Nicholas Sparks' touching tale of young love, loss, and transformation.",
    features: ["Romantic drama", "Classic tearjerker", "Coming-of-age", "Beloved film adaptation"],
    useCase: "Perfect for romance lovers who enjoy heartfelt, sentimental stories."
  },
  {
    id: 117,
    name: "They Both Die at the End by Adam Silvera",
    price: "$20",
    image: "/assets/fictionbooks9.jpeg",
    category: "fictionbooks",
    description: "A unique and emotional story of two teens who meet on their last day alive.",
    features: ["LGBTQ+ themes", "YA fiction", "Unique concept", "Heartfelt message"],
    useCase: "Great for young adults and readers looking for stories about life, death, and connection."
  },
  {
    id: 118,
    name: "The Mountain Is You by Brianna Wiest",
    price: "$24",
    image: "/assets/personaldevelopmentbooks1.jpeg",
    category: "personaldevelopmentbooks",
    description: "A guide to transforming self-sabotage into strength through emotional intelligence and self-awareness.",
    features: ["Explores emotional growth", "Self-sabotage analysis", "Practical exercises"],
    useCase: "Ideal for individuals seeking to overcome internal struggles and lead a purpose-driven life."
  },
  {
    id: 119,
    name: "Ego is the Enemy Book Cover",
    price: "$22",
    image: "/assets/personaldevelopmentbooks2.jpeg",
    category: "personaldevelopmentbooks",
    description: "Ryan Holiday breaks down how ego can hold back personal and professional growth.",
    features: ["Stories of historical figures", "Stoic philosophy insights", "Actionable mindset shifts"],
    useCase: "Perfect for leaders, creatives, and entrepreneurs aiming to manage ego and focus on growth."
  },
  {
    id: 120,
    name: "The Science of Self-Discipline by Peter Hollins",
    price: "$20",
    image: "/assets/personaldevelopmentbooks3.jpeg",
    category: "personaldevelopmentbooks",
    description: "A research-backed guide to building lasting habits, willpower, and focus.",
    features: ["Psychological principles", "Behavioral techniques", "Habit-forming strategies"],
    useCase: "Great for students, professionals, or anyone looking to improve productivity and self-control."
  },
  {
    id: 121,
    name: "Single. On Purpose. by John Kim",
    price: "$21",
    image: "/assets/personaldevelopmentbooks4.jpeg",
    category: "personaldevelopmentbooks",
    description: "A bold take on embracing singlehood for personal growth and self-love.",
    features: ["Relatable storytelling", "Therapeutic insights", "Empowering lessons"],
    useCase: "Best for those navigating breakups or choosing to grow independently."
  },
  {
    id: 122,
    name: "The Power of Letting Go Book Cover",
    price: "$23",
    image: "/assets/personaldevelopmentbooks5.jpeg",
    category: "personaldevelopmentbooks",
    description: "Helps readers release control, embrace change, and live more freely.",
    features: ["Mindfulness tips", "Letting go exercises", "Inspiring anecdotes"],
    useCase: "For readers looking to reduce anxiety and build a more peaceful mindset."
  },
  {
    id: 123,
    name: "You Become What You Think",
    price: "$19",
    image: "/assets/personaldevelopmentbooks6.jpeg",
    category: "personaldevelopmentbooks",
    description: "Teaches the impact of thoughts on reality and how to reshape your mindset for success.",
    features: ["Positive thinking tools", "Affirmation strategies", "Visualization practices"],
    useCase: "Ideal for beginners in personal development or those wanting to shift toward a growth mindset."
  },
  {
    id: 124,
    name: "Thinking, Fast and Slow by Daniel Kahneman",
    price: "$28",
    image: "/assets/personaldevelopmentbooks7.jpeg",
    category: "personaldevelopmentbooks",
    description: "Nobel laureate Daniel Kahneman explores the two systems that drive human thinking.",
    features: ["System 1 vs. System 2 theory", "Cognitive biases", "Decision-making science"],
    useCase: "Essential reading for critical thinkers, analysts, and anyone interested in human behavior."
  },
  {
    id: 125,
    name: "Master Your Emotions Book Cover",
    price: "$21",
    image: "/assets/personaldevelopmentbooks8.jpeg",
    category: "personaldevelopmentbooks",
    description: "A practical guide to understanding and managing emotions for a more peaceful life.",
    features: ["Emotion regulation tools", "Mindset techniques", "Real-life scenarios"],
    useCase: "Useful for anyone dealing with stress, anxiety, or emotional turbulence."
  },
  {
    id: 126,
    name: "Do the Hard Things First by Scott Allan",
    price: "$21",
    image: "/assets/educationalbooks1.jpeg",
    category: "educationalbooks",
    description: "A guide to overcoming procrastination by embracing discipline and getting difficult tasks done first.",
    features: [
      "Action-oriented strategies",
      "Productivity boosting techniques",
      "Mindset reprogramming"
    ],
    useCase: "Ideal for students, professionals, and entrepreneurs aiming to improve time management and discipline."
  },
  {
    id: 127,
    name: "The Laws of Human Nature by Robert Greene",
    price: "$28",
    image: "/assets/educationalbooks2.jpeg",
    category: "educationalbooks",
    description: "An insightful exploration of human behavior, helping you better understand others and master social dynamics.",
    features: [
      "Historical examples",
      "Psychological insights",
      "Tactical interpersonal skills"
    ],
    useCase: "Perfect for leaders, marketers, and individuals aiming to enhance their emotional and social intelligence."
  },
  {
    id: 128,
    name: "Physical Intelligence by Claire Dale and Patricia Peyton",
    price: "$24",
    image: "/assets/educationalbooks3.jpeg",
    category: "educationalbooks",
    description: "Learn how your body intelligence affects performance, confidence, and resilience.",
    features: [
      "Body-mind connection tools",
      "Energy and posture techniques",
      "Improved communication methods"
    ],
    useCase: "Great for professionals and athletes looking to enhance physical presence and stress management."
  },
  {
    id: 129,
    name: "Dopamine Detox by Thibaut Meurisse",
    price: "$18",
    image: "/assets/educationalbooks4.jpeg",
    category: "educationalbooks",
    description: "A modern guide to regaining focus and self-control by rewiring your brain’s reward system.",
    features: [
      "Digital minimalism tips",
      "Focus-building routines",
      "Science-based approach"
    ],
    useCase: "Helpful for digital natives and productivity seekers wanting to reclaim attention and reduce overstimulation."
  },
  {
    id: 130,
    name: "Master Your Potential by Thibaut Meurisse",
    price: "$22",
    image: "/assets/educationalbooks5.jpeg",
    category: "educationalbooks",
    description: "Unlock your hidden capabilities and take actionable steps toward personal excellence.",
    features: [
      "Goal clarity framework",
      "Self-motivation exercises",
      "Daily discipline habits"
    ],
    useCase: "Targeted at self-driven individuals, coaches, and personal development enthusiasts."
  },
  {
    id: 131,
    name: "How to Listen with Intention",
    price: "$20",
    image: "/assets/educationalbooks6.jpeg",
    category: "educationalbooks",
    description: "Improve your listening skills to build deeper relationships and communicate with empathy and influence.",
    features: [
      "Active listening frameworks",
      "Psychological communication insights",
      "Non-verbal cue reading"
    ],
    useCase: "Essential for managers, teachers, and anyone looking to enhance their interpersonal communication."
  },
  {
    id: 132,
    name: "Visual Thinking by Temple Grandin",
    price: "$26",
    image: "/assets/educationalbooks7.jpeg",
    category: "educationalbooks",
    description: "An exploration into the minds of visual thinkers and how their unique processing styles can solve real-world problems.",
    features: [
      "Scientific and educational perspective",
      "Real-world application stories",
      "Neurodiversity insights"
    ],
    useCase: "Great for educators, parents, and creatives wanting to understand or support visual learners."
  },
  {
    id: 133,
    name: "The Organized Mind",
    price: "$27",
    image: "/assets/educationalbooks8.jpeg",
    category: "educationalbooks",
    description: "Daniel Levitin explains how to manage information overload by applying neuroscience-based organizational strategies.",
    features: [
      "Cognitive productivity methods",
      "Decision-making enhancements",
      "Real-life applications"
    ],
    useCase: "Perfect for busy professionals, students, and multitaskers looking to stay sharp and focused."
  },
  {
    id: 134,
    name: "Your Brain is Playing Tricks on You",
    price: "$19",
    image: "/assets/educationalbooks9.jpeg",
    category: "educationalbooks",
    description: "An eye-opening look into how cognitive biases shape our thinking and lead to irrational decisions.",
    features: [
      "Bias breakdowns",
      "Behavioral economics",
      "Brain misfires explained"
    ],
    useCase: "Great for anyone interested in psychology, decision-making, and rational thinking."
  },
  {
    id: 135,
    name: "Win Every Argument by Mehdi Hasan",
    price: "$23",
    image: "/assets/educationalbooks10.jpeg",
    category: "educationalbooks",
    description: "A masterclass in persuasive communication, debate tactics, and speaking with confidence.",
    features: [
      "Debate frameworks",
      "Logical rebuttal tools",
      "Public speaking strategies"
    ],
    useCase: "Ideal for debaters, students, professionals, and anyone who wants to argue effectively and ethically."
  }
  
  ]
};

// Function to clean price strings like "$1,299" -> 1299
function parsePrice(price) {
  if (typeof price === "string") {
    // Remove $ and commas
    const cleaned = price.replace(/[$,]/g, "");
    const num = Number(cleaned);
    if (isNaN(num)) {
      console.error(`Invalid price for product: "${price}"`);
      return 0; // default fallback
    }
    return num;
  }
  return price; // already a number
}

// Convert all products' prices to numbers
for (const category in products) {
  products[category] = products[category].map(product => ({
    ...product,
    price: parsePrice(product.price)
  }));
}

mongoose.connect("mongodb://127.0.0.1:27017/myshop")
  .then(async () => {
    console.log("MongoDB connected");
    await Product.deleteMany({});
    // Flatten products object into single array
    const allProducts = Object.values(products).flat();
    await Product.insertMany(allProducts);
    console.log("All products inserted successfully!");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));

