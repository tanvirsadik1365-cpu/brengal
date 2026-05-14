const menuImagesBase = "/bengal/menu";

export const restaurant = {
  name: "Bengal - Indian & Bengali Cuisine",
  shortName: "Bengal",
  established: "",
  tagline: "Authentic Indian & Bengali Cuisine",
  heroLine: "High Street Winslow dining, takeaway and free local delivery.",
  description:
    "An Indian and Bengali restaurant on Winslow High Street serving aromatic curries, tandoori grills, Bengal specials, platters, biryani, collection and free local delivery.",
  phone: "01296 712222",
  secondaryPhone: "07913 990885",
  phoneHref: "tel:+441296712222",
  secondaryPhoneHref: "tel:+447913990885",
  email: "bengal.restaurant78@gmail.com",
  bookingEmail: "bengal.restaurant78@gmail.com",
  website: "bengal.restaurant",
  siteUrl: "https://bengal.orderdaily.uk",
  menuPdfUrl: "https://bengal.orderdaily.uk/imgd/menu.pdf",
  address: ["40 High St", "Winslow", "Buckingham MK18 3HB"],
  location: "40 High St, Winslow, Buckingham MK18 3HB",
  deliveryInfo: "Free delivery within 5 miles for MK18 and MK17 postcodes",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Bengal%20Restaurant%2C%2040%20High%20St%2C%20Winslow%2C%20Buckingham%20MK18%203HB",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Bengal%20Restaurant%2C%2040%20High%20St%2C%20Winslow%2C%20Buckingham%20MK18%203HB&output=embed",
  googleReviewsUrl:
    "https://www.google.com/search?q=Bengal+Indian+Bengali+Cuisine+Winslow+reviews",
  hours: [
    { days: "Lunch", time: "12.00pm - 2.30pm" },
    { days: "Dinner", time: "6.00pm - 10.30pm" },
    { days: "Sunday Buffet", time: "Lunch and dinner service" },
  ],
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Booking", href: "/booking" },
  { label: "Track Order", href: "/track-order" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export const menuFoodImages = {
  balti: `${menuImagesBase}/balti-curry.jpg`,
  bhindiBhaji: `${menuImagesBase}/bhindi-bhaji.jpg`,
  biryani: `${menuImagesBase}/biryani.jpg`,
  bombayAloo: `${menuImagesBase}/bombay-aloo.jpg`,
  brinjalBhaji: `${menuImagesBase}/brinjal-bhaji.jpg`,
  butterChicken: `${menuImagesBase}/butter-chicken.jpg`,
  chanaMasala: `${menuImagesBase}/chana-masala.jpg`,
  chapati: `${menuImagesBase}/chapati.jpg`,
  cheeseNaan: `${menuImagesBase}/cheese-naan.jpg`,
  chickenTikka: `${menuImagesBase}/chicken-tikka.jpg`,
  chilliPaneer: `${menuImagesBase}/chilli-paneer.jpg`,
  chips: `${menuImagesBase}/chips.jpg`,
  eggFriedRice: `${menuImagesBase}/egg-fried-rice.jpg`,
  fishCurry: `${menuImagesBase}/fish-curry.jpg`,
  garlicChutney: `${menuImagesBase}/garlic-chutney.jpg`,
  garlicNaan: `${menuImagesBase}/garlic-naan.jpg`,
  hotpot: `${menuImagesBase}/hotpot-curry.jpg`,
  jalfrezi: `${menuImagesBase}/jalfrezi-curry.jpg`,
  keemaNaan: `${menuImagesBase}/keema-naan.jpg`,
  korma: `${menuImagesBase}/korma-curry.jpg`,
  limePickle: `${menuImagesBase}/lime-pickle.jpg`,
  mangoChutney: `${menuImagesBase}/mango-chutney.jpg`,
  masala: `${menuImagesBase}/masala-curry.jpg`,
  mintSauce: `${menuImagesBase}/mint-sauce.jpg`,
  mixedGrill: `${menuImagesBase}/mixed-grill.jpg`,
  mushroomBhaji: `${menuImagesBase}/mushroom-bhaji.jpg`,
  mushroomRice: `${menuImagesBase}/mushroom-rice.jpg`,
  naan: `${menuImagesBase}/naan.jpg`,
  onionBhaji: `${menuImagesBase}/onion-bhaji.jpg`,
  onionFriedRice: `${menuImagesBase}/onion-fried-rice.jpg`,
  onionSalad: `${menuImagesBase}/onion-salad.jpg`,
  paneerCurry: `${menuImagesBase}/paneer-curry.jpg`,
  paneerShashlik: `${menuImagesBase}/paneer-shashlik.jpg`,
  paratha: `${menuImagesBase}/paratha.jpg`,
  peshwariNaan: `${menuImagesBase}/peshwari-naan.jpg`,
  pilauRice: `${menuImagesBase}/pilau-rice.jpg`,
  plainRice: `${menuImagesBase}/plain-rice.jpg`,
  poppadom: `${menuImagesBase}/poppadom.jpg`,
  prawnCurry: `${menuImagesBase}/prawn-curry.jpg`,
  raita: `${menuImagesBase}/raita.jpg`,
  rogan: `${menuImagesBase}/rogan-curry.jpg`,
  saagAloo: `${menuImagesBase}/saag-aloo.jpg`,
  saagCurry: `${menuImagesBase}/saag-curry.jpg`,
  saagPaneer: `${menuImagesBase}/saag-paneer.jpg`,
  samosa: `${menuImagesBase}/samosa.jpg`,
  seekhKebab: `${menuImagesBase}/seekh-kebab.jpg`,
  setMeal: `${menuImagesBase}/set-meal.jpg`,
  tandooriChicken: `${menuImagesBase}/tandoori-chicken.jpg`,
  tarkaDal: `${menuImagesBase}/tarka-dal.jpg`,
  vegetableBiryani: `${menuImagesBase}/vegetable-biryani.jpg`,
  vindaloo: `${menuImagesBase}/vindaloo-curry.jpg`,
};

export const foodImages = {
  hero: "/bengal/real/hero-feast-table.jpg",
  curry: menuFoodImages.butterChicken,
  biryani: menuFoodImages.biryani,
  tandoori: menuFoodImages.tandooriChicken,
  naan: menuFoodImages.naan,
  rice: menuFoodImages.pilauRice,
  restaurant: "/bengal/bengal-logo.png",
  exterior: "/bengal/real/storefront-black.jpg",
  sign: "/bengal/real/storefront-day.jpg",
  bar: menuFoodImages.mangoChutney,
  diningRoom: "/bengal/real/dining-room.jpg",
  starters: "/bengal/real/onion-bhaji.jpg",
  mainDishes: menuFoodImages.balti,
  vegetable: menuFoodImages.saagPaneer,
  sundries: menuFoodImages.poppadom,
  lambBalti: menuFoodImages.balti,
  hygiene: "/bengal/bengal-fvt-icon.png",
  halal: "/bengal/bengal-fvt-icon.png",
};

export const brandHeroImage = foodImages.hero;
export const logoImage = "/bengal/bengal-logo.png";

export const trustImages = {
  securePayments: "/bengal/trust/secure-payments.svg",
};

export const aboutImages = [
  { src: "/bengal/real/feast-table.jpg", alt: "Bengal food spread from the restaurant kitchen" },
  { src: "/bengal/real/naan-platter.jpg", alt: "Fresh naan bread served at Bengal" },
  { src: "/bengal/real/dining-room.jpg", alt: "Bengal dining room table setup" },
  { src: "/bengal/real/storefront-black.jpg", alt: "Bengal storefront on Winslow High Street" },
];

export const offers = [
  {
    title: "10% Direct Offer",
    detail: "A 10% Bengal offer is available on qualifying direct orders.",
    note: "Direct orders",
  },
  {
    title: "Free Local Delivery",
    detail: "Free delivery within 5 miles for MK18 and MK17 postcodes.",
    note: "Delivery area",
  },
  {
    title: "Public Sector Discount",
    detail:
      "The menu notes a 20% dine-in or collection discount for public sector workers with valid ID.",
    note: "ID required",
  },
  {
    title: "Sunday Buffet",
    detail: "Sunday buffet service is listed with adult and child pricing.",
    note: "Sunday service",
  },
];

export const diningOffer = {
  title: "Public Sector Offer",
  price: "20%",
  nonEaterPrice: "ID",
  discount: "20%",
  capacity: "Lunch and dinner",
  drinks: "Non-alcoholic drinks menu",
  details: [
    "20% for public sector workers with valid ID",
    "Dine-in or collection orders placed directly",
    "Cannot be combined with other offers",
    "Complimentary guest Wi-Fi available",
  ],
};

export const featuredDishes = [
  {
    name: "Bengal Boat Curry",
    description:
      "Tiger king prawns with green peppers, chillies, red onions, spring onions and coriander sauce.",
    price: "22.95",
    badge: "Bengal Special",
    image: menuFoodImages.prawnCurry,
  },
  {
    name: "Tandoori Mixed Grill",
    description:
      "Chicken tikka, tandoori chicken, sheek kebabs and lamb chops from the clay oven.",
    price: "18.95",
    badge: "Tandoor",
    image: menuFoodImages.mixedGrill,
  },
  {
    name: "Old Delhi Butter Chicken",
    description: "A mild chicken curry finished with butter and ghee sauce.",
    price: "15.95",
    badge: "Signature",
    image: menuFoodImages.butterChicken,
  },
];

export const menuCategories = [
  { name: "Classic Starters", count: "9", detail: "Samosas, tikka, kebabs, bhaji and puri" },
  { name: "Starters and Appetizers", count: "12", detail: "Scallops, squid, duck, chaat and Bengal appetisers" },
  { name: "Vegetarian Dishes", count: "11", detail: "Traditional vegetable curries and sides" },
  { name: "Tandoori Grill", count: "10", detail: "Paneer shashlick, mixed grill, duck and king prawn" },
  { name: "Individual and Sharing Platters", count: "4", detail: "Set meals and feast platters for one or groups" },
  { name: "Bengal Specials", count: "22", detail: "Boat curry, lamb shank, naga, balti and regional dishes" },
  { name: "Fish Dishes", count: "4", detail: "Cod curries with bhuna, Goan and Kerwalla styles" },
  { name: "Bengal Favourites", count: "55", detail: "Classic curry styles with chicken, lamb, prawn, duck and king prawn" },
  { name: "Rices", count: "8", detail: "Plain, pilau, keema, chilli and speciality rice" },
  { name: "Naans", count: "8", detail: "Fresh tandoor naan breads and stuffed options" },
  { name: "Extras", count: "5", detail: "Paratha, chapati, puri and papadoms" },
  { name: "Desserts", count: "4", detail: "Cheesecakes, cakes, gulab jamun and fried ice cream" },
  { name: "Drinks", count: "42", detail: "House mojitos, wines, beers, spirits, lassi and hot drinks" },
  { name: "Sunday Buffet", count: "2", detail: "Sunday lunch buffet and dinner service details" },
];

type MenuItem = {
  name: string;
  price: string;
  description?: string;
  popular?: boolean;
};

type MenuSection = {
  id: string;
  title: string;
  description: string;
  image: string;
  items: MenuItem[];
  priceNote?: string;
};

const favouriteProteins = [
  ["Chicken", "10.99"],
  ["Lamb", "11.99"],
  ["Prawn", "12.99"],
  ["King Prawn", "13.99"],
  ["Duck", "12.99"],
] as const;

const favouriteStyles = [
  {
    name: "Rogon Josh",
    description:
      "A rich and aromatic curry with signature red colour and a tomato-based sauce.",
  },
  {
    name: "Madras",
    description:
      "A bold South Indian curry with spicy and tangy medium-to-hot sauce.",
  },
  {
    name: "Vindaloo",
    description:
      "An intensely spiced fiery curry balanced by garlic, ginger and vinegar.",
  },
  {
    name: "Bhuna",
    description:
      "A semi-dry thick curry with concentrated flavour and less sauce.",
  },
  {
    name: "Curry",
    description:
      "The classic Indian curry with smooth sauce and mild-to-medium heat.",
  },
  {
    name: "Dhansak",
    description:
      "A sweet-and-sour Parsi-style curry cooked with lentils and spices.",
  },
  {
    name: "Dupiaza",
    description:
      "A medium curry where onions are used twice for rich flavour and texture.",
  },
  {
    name: "Jalfrezi",
    description:
      "A vibrant zesty curry with green chillies, onions and peppers in thick spicy tomato sauce.",
  },
  {
    name: "Kurma",
    description:
      "A mild creamy curry with yoghurt, coconut milk, cream and ground nuts.",
  },
  {
    name: "Pasanda",
    description:
      "A very mild creamy curry with a smooth rich yoghurt and cream sauce.",
  },
  {
    name: "Methi",
    description:
      "An aromatic curry with fenugreek leaves and a distinct herbal flavour.",
  },
] as const;

const favouriteItems: MenuItem[] = favouriteStyles.flatMap((style) =>
  favouriteProteins.map(([protein, price]) => ({
    name: `${style.name} ${protein}`,
    price,
    description: style.description,
    popular:
      (style.name === "Jalfrezi" && protein === "Chicken") ||
      (style.name === "Rogon Josh" && protein === "Lamb") ||
      (style.name === "Kurma" && protein === "Chicken"),
  })),
);

export const menuSections: MenuSection[] = [
  {
    id: "classic-starters",
    title: "Classic Starters",
    description: "Traditional starters from the Bengal menu.",
    image: menuFoodImages.samosa,
    items: [
      { name: "Vegetable Samosas", price: "7.95", description: "Filled pastry with vegetables and slight spice, shallow fried." },
      { name: "Meat Samosas", price: "8.95", description: "Filled pastry with mince lamb meat and slight spice, shallow fried." },
      { name: "Sheek Kebabs", price: "9.95", description: "Two minced lamb kebabs lightly spiced with herbs and cooked in a clay oven." },
      { name: "Lamb Tikka", price: "9.95", description: "Tender lamb marinated in yoghurt and spice sauce, cooked in a clay oven." },
      { name: "Chicken Tikka", price: "8.95", description: "Tender chicken breast marinated in yoghurt and spice sauce, cooked in a clay oven.", popular: true },
      { name: "Tandoori Chicken", price: "8.95", description: "Chicken breast or leg on the bone marinated in yoghurt and spice sauce." },
      { name: "Onion Bhaji", price: "5.95", description: "Onion in chickpea flour and spices, deep fried.", popular: true },
      { name: "Tandoori Lamb Chops", price: "12.95", description: "Four tender lamb chops marinated with yoghurt and spice sauce." },
      { name: "Prawn Puri", price: "9.95", description: "Medium spiced prawn cooked with onion and peppers, served shallow fried with Indian bread." },
    ],
  },
  {
    id: "starters-appetizers",
    title: "Starters and Appetizers",
    description: "Street-food snacks, seafood starters and Bengal appetisers.",
    image: menuFoodImages.onionBhaji,
    items: [
      { name: "Scallops", price: "12.95", description: "Fresh scallops cooked with garlic butter sauce and served with naan." },
      { name: "Squid", price: "12.95", description: "Fresh squid lightly cooked in onion and garlic sauce with naan." },
      { name: "Crab", price: "11.95", description: "Lightly stir-fried with onions and peppers, finished with chaat and spring onion." },
      { name: "Hash (Duck)", price: "10.95", description: "Tender pieces of duck breast marinated in yoghurt and cooked in tamarind and honey sauce." },
      { name: "Cha-Patta Wings", price: "10.95", description: "Tangy and spicy chicken wings cooked with chef's special sauce.", popular: true },
      { name: "Samosa Chatt", price: "10.95", description: "Vegetable samosa dressed in yoghurt, hot mango and coriander sauce." },
      { name: "Pani Puri", price: "8.95", description: "Traditional street food snack served in puri with onion, chickpeas and tamarind sauce." },
      { name: "Chicken Lollipop", price: "8.95", description: "Chicken wings cooked in tangy, spicy and sweet chilli sauce." },
      { name: "Dhai Puri", price: "9.95", description: "Shallow fried puri served with yoghurt and pomegranate." },
      { name: "Chicken 65", price: "9.95", description: "Tender chicken pieces cooked in garlic and chilli sauce." },
      { name: "Fish Amritsa", price: "12.95", description: "Tender cod piece, shallow fried in ajwain spice butter." },
      { name: "King Prawn Puri", price: "12.95", description: "Medium spiced king prawn cooked with onion and peppers, served shallow fried with Indian bread." },
    ],
  },
  {
    id: "vegetarian-dishes",
    title: "Vegetarian Dishes",
    description: "Vegetable sides from the Bengal menu.",
    image: menuFoodImages.saagPaneer,
    items: [
      { name: "Tarka Dhaal", price: "6.95", description: "Creamy lentil stew slow-cooked and finished with garlic, cumin and dried red chillies." },
      { name: "Bombay Aloo", price: "6.95", description: "Tender potatoes sauteed with onions, cumin seeds and a special spice blend." },
      { name: "Brinjal Bhaji", price: "6.95", description: "Aubergine and sweet onions cooked with traditional spices." },
      { name: "Broccoli Bhaji", price: "6.95", description: "Broccoli florets and sweet onions stir-fried with aromatic spices." },
      { name: "Cauliflower Bhaji", price: "6.95", description: "Cauliflower florets and sweet onions stir-fried with aromatic spices." },
      { name: "Mushroom Bhaji", price: "6.95", description: "Fresh mushrooms and sweet onions sauteed with traditional Indian spices." },
      { name: "Saag Bhaji", price: "6.95", description: "Spinach leaves and sweet onions stir-fried with spices." },
      { name: "Saag Paneer", price: "7.95", description: "Indian cottage cheese cubes cooked in creamy spinach gravy with mild spices.", popular: true },
      { name: "Chana Masala", price: "6.95", description: "Chickpeas slow-cooked in tangy tomato and onion gravy." },
      { name: "Aloo Gobi", price: "6.95", description: "Cauliflower florets and potatoes stir-fried with onions, tomatoes, turmeric and cumin." },
      { name: "Bhindi Bhaji", price: "6.95", description: "Tender okra and sweet onions cooked with traditional spices." },
    ],
  },
  {
    id: "tandoori-grill",
    title: "Tandoori Grill",
    description: "Clay-oven dishes served with mint sauce and salad.",
    image: menuFoodImages.mixedGrill,
    items: [
      { name: "Tandoori Paneer Shaslick", price: "13.95", description: "Indian cheese marinated and cooked with peppers, onions and tomatoes." },
      { name: "Tandoori Mixed Grill", price: "18.95", description: "Chicken tikka, tandoori chicken, sheek kebabs and lamb chops.", popular: true },
      { name: "Half Tandoori Chicken", price: "10.95", description: "Half chicken marinated with signature spices and cooked until smoky." },
      { name: "Full Tandoori Chicken", price: "16.95", description: "Whole chicken marinated with signature spices and cooked until smoky." },
      { name: "Chicken Shaslick", price: "16.95", description: "Chicken marinated and cooked with green peppers, onions and tomatoes." },
      { name: "Lamb Shaslick", price: "17.95", description: "Lamb marinated and cooked with peppers, onions and tomatoes." },
      { name: "Lamb Tikka Main", price: "15.95", description: "Marinated lamb cooked in the tandoor clay oven." },
      { name: "Chicken Tikka Main", price: "14.95", description: "Marinated chicken cooked in the tandoor clay oven." },
      { name: "Tandoori King Prawn", price: "19.95", description: "King prawn marinated in yoghurt and spice sauce, cooked in a clay oven." },
      { name: "Tandoori Duck", price: "18.95", description: "Duck marinated in yoghurt and spice sauce, cooked in a clay oven." },
    ],
  },
  {
    id: "platters",
    title: "Individual and Sharing Platters",
    description: "Set platters for one, two or larger sharing tables.",
    image: menuFoodImages.setMeal,
    priceNote: "Note: King Prawn and Duck dishes in platters are extra 5.00",
    items: [
      { name: "Bengal Meat Feast Platter (2-4 Persons)", price: "95.00", description: "2x meat samosas, half tandoori chicken, chicken tikka main, 2 set portions of tandoori lamb chops, 2 set portions of sheek kebabs, large keema rice, keema naan, hot drink.", popular: true },
      { name: "Set Platter 1 (2 Persons)", price: "45.00", description: "2x papadams, chutneys, onion bhaji, chicken tikka starter, 2x classic mains, 1x vegetable side, rice, naan, hot drinks." },
      { name: "Set Platter 2 (2 Persons)", price: "75.00", description: "2x papadams, chutneys, sheek kebab starter, tandoori chicken starter, 2x Bengal mains, 2x vegetable sides, 2x rice dishes, 2x naans, hot drinks." },
      { name: "Set Platter for One", price: "25.00", description: "1x papadams, chutneys, any starter, 1x classic main, 1x vegetable side, rice, naan, hot drink." },
    ],
  },
  {
    id: "bengal-specials",
    title: "Bengal Specials",
    description: "Regional specials and signature dishes from the Bengal menu.",
    image: menuFoodImages.balti,
    items: [
      { name: "Lamb Hyderabad", price: "15.95", description: "Original Hyderabad taste with hot spicy sauce, onions, peppers, bullet chillies and green coriander." },
      { name: "Bengal Chicken Balti", price: "15.95", description: "Chicken cooked with garam masala, coriander, herbs and spices.", popular: true },
      { name: "Bengal Lamb Balti", price: "16.95", description: "Lamb cooked with garam masala, coriander, herbs and spices.", popular: true },
      { name: "Gost Kata Lamb", price: "15.95", description: "Medium hot dish cooked with green bell peppers, onions and chef's special sauce with fresh ginger." },
      { name: "Barbusi Chicken", price: "16.95", description: "Chicken with peppers, onions and tomatoes, tandoor cooked and tossed in chef's sauce." },
      { name: "Naga Chicken", price: "14.95", description: "Bengal chicken with ghost naga chilli, aromatic herbs and spices." },
      { name: "Naga Lamb", price: "15.95", description: "Bengal lamb with ghost naga chilli, aromatic herbs and spices." },
      { name: "Bengal Special", price: "18.95", description: "Spiced curry cooked with tomatoes, yoghurt, fresh coconut, coriander and a slight tangy sauce." },
      { name: "Chicken/Lamb Tikka Masala", price: "15.95", description: "Mild creamy sauce cooked with almonds, coconut and fresh cream." },
      { name: "Chilli Chicken Masala", price: "15.95", description: "Hot spiced dish cooked with green chillies, tomatoes and fresh herbs." },
      { name: "Old Delhi Butter Chicken", price: "15.95", description: "A mild chicken curry with butter and ghee sauce.", popular: true },
      { name: "Lamb Shank (Served with Rice)", price: "24.95", description: "Lamb shank simmered in rich aromatic curry with traditional spices and served with fluffy basmati rice." },
      { name: "Bombay Railway Curry", price: "18.95", description: "Old traditional travellers curry, medium hot and garnished with fresh coriander and spices." },
      { name: "Hyderabadi Dum Biriyani", price: "18.95", description: "Traditional chicken biriyani cooked in a clay pot with aromatic Hyderabad spices." },
      { name: "Rajistan Laal Mass", price: "16.95", description: "Spiced lamb pieces slow-cooked with coriander and green chillies." },
      { name: "Royal Jaipur", price: "16.95", description: "A royal Nawab dish, mildly spiced with creamy mango and coconut sauce." },
      { name: "Goan Salon Silsila", price: "16.95", description: "Traditional Goan dish cooked in coconut milk, tamarind, curry leaves, fresh herbs and spices." },
      { name: "Bengal Boat Curry", price: "22.95", description: "Tiger king prawns with peppers, chillies, red onions, spring onions and coriander sauce.", popular: true },
      { name: "Kerwalla King Prawns", price: "22.95", description: "Hot and spicy king prawns with curry leaves, coconut milk and fresh herbs." },
      { name: "Coriander Chicken", price: "13.95", description: "Medium to hot spiced chicken curry cooked with fresh coriander in a minty spicy sauce." },
      { name: "Lamb/Chicken Khori", price: "13.95", description: "Medium spiced dish cooked with green peppers, onions, tomatoes, fresh herbs and spices." },
      { name: "Nawabi King Prawn", price: "22.95", description: "Medium-hot king prawn dish with fresh herbs and spices on a bed of aubergines." },
    ],
  },
  {
    id: "fish-dishes",
    title: "Fish Dishes",
    description: "Cod fish curries with Goan, Kerwalla and peri masala flavours.",
    image: menuFoodImages.fishCurry,
    items: [
      { name: "Fish Bhuna", price: "16.95", description: "Cod fish cooked in a medium-hot spicy sauce." },
      { name: "Goan Fish Curry", price: "16.95", description: "Cod fish cooked with tamarind, curry leaves and coconut milk." },
      { name: "Kerwalla Fish Curry", price: "17.95", description: "Cod fish with peppers, onions, chilli and coconut milk." },
      { name: "Kerwalla Peri Masala", price: "17.95", description: "Cod fish cooked with fresh herbs and spices in a peri hot sauce." },
    ],
  },
  {
    id: "bengal-favourites",
    title: "Bengal Favourites",
    description: "Classic curry styles with chicken, lamb, prawn, king prawn or duck.",
    image: menuFoodImages.jalfrezi,
    items: favouriteItems,
  },
  {
    id: "rices",
    title: "Rices",
    description: "Basmati rice dishes to complete the table.",
    image: menuFoodImages.pilauRice,
    items: [
      { name: "Boiled Rice", price: "4.95", description: "Fluffy plain basmati rice." },
      { name: "Pilau Rice", price: "5.95", description: "Fragrant basmati rice cooked with aromatic spices." },
      { name: "Mushroom Rice", price: "6.95", description: "Rice tossed with fresh mushrooms and light spices." },
      { name: "Egg Rice", price: "6.95", description: "Basmati rice stir-fried with eggs, onions and spices." },
      { name: "Vegetable Rice", price: "6.95", description: "Basmati rice cooked with fresh vegetables and spices." },
      { name: "Chilli Rice", price: "6.95", description: "Spicy rice stir-fried with hot green chillies and spices." },
      { name: "Keema Rice", price: "7.95", description: "Basmati rice cooked with minced lamb and spices." },
      { name: "Coconut Rice", price: "6.95", description: "Sweet nutty rice cooked with basmati rice and coconut flakes." },
    ],
  },
  {
    id: "naans",
    title: "Naans",
    description: "Freshly baked naan breads from the tandoor.",
    image: menuFoodImages.naan,
    items: [
      { name: "Plain Naan", price: "3.95", description: "Classic fluffy naan bread." },
      { name: "Garlic Naan", price: "4.95", description: "Brushed with melted butter, fresh garlic and coriander.", popular: true },
      { name: "Kulcha Naan", price: "4.95", description: "Vegetable stuffed naan." },
      { name: "Keema Naan", price: "5.00", description: "Stuffed with minced lamb." },
      { name: "Cheese Naan", price: "4.95", description: "Stuffed with melted cheese." },
      { name: "Peshwari Naan", price: "4.95", description: "Dried fruits stuffed naan." },
      { name: "Chilli and Coriander Naan", price: "4.95", description: "Naan with green chillies and fresh coriander." },
      { name: "Cinnamon Naan", price: "3.95", description: "Lightly brushed with butter and cinnamon sugar." },
    ],
  },
  {
    id: "extras",
    title: "Extras",
    description: "Breads, puri and papadoms.",
    image: menuFoodImages.poppadom,
    items: [
      { name: "Paratha", price: "3.95", description: "Flaky layered whole wheat flatbread, pan-fried until golden." },
      { name: "Chapati", price: "2.25", description: "Soft thin unleavened flatbread." },
      { name: "Puri", price: "2.35", description: "Small deep-fried bread, light and airy." },
      { name: "Plain Papadom", price: "1.25", description: "Thin crisp lentil cracker." },
      { name: "Spicy Papadom", price: "1.30", description: "Thin crisp lentil cracker with a zesty kick." },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    description: "House desserts and cakes.",
    image: menuFoodImages.mangoChutney,
    items: [
      { name: "Fried Ice-Cream Ball", price: "5.00", description: "Crunchy fried outer coating with soft ice cream centre, whipped cream, and chocolate or strawberry sauce." },
      { name: "Cheesecake (Per Portion)", price: "5.00", description: "Ferrero Rocher, Bueno, Biscoff, Oreo, or Vanilla. Served with vanilla or chocolate ice cream." },
      { name: "Cake (Per Slice)", price: "5.00", description: "Chocolate, Red Velvet, or Fudge." },
      { name: "Gulab Jamun (Per Portion)", price: "5.00", description: "Served warm with vanilla ice cream. Soft fried milk dumpling in rose and cardamom syrup." },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    description: "All drinks are listed as non-alcoholic on the menu.",
    image: menuFoodImages.mangoChutney,
    items: [
      { name: "House Mojito: Tropical Slush", price: "6.50", description: "Pineapple juice, passionfruit juice, and mango." },
      { name: "House Mojito: Lychee and Elderflower Cooler", price: "5.95", description: "Elderflower cordial, lychee juice, fresh lime and rose syrup." },
      { name: "House Mojito: Strawberry Daiquiri", price: "6.50", description: "Fresh strawberries, fresh lime and sugar." },
      { name: "House Mojito: Street Colada", price: "6.50", description: "Coconut, pineapple juice and sugar." },
      { name: "House Mojito: Bengal Fruit Punch", price: "6.50", description: "Mango, orange and pineapple juice with rose syrup and vanilla ice cream." },
      { name: "House Mojito: Strawberry Mojito", price: "6.50", description: "Strawberry flavour, fresh lime, mint leaves and soda water." },
      { name: "Noughty Wine (Per Bottle)", price: "17.95", description: "Blanc, Rouge, Rose, Sparkling NV, or Sparkling Rose." },
      { name: "McGuigan Sauvignon Blanc (Per Bottle)", price: "14.95", description: "Non-alcoholic wine bottle." },
      { name: "McGuigan Chardonnay (Per Bottle)", price: "16.95", description: "Non-alcoholic wine bottle." },
      { name: "McGuigan Rose (Per Bottle)", price: "15.95", description: "Non-alcoholic wine bottle." },
      { name: "McGuigan Shiraz (Per Bottle)", price: "16.95", description: "Non-alcoholic wine bottle." },
      { name: "Oddbird Spumante (Per Bottle)", price: "20.00", description: "Non-alcoholic sparkling bottle." },
      { name: "Thatchers Zero Cider (Bottle)", price: "3.95", description: "Non-alcoholic cider." },
      { name: "Kopparberg Mixed Fruit Cider (Bottle)", price: "3.95", description: "Non-alcoholic cider." },
      { name: "Kingfisher Half Pint", price: "3.50", description: "Beer and cider selection." },
      { name: "Kingfisher Pint", price: "5.95", description: "Beer and cider selection." },
      { name: "Cobra Half Pint", price: "3.50", description: "Beer and cider selection." },
      { name: "Cobra Pint", price: "5.95", description: "Beer and cider selection." },
      { name: "Guinness Half Pint", price: "2.95", description: "Beer and cider selection." },
      { name: "Guinness Pint", price: "4.95", description: "Beer and cider selection." },
      { name: "Spirits (Per Shot)", price: "3.50", description: "Lyres white rum, Lyres dark rum, Gordon's gin, vodka, whiskey, bourbon." },
      { name: "Spirits with Soft Drink", price: "6.00", description: "Any listed spirit served with a soft drink." },
      { name: "Gourmet Lassi (Per Glass)", price: "3.99", description: "Alphonso mango lassi or lychee lassi." },
      { name: "Gourmet Lassi (Jug)", price: "9.99", description: "Alphonso mango lassi or lychee lassi." },
      { name: "Fruit Juice (Per Glass)", price: "3.50", description: "Orange, apple, pineapple, mango, or lychee." },
      { name: "Soft Drinks (Per Glass)", price: "3.50", description: "Coke, Diet Coke, or lemonade." },
      { name: "Soft Drinks (Jug)", price: "8.00", description: "Coke, Diet Coke, or lemonade." },
      { name: "Still Water (70cl Bottle)", price: "3.50", description: "Still bottled water." },
      { name: "Sparkling Water (330ml Bottle)", price: "3.50", description: "Sparkling bottled water." },
      { name: "Tonic Water (200ml)", price: "2.95", description: "Tonic water bottle." },
      { name: "Soda Water (200ml)", price: "2.95", description: "Soda water bottle." },
      { name: "Tea", price: "2.95", description: "Traditional hot beverage." },
      { name: "Coffee", price: "2.95", description: "Traditional hot beverage." },
      { name: "Espresso", price: "2.95", description: "Traditional hot beverage." },
      { name: "Americano", price: "3.25", description: "Traditional hot beverage." },
      { name: "Mocha", price: "3.25", description: "Traditional hot beverage." },
      { name: "Latte", price: "3.25", description: "Traditional hot beverage." },
      { name: "Cappuccino", price: "3.25", description: "Traditional hot beverage." },
      { name: "Hot Chocolate", price: "3.25", description: "Traditional hot beverage." },
      { name: "Karak Chai", price: "3.50", description: "Slow-cooked sweet, spiced, creamy Indian tea with milk." },
    ],
  },
  {
    id: "sunday-buffet",
    title: "Sunday Buffet",
    description: "Sunday buffet pricing from the Bengal menu.",
    image: menuFoodImages.setMeal,
    items: [
      { name: "Sunday Buffet Adult", price: "22.00", description: "Lunch 12.00pm - 2.30pm. Dinner 6.00pm - 10.30pm." },
      { name: "Sunday Buffet Child", price: "12.00", description: "Lunch 12.00pm - 2.30pm. Dinner 6.00pm - 10.30pm." },
    ],
  },
];

export type GalleryImageData = {
  alt: string;
  aspect: "landscape" | "portrait" | "square" | "wide";
  caption: string;
  category: "Signature" | "Tandoori" | "Curry" | "Restaurant" | "Drinks" | "Details";
  chapter: string;
  cta: string;
  featured?: boolean;
  href: string;
  mood: string;
  src: string;
  title: string;
};

export const galleryImages: GalleryImageData[] = [
  {
    title: "Bengal Boat Curry",
    category: "Signature",
    chapter: "Bengal specials",
    caption: "Tiger king prawns, coriander sauce and the restaurant's signature Bengal style.",
    src: menuFoodImages.prawnCurry,
    alt: "Bengal Boat Curry with tiger king prawns",
    mood: "Signature",
    aspect: "wide",
    cta: "Order specials",
    href: "/menu#bengal-specials",
    featured: true,
  },
  {
    title: "Tandoori Mixed Grill",
    category: "Tandoori",
    chapter: "Clay oven",
    caption: "Chicken tikka, tandoori chicken, sheek kebabs and lamb chops.",
    src: menuFoodImages.mixedGrill,
    alt: "Tandoori mixed grill at Bengal Indian and Bengali Cuisine",
    mood: "Smoky grill",
    aspect: "portrait",
    cta: "See tandoori",
    href: "/menu#tandoori-grill",
    featured: true,
  },
  {
    title: "Old Delhi Butter Chicken",
    category: "Signature",
    chapter: "Bengal specials",
    caption: "A mild chicken curry finished with butter and ghee sauce.",
    src: menuFoodImages.butterChicken,
    alt: "Old Delhi butter chicken curry at Bengal",
    mood: "Mild comfort",
    aspect: "square",
    cta: "Order butter chicken",
    href: "/menu#bengal-specials",
  },
  {
    title: "Hyderabadi Dum Biriyani",
    category: "Signature",
    chapter: "Rice dishes",
    caption: "Chicken biryani cooked with aromatic Hyderabad spices.",
    src: menuFoodImages.biryani,
    alt: "Hyderabadi dum biryani at Bengal",
    mood: "Aromatic rice",
    aspect: "wide",
    cta: "See biryani",
    href: "/menu#bengal-specials",
  },
  {
    title: "Paneer Shaslick",
    category: "Tandoori",
    chapter: "Clay oven",
    caption: "Indian cheese marinated with peppers, onions and tomatoes.",
    src: menuFoodImages.paneerShashlik,
    alt: "Tandoori paneer shaslick",
    mood: "Vegetarian grill",
    aspect: "portrait",
    cta: "See grill",
    href: "/menu#tandoori-grill",
  },
  {
    title: "Onion Bhaji",
    category: "Signature",
    chapter: "Classic starters",
    caption: "Crisp chickpea batter, onion and spices.",
    src: menuFoodImages.onionBhaji,
    alt: "Onion bhaji starter at Bengal",
    mood: "Starter",
    aspect: "square",
    cta: "Add starters",
    href: "/menu#classic-starters",
  },
  {
    title: "Garlic Naan",
    category: "Curry",
    chapter: "Naans",
    caption: "Fresh naan brushed with garlic, butter and coriander.",
    src: menuFoodImages.garlicNaan,
    alt: "Garlic naan at Bengal",
    mood: "Fresh bread",
    aspect: "landscape",
    cta: "Add naan",
    href: "/menu#naans",
  },
  {
    title: "Bengal Logo",
    category: "Restaurant",
    chapter: "High Street Winslow",
    caption: "The Bengal tiger mark for Indian and Bengali cuisine in Winslow.",
    src: logoImage,
    alt: "Bengal Restaurant logo",
    mood: "Winslow MK18",
    aspect: "square",
    cta: "Get directions",
    href: restaurant.mapsUrl,
    featured: true,
  },
  {
    title: "Saag Paneer",
    category: "Curry",
    chapter: "Vegetarian dishes",
    caption: "Indian cottage cheese in creamy spinach gravy.",
    src: menuFoodImages.saagPaneer,
    alt: "Saag paneer at Bengal",
    mood: "Vegetarian",
    aspect: "square",
    cta: "See vegetarian",
    href: "/menu#vegetarian-dishes",
  },
  {
    title: "Non-Alcoholic Drinks",
    category: "Drinks",
    chapter: "Drinks menu",
    caption: "A drinks menu crafted to be completely non-alcoholic.",
    src: menuFoodImages.mangoChutney,
    alt: "Non-alcoholic drinks at Bengal",
    mood: "Alcohol free",
    aspect: "landscape",
    cta: "See drinks",
    href: "/menu#drinks",
  },
];

export const reviews = [
  {
    name: "Aisha Rahman",
    title: "Beautiful Bengal flavours",
    date: "2 days ago",
    helpful: 31,
    text: "The Bengal specials had real depth, and the garlic naan was fresh and soft.",
  },
  {
    name: "Tom Harris",
    title: "Great Winslow takeaway",
    date: "1 week ago",
    helpful: 22,
    text: "Easy ordering, friendly phone service and free delivery made dinner simple.",
  },
  {
    name: "Priya Shah",
    title: "Tandoori grill was excellent",
    date: "2 weeks ago",
    helpful: 19,
    text: "The mixed grill was smoky and generous, with good chutneys and salad.",
  },
  {
    name: "Daniel Morris",
    title: "A proper High Street curry night",
    date: "3 weeks ago",
    helpful: 16,
    text: "Butter chicken, saag paneer and pilau rice were all full of flavour.",
  },
  {
    name: "Maya Begum",
    title: "Lovely Bengali menu",
    date: "1 month ago",
    helpful: 28,
    text: "The boat curry and biryani made the menu feel different from a standard takeaway.",
  },
  {
    name: "Oliver Reed",
    title: "Reliable collection",
    date: "1 month ago",
    helpful: 17,
    text: "Food was ready on time, hot, and the 10% direct offer was a nice touch.",
  },
];

export const faqs = [
  {
    category: "General",
    question: "Where is Bengal located?",
    answer:
      "Bengal is at 40 High St, Winslow, Buckingham MK18 3HB.",
  },
  {
    category: "Ordering & Delivery",
    question: "Which postcodes does Bengal deliver to?",
    answer:
      "Bengal offers free delivery within 5 miles for MK18 and MK17 postcodes.",
  },
  {
    category: "Ordering & Delivery",
    question: "Is there a delivery charge?",
    answer:
      "Delivery is listed as free for the Bengal service area.",
  },
  {
    category: "Ordering & Delivery",
    question: "What offer is available online?",
    answer:
      "The site highlights a 10% direct offer. The menu also notes a 20% public sector discount for dine-in or collection with valid ID.",
  },
  {
    category: "Reservations",
    question: "Can customers book a table?",
    answer:
      "Yes. Customers can request a table online or call Bengal directly on 01296 712222.",
  },
  {
    category: "Menu",
    question: "Does Bengal serve Bengali dishes?",
    answer:
      "Yes. The menu includes Bengal specials such as Bengal Boat Curry, Bengal Balti dishes, regional curries, biryani, tandoori grill and vegetarian dishes.",
  },
];
