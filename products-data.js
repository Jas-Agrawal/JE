// ================================================================
//  products-data.js  —  Janish Enterprises
//  ALL product data lives here.
//  To add a new product, just add a new object to the array.
//  To add a new brand, add a new entry to brandInfo.
// ================================================================

// ── Brand information ────────────────────────────────────────────
const brandInfo = {
    Kapson: {
        name: "Kapson",
        tagline: "Grease Pumps & Hydraulic Equipment",
        description: "Kapson is one of India's leading manufacturers of grease pumps and lubrication equipment. Janish Enterprises is an authorised dealer for Kapson products.",
        icon: "fas fa-oil-can",
        color: "#e74c3c",
        logo: "images/brand2.png"
    },
    Penta: {
        name: "Penta",
        tagline: "Pneumatic Pumps & Grease Dispensers",
        description: "Penta offers a wide range of pneumatic grease pumps and dispensers for heavy-duty industrial and automotive use. We are an authorised Penta dealer.",
        icon: "fas fa-compress-alt",
        color: "#e74c3c",
        logo: "images/brand1.png"
    },
    Titan: {
        name: "Titan",
        tagline: "Hydraulic Jacks & Lifting Equipment",
        description: "Titan hydraulic jacks are built for strength and reliability. From bottle jacks to trolley jacks, we stock the full Titan range.",
        icon: "fas fa-car-side",
        color: "#e74c3c",
        logo: "images/brand3.png"
    },
    Groz: {
        name: "Groz",
        tagline: "Professional Hand Tools & Accessories",
        description: "Groz manufactures precision hand tools used by professionals worldwide. We stock a wide range of Groz spanners, wrenches, and workshop accessories.",
        icon: "fas fa-tools",
        color: "#e74c3c",
        logo: "images/brand6.png"
    },
    "Hand Tools": {
        name: "Hand Tools",
        tagline: "Spanners, Wrenches & Workshop Tools",
        description: "A wide selection of hand tools from trusted brands. Everything a mechanic needs for daily workshop use.",
        icon: "fas fa-wrench",
        color: "#e74c3c",
        logo: ""
    },
    "Power Tools": {
        name: "Power Tools",
        tagline: "Drills, Grinders & Impact Tools",
        description: "Professional power tools for heavy-duty workshop use. Built to last, priced to be fair.",
        icon: "fas fa-bolt",
        color: "#e74c3c",
        logo: ""
    }
};

// ── All Products ─────────────────────────────────────────────────
// Fields:
//   id          — unique number
//   name        — product name
//   brand       — must match a key in brandInfo above
//   price       — number (in Rs)
//   description — short description shown in modal
//   image       — path to image or placeholder URL
//   bestSeller  — true/false — shows "Best Seller" tag on card
//   newArrival  — true/false — shows "New" tag on card

const productData = [

    // ── KAPSON ──────────────────────────────────────────────────
    {
        id: 1,
        name: "Hydraulic Bottle Jack 5 Ton",
        brand: "Kapson",
        price: 900,
        description: "5-ton capacity hydraulic bottle jack with heavy-duty steel base. Ideal for lifting cars and light trucks.",
        image: "images/banner3.jpg",
        bestSeller: true,
        newArrival: false
    },
    {
        id: 2,
        name: "5kg Grease Bucket Pump (Without Wheel)",
        brand: "Kapson",
        price: 2200,
        description: "Standard 5kg grease bucket pump without wheel. Suitable for small workshops and daily lubrication tasks.",
        image: "images/banner2.jpg",
        bestSeller: true,
        newArrival: false
    },
    {
        id: 3,
        name: "5kg Grease Bucket Pump (With Wheel)",
        brand: "Kapson",
        price: 2400,
        description: "5kg grease bucket pump with wheel for easy mobility. Model no. K701.",
        image: "https://via.placeholder.com/400x300?text=Kapson+K701",
        bestSeller: false,
        newArrival: false
    },
    {
        id: 4,
        name: "6kg Grease Bucket Pump (With Wheel)",
        brand: "Kapson",
        price: 2500,
        description: "6kg grease bucket pump with wheel. Model no. KGPW6. Great for medium-duty lubrication.",
        image: "https://via.placeholder.com/400x300?text=Kapson+KGPW6",
        bestSeller: false,
        newArrival: false
    },
    {
        id: 5,
        name: "10kg Grease Bucket Pump (With Wheel)",
        brand: "Kapson",
        price: 3000,
        description: "Heavy-duty 10kg grease bucket pump with wheel. Built for large workshops and heavy vehicles.",
        image: "https://via.placeholder.com/400x300?text=Kapson+10kg",
        bestSeller: false,
        newArrival: true
    },

    // ── PENTA ───────────────────────────────────────────────────
    {
        id: 6,
        name: "5kg Grease Dispenser",
        brand: "Penta",
        price: 3200,
        description: "Penta 5kg grease dispenser with wheel. Precision-engineered for consistent lubrication output.",
        image: "https://via.placeholder.com/400x300?text=Penta+5kg",
        bestSeller: true,
        newArrival: false
    },
    {
        id: 7,
        name: "15kg Pneumatic Pump",
        brand: "Penta",
        price: 2100,
        description: "Penta 15kg pneumatic grease pump. Air-powered for fast and efficient lubrication in busy workshops.",
        image: "https://via.placeholder.com/400x300?text=Penta+15kg",
        bestSeller: false,
        newArrival: false
    },
    {
        id: 8,
        name: "25kg Pneumatic Pump",
        brand: "Penta",
        price: 2800,
        description: "Penta 25kg pneumatic pump for medium to large grease barrels. Ideal for truck service centers.",
        image: "https://via.placeholder.com/400x300?text=Penta+25kg",
        bestSeller: true,
        newArrival: false
    },
    {
        id: 9,
        name: "50kg Pneumatic Pump",
        brand: "Penta",
        price: 4500,
        description: "Penta 50kg heavy-duty pneumatic pump. Designed for high-volume grease dispensing in industrial settings.",
        image: "https://via.placeholder.com/400x300?text=Penta+50kg",
        bestSeller: false,
        newArrival: true
    },

    // ── TITAN ───────────────────────────────────────────────────
    {
        id: 10,
        name: "5 Ton Hydraulic Jack",
        brand: "Titan",
        price: 2100,
        description: "Titan 5-ton hydraulic floor jack. Sturdy, reliable, and built for everyday garage use.",
        image: "https://via.placeholder.com/400x300?text=Titan+5T",
        bestSeller: true,
        newArrival: false
    },
    {
        id: 11,
        name: "10 Ton Hydraulic Jack",
        brand: "Titan",
        price: 3500,
        description: "Titan 10-ton hydraulic jack for heavy trucks and commercial vehicles. Best quality, long-lasting.",
        image: "https://via.placeholder.com/400x300?text=Titan+10T",
        bestSeller: false,
        newArrival: false
    },
    {
        id: 12,
        name: "Low Profile Trolley Jack",
        brand: "Titan",
        price: 4200,
        description: "Titan low profile trolley jack. Perfect for sports cars and vehicles with low ground clearance.",
        image: "https://via.placeholder.com/400x300?text=Titan+Low+Profile",
        bestSeller: false,
        newArrival: true
    },

    // ── GROZ ────────────────────────────────────────────────────
    {
        id: 13,
        name: "Combination Spanner Set (8 Pcs)",
        brand: "Groz",
        price: 850,
        description: "Groz 8-piece combination spanner set. Chrome vanadium steel, precision forged for durability.",
        image: "https://via.placeholder.com/400x300?text=Groz+Spanners",
        bestSeller: true,
        newArrival: false
    },
    {
        id: 14,
        name: "Torque Wrench 1/2 inch",
        brand: "Groz",
        price: 1800,
        description: "Groz 1/2 inch drive torque wrench. Adjustable range with click mechanism for accurate torque application.",
        image: "https://via.placeholder.com/400x300?text=Groz+Torque+Wrench",
        bestSeller: false,
        newArrival: false
    },
    {
        id: 15,
        name: "Grease Gun (Lever Type)",
        brand: "Groz",
        price: 650,
        description: "Groz lever-type grease gun. Easy to use, high output, compatible with standard grease cartridges.",
        image: "https://via.placeholder.com/400x300?text=Groz+Grease+Gun",
        bestSeller: true,
        newArrival: false
    },
    {
        id: 16,
        name: "Funnel Set (3 Pcs)",
        brand: "Groz",
        price: 320,
        description: "Groz 3-piece plastic funnel set. Heat and chemical resistant. Essential for every workshop.",
        image: "https://via.placeholder.com/400x300?text=Groz+Funnels",
        bestSeller: false,
        newArrival: false
    },

    // ── HAND TOOLS ──────────────────────────────────────────────
    {
        id: 17,
        name: "Socket Set 40 Pcs",
        brand: "Hand Tools",
        price: 1200,
        description: "40-piece socket set with 1/4 and 1/2 inch drives. Includes metric sockets, extensions, and ratchet handle.",
        image: "https://via.placeholder.com/400x300?text=Socket+Set",
        bestSeller: true,
        newArrival: false
    },
    {
        id: 18,
        name: "Hammer (Ball Peen) 500g",
        brand: "Hand Tools",
        price: 280,
        description: "500g ball peen hammer with hardwood handle. A workshop essential for every mechanic.",
        image: "https://via.placeholder.com/400x300?text=Ball+Peen+Hammer",
        bestSeller: false,
        newArrival: false
    },
    {
        id: 19,
        name: "Plier Set (3 Pcs)",
        brand: "Hand Tools",
        price: 450,
        description: "3-piece plier set including combination, long nose, and cutting pliers. Chrome-plated finish.",
        image: "https://via.placeholder.com/400x300?text=Plier+Set",
        bestSeller: false,
        newArrival: false
    },

    // ── POWER TOOLS ─────────────────────────────────────────────
    {
        id: 20,
        name: "Angle Grinder 4 inch",
        brand: "Power Tools",
        price: 2200,
        description: "850W 4-inch angle grinder. Variable speed, safety guard included. For grinding, cutting, and polishing.",
        image: "https://via.placeholder.com/400x300?text=Angle+Grinder",
        bestSeller: true,
        newArrival: false
    },
    {
        id: 21,
        name: "Electric Drill 13mm",
        brand: "Power Tools",
        price: 1900,
        description: "13mm keyless chuck electric drill. 750W motor, forward/reverse rotation. Ideal for drilling metal and concrete.",
        image: "https://via.placeholder.com/400x300?text=Electric+Drill",
        bestSeller: false,
        newArrival: true
    }

    // Add more products here easily!
];
