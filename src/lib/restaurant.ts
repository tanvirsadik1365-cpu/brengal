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
  siteUrl: "https://www.bengal.restaurant",
  menuPdfUrl: "https://www.bengal.restaurant/imgd/menu.pdf",
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
  hero: "/bengal/real/storefront-day.jpg",
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
  { name: "Bengal Specials", count: "22", detail: "Boat curry, lamb shank, naga, balti and regional dishes" },
  { name: "Tandoori Grill", count: "10", detail: "Paneer shashlick, mixed grill, duck and king prawn" },
  { name: "Bengal Favourites", count: "55", detail: "Classic curry styles with chicken, lamb, prawn, duck and king prawn" },
  { name: "Biryani", count: "7", detail: "Served with a vegetable dish" },
  { name: "Rice & Naans", count: "16", detail: "Rice, naan, paratha, chapati, puri and papadom" },
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
      "A rich aromatic curry with signature red colour and a tomato-based sauce.",
  },
  {
    name: "Madras",
    description: "A fiery South Indian curry with a medium-to-hot sauce.",
  },
  {
    name: "Vindaloo",
    description:
      "An intensely spiced curry balanced with garlic, ginger and vinegar.",
  },
  {
    name: "Bhuna",
    description:
      "A semi-dry curry where spices are cooked with the meat for concentrated flavour.",
  },
  {
    name: "Curry",
    description: "The classic mild-to-medium Indian curry with a smooth sauce.",
  },
  {
    name: "Dhansak",
    description:
      "A sweet and sour Parsi-style curry cooked with lentils and spices.",
  },
  {
    name: "Dupiaza",
    description:
      "A medium-spiced curry with onions cooked into the base and added in chunks.",
  },
  {
    name: "Jalfrezi",
    description:
      "A vibrant spicy curry with green chillies, onions and peppers in tomato sauce.",
  },
  {
    name: "Kurma",
    description:
      "A mild creamy curry with yoghurt, coconut milk, cream and ground nuts.",
  },
  {
    name: "Pasanda",
    description:
      "A very mild creamy curry with yoghurt and cream.",
  },
  {
    name: "Methi",
    description:
      "An aromatic curry with fenugreek leaves for a distinct herbal flavour.",
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
      { name: "Meat Samosas", price: "8.95", description: "Filled pastry with minced lamb and slight spice, shallow fried." },
      { name: "Sheek Kebabs", price: "9.95", description: "Two minced lamb kebabs lightly spiced with herbs and cooked in a clay oven." },
      { name: "Lamb Tikka", price: "9.95", description: "Tender lamb marinated in yoghurt and spice sauce, cooked in a clay oven." },
      { name: "Chicken Tikka", price: "8.95", description: "Tender chicken breast marinated in yoghurt and spice sauce, cooked in a clay oven.", popular: true },
      { name: "Tandoori Chicken", price: "8.95", description: "Chicken breast or leg on the bone marinated in yoghurt and spice sauce." },
      { name: "Onion Bhaji", price: "5.95", description: "Onion in chickpea flour and spices, deep fried.", popular: true },
      { name: "Tandoori Lamb Chops", price: "12.95", description: "Four tender lamb chops marinated with yoghurt and spice sauce." },
      { name: "Prawn Puri", price: "9.95", description: "Medium spiced prawn with onion and peppers, served with fried Indian bread." },
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
      { name: "Hash Duck", price: "10.95", description: "Tender duck breast marinated in yoghurt and cooked in tamarind and honey sauce." },
      { name: "Cha-Patta Wings", price: "10.95", description: "Tangy and spicy chicken wings cooked with chef's special sauce.", popular: true },
      { name: "Samosa Chatt", price: "10.95", description: "Vegetable samosa dressed with yoghurt, hot mango and coriander sauce." },
      { name: "Pani Puri", price: "8.95", description: "Street-food puri with onion, chickpeas and tamarind sauce." },
      { name: "Chicken Lollipop", price: "8.95", description: "Chicken wings cooked in tangy, spicy and sweet chilli sauce." },
      { name: "Dhai Puri", price: "9.95", description: "Shallow fried puri served with yoghurt and pomegranate." },
      { name: "Chicken 65", price: "9.95", description: "Tender chicken pieces cooked in garlic and chilli sauce." },
      { name: "Fish Amritsa", price: "12.95", description: "Tender cod, shallow fried in ajwain spice batter." },
      { name: "King Prawn Puri", price: "12.95", description: "Medium spiced king prawn with onion and peppers, served with fried Indian bread." },
    ],
  },
  {
    id: "vegetarian-dishes",
    title: "Vegetarian Dishes",
    description: "Vegetable sides from the Bengal menu.",
    image: menuFoodImages.saagPaneer,
    items: [
      { name: "Tarka Dhaal", price: "6.95", description: "Creamy lentil stew finished with garlic, cumin and dried red chillies." },
      { name: "Bombay Aloo", price: "6.95", description: "Potatoes sauteed with onions, cumin seeds and spices." },
      { name: "Brinjal Bhaji", price: "6.95", description: "Aubergine and sweet onions cooked with traditional spices." },
      { name: "Broccoli Bhaji", price: "6.95", description: "Broccoli florets and sweet onions stir-fried with aromatic spices." },
      { name: "Cauliflower Bhaji", price: "6.95", description: "Cauliflower florets and sweet onions stir-fried with aromatic spices." },
      { name: "Mushroom Bhaji", price: "6.95", description: "Fresh mushrooms tossed with traditional Indian spices." },
      { name: "Saag Bhaji", price: "6.95", description: "Spinach leaves and sweet onions stir-fried with spices." },
      { name: "Saag Paneer", price: "7.95", description: "Indian cottage cheese in creamy spinach gravy.", popular: true },
      { name: "Chana Masala", price: "6.95", description: "Chickpeas slow-cooked in tangy tomato and onion gravy." },
      { name: "Aloo Gobi", price: "6.95", description: "Cauliflower and potato with onions, tomatoes, turmeric and cumin." },
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
    priceNote: "King prawn and duck dishes extra 5.00",
    items: [
      { name: "Bengal Meat Feast Platter", price: "95.00", description: "For 2-4 people: meat samosas, half tandoori chicken, chicken tikka main, lamb chops, sheek kebabs, keema rice, keema naan and hot drink.", popular: true },
      { name: "Set Platter 1", price: "45.00", description: "For 2 people: papadoms, chutneys, onion bhaji, chicken tikka starter, two classic mains, vegetable side, rice, naan and hot drinks." },
      { name: "Set Platter 2", price: "75.00", description: "For 2 people: papadoms, chutneys, sheek kebab, tandoori chicken, two Bengal mains, two vegetable sides, two rice dishes, two naans and hot drinks." },
      { name: "Set Platter for One", price: "25.00", description: "Papadom, chutneys, any starter, classic main, vegetable side, rice, naan and hot drink." },
    ],
  },
  {
    id: "bengal-specials",
    title: "Bengal Specials",
    description: "Regional specials and signature dishes from the Bengal menu.",
    image: menuFoodImages.balti,
    items: [
      { name: "Lamb Hyderabad", price: "15.95", description: "A hot and spicy Hyderabad-style sauce with onions, peppers, bullet chillies and coriander." },
      { name: "Bengal Chicken Balti", price: "15.95", description: "Chicken cooked with garam masala, coriander, herbs and spices.", popular: true },
      { name: "Bengal Lamb Balti", price: "16.95", description: "Lamb cooked with garam masala, coriander, herbs and spices.", popular: true },
      { name: "Gost Kata Lamb", price: "15.95", description: "Medium-hot lamb with peppers, onions, chef's sauce and fresh ginger." },
      { name: "Barbusi Chicken", price: "16.95", description: "Chicken with peppers, onions and tomatoes, tandoor cooked and tossed in chef's sauce." },
      { name: "Naga Chicken", price: "14.95", description: "Bengal chicken with ghost naga chilli, aromatic herbs and spices." },
      { name: "Naga Lamb", price: "15.95", description: "Bengal lamb with ghost naga chilli, aromatic herbs and spices." },
      { name: "Bengal Special", price: "18.95", description: "Spiced curry with tomatoes, yoghurt, fresh coconut, coriander and a tangy sauce." },
      { name: "Chicken Tikka Masala", price: "15.95", description: "Mild creamy sauce cooked with almonds, coconut and fresh cream." },
      { name: "Lamb Tikka Masala", price: "15.95", description: "Mild creamy sauce cooked with almonds, coconut and fresh cream." },
      { name: "Chilli Chicken Masala", price: "15.95", description: "Hot spiced dish cooked with green chillies, tomatoes and fresh herbs." },
      { name: "Old Delhi Butter Chicken", price: "15.95", description: "A mild chicken curry with butter and ghee sauce.", popular: true },
      { name: "Lamb Shank with Rice", price: "24.95", description: "Lamb shank simmered in rich aromatic curry and served with basmati rice." },
      { name: "Bombay Railway Curry", price: "18.95", description: "Old travellers curry, medium-hot and garnished with coriander and fresh spices." },
      { name: "Hyderabadi Dum Biriyani", price: "18.95", description: "Traditional chicken biryani cooked in a clay pot with Hyderabad spices." },
      { name: "Rajistan Laal Mass", price: "16.95", description: "Spiced lamb pieces slow-cooked with coriander and green chillies." },
      { name: "Royal Jaipur", price: "16.95", description: "A royal Nawab dish, mildly spiced with creamy mango and coconut sauce." },
      { name: "Goan Salon Silsila", price: "16.95", description: "Goan dish cooked with coconut milk, tamarind, curry leaves, herbs and spices." },
      { name: "Bengal Boat Curry", price: "22.95", description: "Tiger king prawns with peppers, chillies, red onions, spring onions and coriander sauce.", popular: true },
      { name: "Kerwalla King Prawns", price: "22.95", description: "Hot and spicy king prawns with curry leaves, coconut milk and fresh herbs." },
      { name: "Coriander Chicken", price: "13.95", description: "Medium-to-hot chicken curry with coriander in a minty spicy sauce." },
      { name: "Lamb Khori", price: "13.95", description: "Medium-spiced dish with peppers, onions, tomatoes, herbs and spices." },
      { name: "Chicken Khori", price: "13.95", description: "Medium-spiced dish with peppers, onions, tomatoes, herbs and spices." },
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
    id: "biriyanis",
    title: "Biriyanis",
    description: "Layered basmati rice dishes served with any vegetable dish.",
    image: menuFoodImages.biryani,
    priceNote: "Served with any vegetable dish",
    items: [
      { name: "Chicken Biriyani", price: "11.95", description: "Marinated chicken layered with long-grain basmati rice." },
      { name: "Lamb Biriyani", price: "12.95", description: "Succulent lamb slow-cooked with spices and layered with basmati rice." },
      { name: "Chicken Tikka Biriyani", price: "12.95", description: "Smoky chicken tikka layered with spiced basmati rice.", popular: true },
      { name: "Lamb Tikka Biriyani", price: "13.95", description: "Marinated lamb tikka with onions, spices and fragrant basmati rice." },
      { name: "Prawn Biriyani", price: "12.95", description: "Prawns layered with basmati rice and coastal spices." },
      { name: "King Prawn Biriyani", price: "15.95", description: "King prawns with basmati rice and coastal-inspired spices." },
      { name: "Duck Biriyani", price: "14.95", description: "Duck cooked with spices, herbs and aromatics, then layered with rice." },
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
      { name: "Coconut Rice", price: "6.95", description: "Sweet nutty rice cooked with coconut flakes." },
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
    id: "non-alcoholic-drinks",
    title: "Non-Alcoholic Drinks",
    description: "Non-alcoholic beers, wines, cider and soft drinks listed on the menu.",
    image: menuFoodImages.mangoChutney,
    items: [
      { name: "McGuigan Sauvignon Blanc", price: "14.95", description: "Non-alcoholic wine, bottle." },
      { name: "McGuigan Chardonnay", price: "16.95", description: "Non-alcoholic wine, bottle." },
      { name: "McGuigan Rose", price: "15.95", description: "Non-alcoholic wine, bottle." },
      { name: "McGuigan Shiraz", price: "16.95", description: "Non-alcoholic wine, bottle." },
      { name: "Oddbird Spumante", price: "20.00", description: "Non-alcoholic sparkling bottle." },
      { name: "Thatchers Zero Cider", price: "3.95", description: "Non-alcoholic cider bottle." },
      { name: "Kopparberg Mixed Fruit Cider", price: "3.95", description: "Non-alcoholic cider bottle." },
      { name: "Kingfisher Half Pint", price: "3.50", description: "Non-alcoholic draught-style beer." },
      { name: "Kingfisher Pint", price: "5.95", description: "Non-alcoholic draught-style beer." },
      { name: "Cobra Half Pint", price: "3.50", description: "Non-alcoholic draught-style beer." },
      { name: "Cobra Pint", price: "5.95", description: "Non-alcoholic draught-style beer." },
      { name: "Guinness Half Pint", price: "2.95", description: "Non-alcoholic stout." },
      { name: "Guinness Pint", price: "4.95", description: "Non-alcoholic stout." },
      { name: "Mango or Lychee Jug", price: "8.00", description: "Soft drink jug." },
      { name: "Tonic Water", price: "2.95", description: "200ml bottle." },
      { name: "Soda Water", price: "2.95", description: "200ml bottle." },
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
    href: "/menu#biriyanis",
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
    href: "/menu#non-alcoholic-drinks",
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
