export const restaurant = {
  name: "Jamal's Indian Restaurant",
  shortName: "Jamal's",
  established: "1956",
  tagline: "Indian Restaurant & Takeaway",
  heroLine: "Walton Street curry house. Order, collect, dine in.",
  description:
    "A long-standing Indian restaurant on Walton Street, Oxford, serving dine-in meals, collection, and local delivery.",
  phone: "01865 51 22 11",
  secondaryPhone: "01865 55 49 05",
  phoneHref: "tel:+441865512211",
  secondaryPhoneHref: "tel:+441865554905",
  email: "info@jamals-saffron.co.uk",
  bookingEmail: "bookings@jamals-saffron.co.uk",
  website: "www.jamals-saffron.co.uk",
  address: ["107 Walton Street", "Oxford", "OX2 6AJ"],
  location: "107 Walton Street, Oxford",
  deliveryInfo: "Delivery from \u00a320 within 5 miles",
  hours: [
    { days: "Sunday, Monday, Wednesday & Thursday", time: "5.00pm - 10.30pm" },
    { days: "Friday & Saturday", time: "5.00pm - 11.00pm" },
    { days: "Tuesday", time: "Closed" },
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

export const brandHeroImage = "/jamals/hero.jpeg";
export const logoImage = "/jamals/jamals-logo-final.png";

export const foodImages = {
  curry:
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1100&q=85",
  biryani:
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1100&q=85",
  tandoori:
    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1100&q=85",
  naan:
    "https://images.unsplash.com/photo-1631452180539-96aca7d48617?auto=format&fit=crop&w=1100&q=85",
  rice:
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1100&q=85",
  restaurant:
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1100&q=85",
  spices:
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1100&q=85",
  samosa:
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1100&q=85",
};

export const aboutImages = [
  { src: foodImages.restaurant, alt: "Warm restaurant dining room" },
  { src: foodImages.curry, alt: "Rich Indian curry" },
  { src: foodImages.tandoori, alt: "Tandoori mixed grill" },
  { src: foodImages.spices, alt: "Indian spices and ingredients" },
];

export const offers = [
  {
    title: "10% Collection Discount",
    detail: "Collection orders from \u00a320 qualify for 10% off.",
    note: "Applies on collection only",
  },
  {
    title: "Free Onion Bhaji",
    detail: "Spend \u00a330 and get an Onion Bhaji reward.",
    note: "One reward applies per order",
  },
  {
    title: "Free Side Dish",
    detail: "Spend \u00a345 and choose a free side dish in the cart.",
    note: "One reward applies per order",
  },
  {
    title: "Free Onion Bhaji + Side Dish",
    detail: "Spend \u00a360 and receive both rewards together.",
    note: "Best active reward",
  },
];

export const studentOffer = {
  title: "Student Offer",
  price: "18",
  nonEaterPrice: "12",
  discount: "15%",
  capacity: "Up to 200 capacity",
  drinks: "Bring your own drinks",
  details: [
    "\u00a318 per head",
    "\u00a312 per head for non-eaters",
    "15% student discount",
    "Up to 200 capacity",
    "Bring your own drinks",
  ],
};

export const featuredDishes = [
  {
    name: "Butter Chicken",
    description: "Tender chicken in a creamy tomato sauce with gentle spice.",
    price: "12.50",
    badge: "Popular",
    image: foodImages.curry,
  },
  {
    name: "Tandoori Mixed Grill",
    description: "Smoky tandoor-cooked favourites served hot from the grill.",
    price: "16.50",
    badge: "Chef's Choice",
    image: foodImages.tandoori,
  },
  {
    name: "Chef Selected Feast",
    description: "A generous set meal made for sharing around the table.",
    price: "24.95",
    badge: "Set Meal",
    image: foodImages.biryani,
  },
];

export const menuCategories = [
  { name: "Starters", count: "10+", detail: "Tikka, samosa, onion bhaji, puree" },
  { name: "Main Dishes", count: "9 styles", detail: "Pick your protein and curry style" },
  { name: "Chef Specialities", count: "6+", detail: "House favourites with richer sauces" },
  { name: "Tandoori", count: "6", detail: "Shashlick, mixed grill, paneer" },
  { name: "Biryani", count: "5", detail: "Fragrant rice dishes for one or two" },
  { name: "Rice & Bread", count: "9+", detail: "Nan, rice, paratha, chapati" },
];

export const baseCurry = {
  title: "Main Dishes",
  description: "Choose your protein, then pick the curry style you like best.",
  styles: ["Bhuna", "Madras", "Korma", "Rogan", "Pathia", "Vindaloo", "Dansak", "Sag", "Methi"],
  prices: [
    { name: "Chicken", price: "10.50" },
    { name: "Lamb", price: "11.25" },
    { name: "King Prawn", price: "13.50" },
    { name: "Vegetable", price: "9.95" },
  ],
};

export const menuSections = [
  {
    id: "starters",
    title: "Starters",
    description: "Freshly cooked small plates to begin your meal, from tikka to samosa, bhaji and puree.",
    image: foodImages.samosa,
    items: [
      { name: "Chicken Tikka", price: "6.95" },
      { name: "Lamb Tikka", price: "7.25" },
      { name: "Sheekh Kebab", price: "6.50" },
      { name: "Mix Starter", price: "7.50" },
      { name: "Meat / Veg Samosa", price: "5.50" },
      { name: "Onion Bhaji", price: "5.25" },
      { name: "Chilli Paneer", price: "6.50" },
      { name: "Prawn Puree", price: "7.95" },
      { name: "Poppadom", price: "0.85" },
      { name: "Chutneys", price: "0.85" },
    ],
  },
  {
    id: "chef-specialities",
    title: "Chef Specialities",
    description: "Signature Jamal's dishes with rich sauces, warm spice and plenty of character.",
    image: foodImages.curry,
    items: [
      { name: "Garlic Chicken Paneer Jalfrezi", price: "12.95" },
      { name: "Butter Chicken", price: "12.50", popular: true },
      { name: "Chicken Sagwala", price: "12.50" },
      { name: "Jamal Indian Hotpot", price: "15.95", popular: true },
      { name: "Ayer Jhol Fish Curry", price: "12.95" },
      { name: "Passanda Chicken", price: "12.50" },
      { name: "Passanda Lamb", price: "12.95" },
    ],
  },
  {
    id: "tandoori",
    title: "Tandoori Dishes",
    description: "Marinated dishes grilled in the tandoor for a smoky, full-flavoured finish.",
    image: foodImages.tandoori,
    items: [
      { name: "Chicken Shashlick", price: "13.50" },
      { name: "Lamb Shashlick", price: "14.50" },
      { name: "Tandoori Mixed Grill", price: "16.50", popular: true },
      { name: "Tandoori Chicken", price: "12.50" },
      { name: "King Prawns", price: "16.50" },
      { name: "Paneer Shashlick", price: "12.50" },
    ],
  },
  {
    id: "biryani",
    title: "Biryani",
    description: "Fragrant rice dishes cooked with spice, herbs and generous portions.",
    image: foodImages.biryani,
    items: [
      { name: "Special Biryani", price: "15.50", popular: true },
      { name: "Chicken Biryani", price: "13.50" },
      { name: "Lamb Biryani", price: "14.50" },
      { name: "King Prawn Biryani", price: "15.95" },
      { name: "Vegetable Biryani", price: "11.50" },
    ],
  },
  {
    id: "vegetable",
    title: "Vegetable Dishes",
    description: "Classic vegetable dishes, perfect as a side or a lighter main.",
    image: foodImages.spices,
    priceNote: "Side \u00a36.75 | Main \u00a38.25",
    items: [
      { name: "Chana Masala", price: "6.75 / 8.25" },
      { name: "Bombay Aloo", price: "6.75 / 8.25" },
      { name: "Sag Aloo", price: "6.75 / 8.25" },
      { name: "Bhindi Bhaji", price: "6.75 / 8.25" },
      { name: "Brinjal Bhaji", price: "6.75 / 8.25" },
      { name: "Mushroom Bhaji", price: "6.75 / 8.25" },
      { name: "Tarka Dall", price: "6.75 / 8.25" },
    ],
  },
  {
    id: "rice",
    title: "Rice",
    description: "Steamed, pilau and special rice sides to round out your order.",
    image: foodImages.rice,
    items: [
      { name: "Plain Rice", price: "2.95" },
      { name: "Pilau Rice", price: "3.25" },
      { name: "Special Rice", price: "3.95" },
      { name: "Egg / Mushroom Rice", price: "3.95" },
    ],
  },
  {
    id: "bread",
    title: "Bread",
    description: "Fresh breads made for sharing, scooping and enjoying every sauce.",
    image: foodImages.naan,
    items: [
      { name: "Nan", price: "2.75" },
      { name: "Garlic Nan", price: "3.25" },
      { name: "Cheese Nan", price: "3.95" },
      { name: "Keema Nan", price: "4.25" },
      { name: "Paratha", price: "3.25" },
      { name: "Chapati", price: "2.50" },
    ],
  },
  {
    id: "set-meal",
    title: "Set Meal",
    description: "Chef-selected meals with a balanced mix of dishes for easy sharing.",
    image: foodImages.biryani,
    items: [
      { name: "Non-Veg Chef Selected Feast", price: "24.95", popular: true },
      { name: "Vegetarian Chef Selected Feast", price: "22.95" },
    ],
  },
];

export const galleryImages = [
  { title: "Jamal's", category: "Brand", src: brandHeroImage },
  { title: "Restaurant Logo", category: "Brand", src: logoImage },
  { title: "Butter Chicken", category: "Food", src: foodImages.curry },
  { title: "Tandoori Mixed Grill", category: "Food", src: foodImages.tandoori },
  { title: "Special Biryani", category: "Food", src: foodImages.biryani },
  { title: "Fresh Nan", category: "Food", src: foodImages.naan },
  { title: "Indian Spices", category: "Kitchen", src: foodImages.spices },
  { title: "Restaurant Dining", category: "Restaurant", src: foodImages.restaurant },
  { title: "Samosa Starter", category: "Food", src: foodImages.samosa },
];

export const reviews = [
  {
    name: "Anika Patel",
    title: "A real Oxford favourite",
    date: "2 days ago",
    helpful: 31,
    text: "The butter chicken and garlic nan were excellent. Warm service and real Oxford charm.",
  },
  {
    name: "James Wright",
    title: "Great collection offer",
    date: "1 week ago",
    helpful: 22,
    text: "Ordered for collection and the 10% offer made it great value. Food was ready on time and full of flavour.",
  },
  {
    name: "Sara Ahmed",
    title: "Perfect student dinner",
    date: "2 weeks ago",
    helpful: 19,
    text: "The student deal is brilliant for groups. Bring your own drinks makes it even better.",
  },
  {
    name: "Oliver Green",
    title: "Best biryani nearby",
    date: "3 weeks ago",
    helpful: 16,
    text: "Special biryani was fragrant and generous. The side dishes were fresh and well spiced.",
  },
  {
    name: "Maya Khan",
    title: "Family meal done right",
    date: "1 month ago",
    helpful: 28,
    text: "We ordered the chef selected feast and everyone found something they loved.",
  },
  {
    name: "Daniel Brooks",
    title: "Reliable takeaway",
    date: "1 month ago",
    helpful: 17,
    text: "Easy ordering, helpful phone service, and consistently good curry.",
  },
];

export const faqs = [
  {
    category: "General",
    question: "What are Jamal's opening hours?",
    answer:
      "Jamal's opens Sunday, Monday, Wednesday, and Thursday from 5.00pm to 10.30pm, and Friday and Saturday from 5.00pm to 11.00pm. Tuesday is closed.",
  },
  {
    category: "Ordering & Delivery",
    question: "What is the minimum delivery order?",
    answer:
      "The minimum delivery order is \u00a320 within 5 miles.",
  },
  {
    category: "Ordering & Delivery",
    question: "Do you offer collection discounts?",
    answer:
      "Yes. Collection orders from \u00a320 can receive 10% off when that is the active reward.",
  },
  {
    category: "Ordering & Delivery",
    question: "What free item offers are available?",
    answer:
      "One reward applies per order: \u00a330 gets a free Onion Bhaji, \u00a345 gets a free side dish, and \u00a360 gets Onion Bhaji plus a side dish.",
  },
  {
    category: "Reservations",
    question: "What is the student offer?",
    answer:
      "Students can book from \u00a318 per head, with \u00a312 per head for non-eaters, 15% student discount, capacity up to 200, and bring your own drinks.",
  },
  {
    category: "Reservations",
    question: "Can customers book for large groups?",
    answer:
      "Yes. Jamal's can host student groups and larger gatherings, with capacity up to 200. Send your date, time, guest count, and notes from the booking page.",
  },
];
