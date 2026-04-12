// ================================================================
//  products-data.js  —  Janish Enterprises
//
//  HOW TO ADD VARIANTS (sizes, drive sizes, capacities etc.):
//
//    variantType: "Size"          ← label shown above variant buttons
//    variants: [
//        { label: "150mm", price: 650 },
//        { label: "250mm", price: 850 },
//        { label: "450mm", price: 1200 }
//    ]
//
//  If a product has NO variants, just use:  price: 1234
//
//  HOW TO ADD MULTIPLE IMAGES:
//
//    images: [
//        "images/product-front.jpg",
//        "images/product-side.jpg",
//        "images/product-detail.jpg"
//    ]
//
//  First image is always shown on the product card thumbnail.
//
// ================================================================

const brandInfo = {
    Kapson: {
        name: "Kapson",
        tagline: "Grease Pumps & Hydraulic Equipment",
        description: "Kapson is one of India's leading manufacturers of grease pumps and lubrication equipment. Janish Enterprises is an authorised dealer for Kapson products.",
        icon: "fas fa-oil-can",
        logo: "images/brand2.png"
    },
    Penta: {
        name: "Penta",
        tagline: "Pneumatic Pumps & Grease Dispensers",
        description: "Penta offers a wide range of pneumatic grease pumps and dispensers for heavy-duty industrial and automotive use. We are an authorised Penta dealer.",
        icon: "fas fa-compress-alt",
        logo: "images/brand1.png"
    },
    Titan: {
        name: "Titan",
        tagline: "Hydraulic Jacks & Lifting Equipment",
        description: "Titan hydraulic jacks are built for strength and reliability. From bottle jacks to trolley jacks, we stock the full Titan range.",
        icon: "fas fa-car-side",
        logo: "images/brand3.png"
    },
    Groz: {
        name: "Groz",
        tagline: "Professional Hand Tools & Accessories",
        description: "Groz manufactures precision hand tools used by professionals worldwide. We stock a wide range of Groz spanners, wrenches, and workshop accessories.",
        icon: "fas fa-tools",
        logo: "images/brand6.png"
    },
    "Hand Tools": {
        name: "Hand Tools",
        tagline: "Spanners, Wrenches & Workshop Tools",
        description: "A wide selection of hand tools from trusted brands. Everything a mechanic needs for daily workshop use.",
        icon: "fas fa-wrench",
        logo: ""
    },
    "Power Tools": {
        name: "Power Tools",
        tagline: "Drills, Grinders & Impact Tools",
        description: "Professional power tools for heavy-duty workshop use. Built to last, priced to be fair.",
        icon: "fas fa-bolt",
        logo: ""
    }
};

const productData = [

    // ══ KAPSON ═══════════════════════════════════════════════
    {
        id: 1,
        name: "Hydraulic Bottle Jack",
        brand: "Kapson",
        description: "Kapson hydraulic bottle jack with heavy-duty steel base. Solid build with safety overload protection. Ideal for cars, SUVs, and light trucks.",
        images: [
            "images/banner3.jpg",
            "https://via.placeholder.com/400x300?text=Jack+Side+View",
            "https://via.placeholder.com/400x300?text=Jack+Base+Detail"
        ],
        bestSeller: true,
        newArrival: false,
        variantType: "Capacity",
        variants: [
            { label: "2 Ton",  price: 650  },
            { label: "3 Ton",  price: 800  },
            { label: "5 Ton",  price: 900  },
            { label: "10 Ton", price: 1400 },
            { label: "20 Ton", price: 2200 }
        ]
    },
    {
        id: 2,
        name: "Grease Bucket Pump (Without Wheel)",
        brand: "Kapson",
        description: "Kapson grease bucket pump without wheel. Consistent pressure output for daily lubrication tasks in small to medium workshops.",
        images: [
            "images/banner2.jpg",
            "https://via.placeholder.com/400x300?text=Pump+Top+View"
        ],
        bestSeller: true,
        newArrival: false,
        variantType: "Capacity",
        variants: [
            { label: "5kg",  price: 2200 },
            { label: "10kg", price: 2800 },
            { label: "15kg", price: 3400 }
        ]
    },
    {
        id: 3,
        name: "Grease Bucket Pump (With Wheel)",
        brand: "Kapson",
        description: "Kapson grease bucket pump on wheeled trolley for easy mobility. Durable steel construction. Available in multiple capacities.",
        images: [
            "https://via.placeholder.com/400x300?text=Kapson+With+Wheel",
            "https://via.placeholder.com/400x300?text=Kapson+Wheel+Detail"
        ],
        bestSeller: false,
        newArrival: false,
        variantType: "Capacity",
        variants: [
            { label: "5kg  (Model K701)",  price: 2400 },
            { label: "6kg  (Model KGPW6)", price: 2500 },
            { label: "10kg",               price: 3000 }
        ]
    },

    // ══ PENTA ════════════════════════════════════════════════
    {
        id: 6,
        name: "Grease Dispenser / Bucket Pump",
        brand: "Penta",
        description: "Penta grease dispenser with wheel trolley. Precision-engineered for consistent lubrication output at automotive service centres and workshops.",
        images: [
            "https://via.placeholder.com/400x300?text=Penta+Dispenser",
            "https://via.placeholder.com/400x300?text=Penta+Nozzle+Detail",
            "https://via.placeholder.com/400x300?text=Penta+Trolley+View"
        ],
        bestSeller: true,
        newArrival: false,
        variantType: "Capacity",
        variants: [
            { label: "5kg",  price: 3200 },
            { label: "10kg", price: 3900 },
            { label: "15kg", price: 4600 }
        ]
    },
    {
        id: 7,
        name: "Pneumatic Grease Pump",
        brand: "Penta",
        description: "Penta air-powered pneumatic grease pump for high-volume dispensing. Designed for busy truck workshops and industrial garages.",
        images: [
            "https://via.placeholder.com/400x300?text=Penta+Pneumatic",
            "https://via.placeholder.com/400x300?text=Penta+Air+Inlet",
            "https://via.placeholder.com/400x300?text=Penta+Hose+Detail"
        ],
        bestSeller: true,
        newArrival: false,
        variantType: "Capacity",
        variants: [
            { label: "15kg", price: 2100 },
            { label: "25kg", price: 2800 },
            { label: "50kg", price: 4500 }
        ]
    },

    // ══ TITAN ════════════════════════════════════════════════
    {
        id: 10,
        name: "Hydraulic Floor Jack",
        brand: "Titan",
        description: "Titan hydraulic floor jack with steel frame and dual-piston pump for fast lifting. Built for everyday garage and workshop use.",
        images: [
            "https://via.placeholder.com/400x300?text=Titan+Floor+Jack",
            "https://via.placeholder.com/400x300?text=Titan+Jack+Handle",
            "https://via.placeholder.com/400x300?text=Titan+Jack+Wheel"
        ],
        bestSeller: true,
        newArrival: false,
        variantType: "Capacity",
        variants: [
            { label: "2 Ton", price: 1600 },
            { label: "3 Ton", price: 2100 },
            { label: "5 Ton", price: 2800 }
        ]
    },
    {
        id: 11,
        name: "Heavy Duty Bottle Jack",
        brand: "Titan",
        description: "Titan heavy-duty bottle jack for trucks, buses, and commercial vehicles. Compact and powerful.",
        images: [
            "https://via.placeholder.com/400x300?text=Titan+Bottle+Jack",
            "https://via.placeholder.com/400x300?text=Titan+Bottle+Base"
        ],
        bestSeller: false,
        newArrival: false,
        variantType: "Capacity",
        variants: [
            { label: "10 Ton", price: 3500 },
            { label: "15 Ton", price: 4800 },
            { label: "20 Ton", price: 6200 }
        ]
    },
    {
        id: 12,
        name: "Low Profile Trolley Jack",
        brand: "Titan",
        description: "Titan low profile trolley jack with extra-low minimum height. Perfect for sports cars and vehicles with low ground clearance. Smooth swivel casters.",
        images: [
            "https://via.placeholder.com/400x300?text=Titan+Low+Profile",
            "https://via.placeholder.com/400x300?text=Titan+LP+Side",
            "https://via.placeholder.com/400x300?text=Titan+LP+Caster"
        ],
        bestSeller: false,
        newArrival: true,
        price: 4200   // single price, no variants
    },

    // ══ GROZ ═════════════════════════════════════════════════
    {
        id: 13,
        name: "Combination Spanner",
        brand: "Groz",
        description: "Groz combination spanner — chrome vanadium steel, precision forged and heat-treated. 15° offset ring end for knuckle clearance. Individual sizes or full set.",
        images: [
            "https://via.placeholder.com/400x300?text=Groz+Spanner",
            "https://via.placeholder.com/400x300?text=Groz+Spanner+Set",
            "https://via.placeholder.com/400x300?text=Groz+Spanner+Detail"
        ],
        bestSeller: true,
        newArrival: false,
        variantType: "Size",
        variants: [
            { label: "8mm",       price: 85  },
            { label: "10mm",      price: 90  },
            { label: "12mm",      price: 100 },
            { label: "14mm",      price: 110 },
            { label: "17mm",      price: 130 },
            { label: "19mm",      price: 150 },
            { label: "22mm",      price: 180 },
            { label: "Set 8 Pcs", price: 850 }
        ]
    },
    {
        id: 14,
        name: "Torque Wrench",
        brand: "Groz",
        description: "Groz click-type torque wrench. Dual-direction ratchet, adjustable torque range. Audible click on correct torque. Storage case included.",
        images: [
            "https://via.placeholder.com/400x300?text=Groz+Torque+Wrench",
            "https://via.placeholder.com/400x300?text=Torque+Scale+Detail",
            "https://via.placeholder.com/400x300?text=Torque+Head+Detail"
        ],
        bestSeller: false,
        newArrival: false,
        variantType: "Drive Size",
        variants: [
            { label: "1/4\"  —  5–25 Nm",    price: 1200 },
            { label: "3/8\"  — 20–110 Nm",   price: 1500 },
            { label: "1/2\"  — 40–210 Nm",   price: 1800 },
            { label: "3/4\"  — 100–500 Nm",  price: 3200 }
        ]
    },
    {
        id: 15,
        name: "Grease Gun",
        brand: "Groz",
        description: "Groz professional grease gun. Compatible with 400g cartridges. High-pressure output for hard-to-reach fittings. Available in lever, pistol, and mini types.",
        images: [
            "https://via.placeholder.com/400x300?text=Groz+Grease+Gun",
            "https://via.placeholder.com/400x300?text=Grease+Gun+Nozzle"
        ],
        bestSeller: true,
        newArrival: false,
        variantType: "Type",
        variants: [
            { label: "Lever Type",             price: 650 },
            { label: "Pistol Type",            price: 850 },
            { label: "Mini Type",              price: 480 },
            { label: "Flexible Hose (Extra)",  price: 220 }
        ]
    },
    {
        id: 16,
        name: "Extension Bar (Socket Drive)",
        brand: "Groz",
        description: "Groz chrome vanadium extension bar. Knurled grip for easy handling. Fits all standard socket sets. Multiple drive sizes and lengths available.",
        images: [
            "https://via.placeholder.com/400x300?text=Groz+Extension+Bar",
            "https://via.placeholder.com/400x300?text=Extension+Bar+End"
        ],
        bestSeller: false,
        newArrival: false,
        variantType: "Size & Drive",
        variants: [
            { label: "1/4\"  75mm",  price: 180 },
            { label: "1/4\" 150mm",  price: 220 },
            { label: "3/8\"  75mm",  price: 220 },
            { label: "3/8\" 150mm",  price: 260 },
            { label: "3/8\" 250mm",  price: 310 },
            { label: "1/2\" 125mm",  price: 280 },
            { label: "1/2\" 250mm",  price: 350 },
            { label: "1/2\" 450mm",  price: 480 }
        ]
    },
    {
        id: 17,
        name: "Ratchet Handle",
        brand: "Groz",
        description: "Groz quick-release ratchet handle. 72-tooth mechanism for fine movement in tight spaces. Comfort grip. Available in 1/4\", 3/8\", and 1/2\" drive.",
        images: [
            "https://via.placeholder.com/400x300?text=Groz+Ratchet",
            "https://via.placeholder.com/400x300?text=Ratchet+Head+Detail"
        ],
        bestSeller: false,
        newArrival: true,
        variantType: "Drive Size",
        variants: [
            { label: "1/4 inch", price: 380 },
            { label: "3/8 inch", price: 480 },
            { label: "1/2 inch", price: 620 }
        ]
    },

    // ══ HAND TOOLS ═══════════════════════════════════════════
    {
        id: 18,
        name: "Socket Set",
        brand: "Hand Tools",
        description: "Complete socket set with metric sockets, ratchet handle, and extension bars in a blow-moulded carry case.",
        images: [
            "https://via.placeholder.com/400x300?text=Socket+Set",
            "https://via.placeholder.com/400x300?text=Socket+Set+Open"
        ],
        bestSeller: true,
        newArrival: false,
        variantType: "Piece Count",
        variants: [
            { label: "40 Pcs — 1/4\" & 1/2\"",       price: 1200 },
            { label: "72 Pcs — 1/4\", 3/8\" & 1/2\"", price: 2100 },
            { label: "94 Pcs — Full Pro Set",          price: 3200 }
        ]
    },
    {
        id: 19,
        name: "Ball Peen Hammer",
        brand: "Hand Tools",
        description: "Drop-forged steel ball peen hammer with hardwood handle. Heat-treated head for lasting durability.",
        images: [
            "https://via.placeholder.com/400x300?text=Ball+Peen+Hammer"
        ],
        bestSeller: false,
        newArrival: false,
        variantType: "Weight",
        variants: [
            { label: "250g", price: 180 },
            { label: "500g", price: 280 },
            { label: "1kg",  price: 420 }
        ]
    },
    {
        id: 20,
        name: "Plier Set",
        brand: "Hand Tools",
        description: "Chrome vanadium steel plier set. Includes combination, long nose, and cutting pliers with bi-material comfort grip handles.",
        images: [
            "https://via.placeholder.com/400x300?text=Plier+Set",
            "https://via.placeholder.com/400x300?text=Plier+Detail"
        ],
        bestSeller: false,
        newArrival: false,
        variantType: "Set Size",
        variants: [
            { label: "3 Pcs", price: 450 },
            { label: "5 Pcs", price: 720 }
        ]
    },

    // ══ POWER TOOLS ══════════════════════════════════════════
    {
        id: 21,
        name: "Angle Grinder",
        brand: "Power Tools",
        description: "Heavy-duty angle grinder with safety guard, spindle lock, and anti-restart protection. For grinding, cutting, and polishing metal.",
        images: [
            "https://via.placeholder.com/400x300?text=Angle+Grinder",
            "https://via.placeholder.com/400x300?text=Grinder+Guard+Detail",
            "https://via.placeholder.com/400x300?text=Grinder+Disc+Side"
        ],
        bestSeller: true,
        newArrival: false,
        variantType: "Disc Size",
        variants: [
            { label: "4 inch — 850W",  price: 2200 },
            { label: "5 inch — 1050W", price: 2800 },
            { label: "7 inch — 1800W", price: 4200 }
        ]
    },
    {
        id: 22,
        name: "Electric Drill",
        brand: "Power Tools",
        description: "Variable speed electric drill with keyless chuck. Forward/reverse rotation. For drilling metal, wood, and concrete.",
        images: [
            "https://via.placeholder.com/400x300?text=Electric+Drill",
            "https://via.placeholder.com/400x300?text=Drill+Chuck+Detail"
        ],
        bestSeller: false,
        newArrival: true,
        variantType: "Chuck Size",
        variants: [
            { label: "10mm — 500W",          price: 1500 },
            { label: "13mm — 750W",          price: 1900 },
            { label: "13mm — 1050W (Impact)", price: 2800 }
        ]
    }
];
