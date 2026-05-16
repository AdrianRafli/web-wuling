import { Car } from "@/types";

export const cars: Car[] = [
  // ===== SUV =====
  {
    id: "1",
    slug: "eksion",
    name: "Wuling Eksion",
    tagline: "Exploring Family Journeys",
    category: "SUV",
    thumbnail: "/images/cars/eksion/eksion-thumb.png",
    images: [
      { url: "/images/cars/eksion/eksion-ext-1.webp", alt: "Eksion Tampak Depan", type: "exterior" },
      { url: "/images/cars/eksion/eksion-ext-2.webp", alt: "Eksion Tampak Samping", type: "exterior" },
      { url: "/images/cars/eksion/eksion-ext-3.webp", alt: "Eksion Tampak Belakang", type: "exterior" },
      { url: "/images/cars/eksion/eksion-int-1.gif", alt: "Eksion Dashboard", type: "interior" },
      { url: "/images/cars/eksion/eksion-int-2.webp", alt: "Eksion Kursi Depan", type: "interior" },
      { url: "/images/cars/eksion/eksion-int-3.gif", alt: "Eksion Kursi Belakang", type: "interior" },
    ],
    highlights: [
      "7-Seater SUV",
      "EV & Plug-in Hybrid",
      "1000+ km Range",
      "Level 2 ADAS",
      "Panoramic Sunroof"
    ],
    isNew: true,
    variants: [
      {
        name: "Eksion EV CE",
        price: 405_800_000,
        transmission: "Single Speed",
        specs: {
          engine: "Motor Listrik",
          transmission: "Single Speed",
          power: "150 kW (201 hp)",
          torque: "310 Nm",
          fuelType: "Electric",
          seats: 7,

          dimensions: {
            length: 4745,
            width: 1850,
            height: 1755,
            wheelbase: 2810
          },

          battery: {
            capacity: "69.2 kWh",
            type: "Lithium Iron Phosphate"
          },

          range: {
            electric: "530 km"
          },

          drivetrain: "FWD",

          charging: {
            ac: "AC Charging",
            dc: "Fast Charging"
          },

          features: [
            "12.8\" Control Screen",
            "8.8\" Digital Cluster",
            "Wireless Android Auto & Apple CarPlay",
            "360° Camera",
            "Voice Command",
            "IoV System",
            "ADAS"
          ],
        },
      },
      {
        name: "Eksion EV EX",
        price: 475_800_000,
        transmission: "Single Speed",
        specs: {
          engine: "Motor Listrik",
          transmission: "Single Speed",
          power: "150 kW (201 hp)",
          torque: "310 Nm",
          fuelType: "Electric",
          seats: 7,

          dimensions: {
            length: 4745,
            width: 1850,
            height: 1755,
            wheelbase: 2810
          },

          battery: {
            capacity: "69.2 kWh",
            type: "Lithium Iron Phosphate"
          },

          range: {
            electric: "530 km"
          },

          drivetrain: "FWD",

          charging: {
            ac: "AC Charging",
            dc: "Fast Charging"
          },

          features: [
            "Panoramic Sunroof",
            "Ventilated Seats",
            "50W Wireless Charging",
            "360° Camera (Transparent Chassis)",
            "ADAS Level 2",
            "12.8\" Control Screen",
            "8.8\" Digital Cluster",
            "Wireless Android Auto & Apple CarPlay"
          ],
        },
      },
      {
        name: "Eksion PHEV CE",
        price: 478_000_000,
        transmission: "Dedicated Hybrid Transmission",
        specs: {
          engine: "1.5L Hybrid (Atkinson Cycle)",
          transmission: "Hybrid",
          power: "145 kW (195 hp)",
          torque: "230 Nm",
          fuelType: "Hybrid",
          seats: 7,
          dimensions: {
            length: 4745,
            width: 1850,
            height: 1755,
            wheelbase: 2810
          },
          features: [
            "1000+ km Range",
            "12.8\" Control Screen",
            "8.8\" Digital Cluster",
            "Wireless Android Auto & Apple CarPlay",
            "360° Camera",
            "Voice Command",
            "ADAS"
          ],
        },
      },
      {
        name: "Eksion PHEV EX",
        price: 528_000_000,
        transmission: "Dedicated Hybrid Transmission",
        specs: {
          engine: "1.5L Hybrid (Atkinson Cycle)",
          transmission: "Hybrid",
          power: "145 kW (195 hp)",
          torque: "230 Nm",
          fuelType: "Hybrid",
          seats: 7,
          dimensions: {
            length: 4745,
            width: 1850,
            height: 1755,
            wheelbase: 2810
          },
          features: [
            "1000+ km Range",
            "Panoramic Sunroof",
            "Ventilated Seats",
            "50W Wireless Charging",
            "360° Camera (Transparent Chassis)",
            "ADAS Level 2",
            "Wireless Android Auto & Apple CarPlay"
          ],
        },
      },
    ],
  },
  {
    id: "2",
    slug: "darion",
    name: "Darion",
    tagline: "Premium Family MPV",
    category: "MPV",
    thumbnail: "/images/cars/darion/darion-thumb.png",
    images: [
      { url: "/images/cars/darion/darion-ext-1.webp", alt: "Darion Tampak Depan", type: "exterior" },
      { url: "/images/cars/darion/darion-ext-2.webp", alt: "Darion Tampak Samping", type: "exterior" },
      { url: "/images/cars/darion/darion-ext-3.webp", alt: "Darion Tampak Samping", type: "exterior" },
      { url: "/images/cars/darion/darion-ext-4.webp", alt: "Darion Tampak Samping", type: "exterior" },
      { url: "/images/cars/darion/darion-int-1.webp", alt: "Darion Dashboard", type: "interior" },
      { url: "/images/cars/darion/darion-int-2.webp", alt: "Darion Captain Seat", type: "interior" },
      { url: "/images/cars/darion/darion-int-3.webp", alt: "Darion Captain Seat", type: "interior" },
    ],
    highlights: [
      "7-Seater MPV",
      "EV & Plug-in Hybrid",
      "Captain Seat",
      "Dual Sliding Door",
      "ADAS Level 2"
    ],
    isNew: true,
    variants: [
      {
        name: "Darion EV CE",
        price: 405_800_000,
        transmission: "Single Speed",
        specs: {
          engine: "Motor Listrik",
          transmission: "Single Speed",
          power: "150 kW (201 hp)",
          torque: "310 Nm",
          fuelType: "Electric",
          seats: 7,

          dimensions: {
            length: 4910,
            width: 1870,
            height: 1770,
            wheelbase: 2910
          },

          battery: {
            capacity: "69.2 kWh",
            type: "Lithium Iron Phosphate"
          },

          range: {
            electric: "540 km"
          },

          drivetrain: "FWD",

          charging: {
            ac: "AC Charging",
            dc: "Fast Charging"
          },

          features: [
            "Dual Sliding Door",
            "Captain Seat",
            "12.8\" Control Screen",
            "8.8\" Digital Cluster",
            "360° Camera",
            "Voice Command",
            "IoV System",
            "ADAS"
          ],
        },
      },
      {
        name: "Darion EV EX",
        price: 465_800_000,
        transmission: "Single Speed",
        specs: {
          engine: "Motor Listrik",
          transmission: "Single Speed",
          power: "150 kW (201 hp)",
          torque: "310 Nm",
          fuelType: "Electric",
          seats: 7,

          dimensions: {
            length: 4910,
            width: 1870,
            height: 1770,
            wheelbase: 2910
          },

          battery: {
            capacity: "69.2 kWh",
            type: "Lithium Iron Phosphate"
          },

          range: {
            electric: "540 km"
          },

          drivetrain: "FWD",

          charging: {
            ac: "AC Charging",
            dc: "Fast Charging"
          },

          features: [
            "Electric Sunroof",
            "Ventilated Seats",
            "Electric 2nd Row Seat",
            "Captain Seat",
            "Dual Sliding Door",
            "50W Wireless Charging",
            "360° Camera",
            "ADAS Level 2"
          ],
        },
      },
      {
        name: "Darion PHEV CE",
        price: 468_000_000,
        transmission: "Dedicated Hybrid Transmission",
        specs: {
          engine: "1.5L Hybrid (Atkinson Cycle)",
          transmission: "Hybrid",
          power: "145 kW (195 hp)",
          torque: "230 Nm",
          fuelType: "Hybrid",
          seats: 7,

          dimensions: {
            length: 4910,
            width: 1870,
            height: 1770,
            wheelbase: 2910
          },

          battery: {
            capacity: "20.5 kWh",
            type: "Lithium Iron Phosphate"
          },

          range: {
            electric: "125 km",
            hybrid: "1000+ km"
          },

          drivetrain: "FWD",

          features: [
            "Dual Sliding Door",
            "Captain Seat",
            "12.8\" Control Screen",
            "8.8\" Digital Cluster",
            "360° Camera",
            "Voice Command",
            "ADAS"
          ],
        },
      },
      {
        name: "Darion PHEV EX",
        price: 518_000_000,
        transmission: "Dedicated Hybrid Transmission",
        specs: {
          engine: "1.5L Hybrid (Atkinson Cycle)",
          transmission: "Hybrid",
          power: "145 kW (195 hp)",
          torque: "230 Nm",
          fuelType: "Hybrid",
          seats: 7,

          dimensions: {
            length: 4910,
            width: 1870,
            height: 1770,
            wheelbase: 2910
          },

          battery: {
            capacity: "20.5 kWh",
            type: "Lithium Iron Phosphate"
          },

          range: {
            electric: "125 km",
            hybrid: "1000+ km"
          },

          drivetrain: "FWD",

          features: [
            "Electric Sunroof",
            "Ventilated Seats",
            "Electric 2nd Row Seat",
            "Captain Seat",
            "Dual Sliding Door",
            "50W Wireless Charging",
            "360° Camera",
            "ADAS Level 2"
          ],
        },
      },
    ],
  },
  {
    id: "3",
    slug: "air-ev",
    name: "New Air ev",
    tagline: "Smart Urban EV",
    category: "Electric",
    thumbnail: "/images/cars/airev/airev-thumb.png",
    images: [
      { url: "/images/cars/airev/airev-ext-1.webp", alt: "Air ev Tampak Depan", type: "exterior" },
      { url: "/images/cars/airev/airev-ext-2.webp", alt: "Air ev Tampak Samping", type: "exterior" },
      { url: "/images/cars/airev/airev-ext-3.webp", alt: "Air ev Tampak Samping", type: "exterior" },
      { url: "/images/cars/airev/airev-int-1.webp", alt: "Air ev Dashboard", type: "interior" },
      { url: "/images/cars/airev/airev-int-2.webp", alt: "Air ev Kabin", type: "interior" },
      { url: "/images/cars/airev/airev-int-3.webp", alt: "Air ev Kabin", type: "interior" },
      { url: "/images/cars/airev/airev-int-4.webp", alt: "Air ev Kabin", type: "interior" },
    ],
    highlights: [
      "Zero Emission",
      "Easy Home Charging",
      "Compact City Car",
      "4-Seater",
      "Low Running Cost"
    ],
    isNew: true,
    isElectric: true,
    variants: [
      {
        name: "Air EV Lite 200",
        price: 220_700_000,
        transmission: "Single Speed",
        specs: {
          engine: "Motor Listrik",
          transmission: "Single Speed",
          power: "30 kW (41 hp)",
          torque: "110 Nm",
          fuelType: "Electric",
          seats: 4,

          dimensions: {
            length: 2974,
            width: 1505,
            height: 1631,
            wheelbase: 2010
          },

          battery: {
            capacity: "17.3 kWh",
            type: "Lithium Iron Phosphate"
          },

          range: {
            electric: "200 km"
          },

          drivetrain: "RWD",

          charging: {
            ac: "Home Charging"
          },

          features: [
            "Integrated Floating Widescreen",
            "Smart Start System",
            "Rear Parking Camera",
            "Wuling Remote App",
            "EPB & AVH",
          ],
        },
      },
      {
        name: "Air EV Lite 300",
        price: 257_600_000,
        transmission: "Single Speed",
        specs: {
          engine: "Motor Listrik",
          transmission: "Single Speed",
          power: "30 kW (41 hp)",
          torque: "110 Nm",
          fuelType: "Electric",
          seats: 4,

          dimensions: {
            length: 2974,
            width: 1505,
            height: 1631,
            wheelbase: 2010
          },

          battery: {
            capacity: "26.7 kWh",
            type: "Lithium Iron Phosphate"
          },

          range: {
            electric: "300 km"
          },

          drivetrain: "RWD",

          charging: {
            ac: "Home Charging"
          },

          features: [
            "Integrated Floating Widescreen",
            "Smart Start System",
            "Rear Parking Camera",
            "Wuling Remote App",
            "EPB & AVH",
          ],
        },
      },
      {
        name: "Air EV Pro 300",
        price: 314_800_000,
        transmission: "Single Speed",
        specs: {
          engine: "Motor Listrik",
          transmission: "Single Speed",
          power: "50 kW (68 hp)",
          torque: "150 Nm",
          fuelType: "Electric",
          seats: 4,

          dimensions: {
            length: 2974,
            width: 1505,
            height: 1631,
            wheelbase: 2010
          },

          battery: {
            capacity: "26.7 kWh",
            type: "Lithium Iron Phosphate"
          },

          range: {
            electric: "300 km"
          },

          drivetrain: "RWD",

          charging: {
            ac: "Home Charging",
            dc: "Fast Charging"
          },

          features: [
            "Integrated Floating Widescreen",
            "Smart Start System",
            "Rear Parking Camera",
            "Wuling Remote App",
            "EPB, AVH & HHC",
            "Fast Charging",
            "Smartphone Connectivity"
          ],
        },
      },
    ],
  },
  {
    id: "4",
    slug: "binguo-ev",
    name: "New Binguo EV",
    tagline: "Next Gen Electric Hatchback",
    category: "Electric",
    thumbnail: "/images/cars/binguoev/binguoev-thumb.png",
    images: [
      { url: "/images/cars/binguoev/binguoev-ext-1.webp", alt: "BinguoEV Tampak Depan", type: "exterior" },
      { url: "/images/cars/binguoev/binguoev-ext-2.webp", alt: "BinguoEV Tampak Samping", type: "exterior" },
      { url: "/images/cars/binguoev/binguoev-ext-3.webp", alt: "BinguoEV Tampak Samping", type: "exterior" },
      { url: "/images/cars/binguoev/binguoev-ext-4.webp", alt: "BinguoEV Tampak Samping", type: "exterior" },
      { url: "/images/cars/binguoev/binguoev-int-1.webp", alt: "BinguoEV Dashboard", type: "interior" },
      { url: "/images/cars/binguoev/binguoev-int-2.webp", alt: "BinguoEV Kabin", type: "interior" },
      { url: "/images/cars/binguoev/binguoev-int-3.webp", alt: "BinguoEV Kabin", type: "interior" },
      { url: "/images/cars/binguoev/binguoev-int-4.webp", alt: "BinguoEV Kabin", type: "interior" },
    ],
    highlights: [
      "Electric Hatchback",
      "333 km Range",
      "Spacious Cabin",
      "Dual 10.25\" Screen",
      "Fast Charging DC"
    ],
    isNew: true,
    isElectric: true,
    variants: [
      {
        name: "Binguo EV Lite",
        price: 324_200_000,
        transmission: "Single Speed",
        specs: {
          engine: "Motor Listrik",
          transmission: "Single Speed",
          power: "50 kW (68 hp)",
          torque: "150 Nm",
          fuelType: "Electric",
          seats: 4,

          dimensions: {
            length: 3950,
            width: 1708,
            height: 1580,
            wheelbase: 2560
          },

          battery: {
            capacity: "31.9 kWh",
            type: "Lithium Ferro-Phosphate (IP67)"
          },

          range: {
            electric: "333 km"
          },

          drivetrain: "FWD",

          charging: {
            ac: "±5.5 jam (20-100%)",
          },

          features: [
            "Dual 10.25\" Screen",
            "Smartphone Interconnection",
            "Rear Parking Sensor",
            "Rear Camera",
            "Keyless Entry & Smart Start",
            "Electronic Parking Brake",
            "790L Baggage Capacity"
          ],
        },
      },
      {
        name: "Binguo EV Pro",
        price: 369_300_000,
        transmission: "Single Speed",
        specs: {
          engine: "Motor Listrik",
          transmission: "Single Speed",
          power: "50 kW (68 hp)",
          torque: "150 Nm",
          fuelType: "Electric",
          seats: 4,

          dimensions: {
            length: 3950,
            width: 1708,
            height: 1580,
            wheelbase: 2560
          },

          battery: {
            capacity: "31.9 kWh",
            type: "Lithium Ferro-Phosphate (IP67)"
          },

          range: {
            electric: "333 km"
          },

          drivetrain: "FWD",

          charging: {
            ac: "±5.5 jam (20-100%)",
            dc: "±35 menit (30-80%)"
          },

          features: [
            "Dual 10.25\" Screen",
            "Smartphone Interconnection",
            "Electric Driver Seat",
            "Premium Interior (Synthetic Leather)",
            "Rear Camera",
            "Keyless Entry & Smart Start",
            "Electronic Parking Brake",
            "Cruise Control",
            "790L Baggage Capacity",
            "Fast Charging DC"
          ],
        },
      },
    ],
  },
  {
    id: "5",
    slug: "cloud-ev",
    name: "New Cloud EV",
    tagline: "Home-like Comfort Electric Experience",
    category: "Electric",
    thumbnail: "/images/cars/cloudev/cloudev-thumb.png",
    images: [
      { url: "/images/cars/cloudev/cloudev-ext-1.webp", alt: "Cloud EV Tampak Depan", type: "exterior" },
      { url: "/images/cars/cloudev/cloudev-ext-2.webp", alt: "Cloud EV Tampak Samping", type: "exterior" },
      { url: "/images/cars/cloudev/cloudev-int-1.webp", alt: "Cloud EV Dashboard", type: "interior" },
      { url: "/images/cars/cloudev/cloudev-int-2.webp", alt: "Cloud EV Kabin", type: "interior" },
      { url: "/images/cars/cloudev/cloudev-int-3.webp", alt: "Cloud EV Kabin", type: "interior" },
      { url: "/images/cars/cloudev/cloudev-int-4.webp", alt: "Cloud EV Kabin", type: "interior" },
    ],
    highlights: [
      "460 km Range",
      "Sofa Mode 135°",
      "Smart Electric Tailgate",
      "15.6\" Control Screen",
      "ADAS"
    ],
    isNew: true,
    isElectric: true,
    variants: [
      {
        name: "Cloud EV Lite",
        price: 422_000_000,
        transmission: "Single Speed",
        specs: {
          engine: "Permanent Magnet Synchronous Motor",
          transmission: "Single Speed",
          power: "100 kW (134 hp)",
          torque: "200 Nm",
          fuelType: "Electric",
          seats: 5,

          dimensions: {
            length: 4295,
            width: 1850,
            height: 1652,
            wheelbase: 2700
          },

          battery: {
            capacity: "50.6 kWh",
            type: "Lithium Ferro Phosphate (LFP)"
          },

          range: {
            electric: "460 km"
          },

          drivetrain: "FWD",

          charging: {
            ac: "±7 jam (20-100%)",
            dc: "±30 menit (30-80%)"
          },

          features: [
            "10.1\" TFT Display",
            "Rear Camera",
            "Keyless Entry & Smart Start",
            "Digital AC",
            "6 Speakers",
            "Parking Assist",
            "Flat-folding Rear Seats",
            "Multi Information Display"
          ],
        },
      },
      {
        name: "Cloud EV Pro",
        price: 450_700_000,
        transmission: "Single Speed",
        specs: {
          engine: "Permanent Magnet Synchronous Motor",
          transmission: "Single Speed",
          power: "100 kW (134 hp)",
          torque: "200 Nm",
          fuelType: "Electric",
          seats: 5,

          dimensions: {
            length: 4295,
            width: 1850,
            height: 1652,
            wheelbase: 2700
          },

          battery: {
            capacity: "50.6 kWh",
            type: "Lithium Ferro Phosphate (LFP)"
          },

          range: {
            electric: "460 km"
          },

          drivetrain: "FWD",

          charging: {
            ac: "±7 jam (20-100%)",
            dc: "±30 menit (30-80%)"
          },

          features: [
            "15.6\" Control Screen",
            "8.8\" Digital Cluster",
            "360° Camera",
            "ADAS",
            "Wireless Charger",
            "Smart Electric Tailgate",
            "Sofa Mode 135° Recline",
            "Ambient Light",
            "Electric Seat Adjustment",
            "Italian-style Bubble Seat",
            "Wuling Remote App (IoV)"
          ],
        },
      },
    ],
  },
  // {
  //   id: "2",
  //   slug: "almaz-rs",
  //   name: "New Almaz RS",
  //   tagline: "Redefine Your Journey",
  //   category: "SUV",
  //   thumbnail: "/images/cars/almaz-rs-thumb.webp",
  //   images: [
  //     { url: "/images/cars/almaz-rs-ext-1.webp", alt: "Almaz RS Tampak Depan", type: "exterior" },
  //     { url: "/images/cars/almaz-rs-ext-2.webp", alt: "Almaz RS Tampak Samping", type: "exterior" },
  //     { url: "/images/cars/almaz-rs-ext-3.webp", alt: "Almaz RS Tampak Belakang", type: "exterior" },
  //     { url: "/images/cars/almaz-rs-int-1.webp", alt: "Almaz RS Dashboard", type: "interior" },
  //     { url: "/images/cars/almaz-rs-int-2.webp", alt: "Almaz RS Kursi Depan", type: "interior" },
  //     { url: "/images/cars/almaz-rs-int-3.webp", alt: "Almaz RS Kursi Belakang", type: "interior" },
  //   ],
  //   highlights: ["2.0L Turbo 197 hp", "Ventilated Seats", "12.3\" Digital Cluster"],
  //   isNew: true,
  //   variants: [
  //     {
  //       name: "Almaz RS Pro",
  //       price: 399_900_000,
  //       transmission: "CVT",
  //       specs: {
  //         engine: "2.0L Turbo",
  //         transmission: "CVT",
  //         power: "197 hp",
  //         torque: "320 Nm",
  //         fuelType: "Bensin",
  //         seats: 7,
  //         dimensions: { length: 4720, width: 1860, height: 1770, wheelbase: 2800 },
  //         features: ["Panoramic Sunroof", "Head-up Display", "12.3\" Digital Cluster", "360° Camera", "Ventilated Seats", "ADAS", "Wireless Charging", "Electric Parking Brake"],
  //       },
  //     },
  //   ],
  // },
  {
    id: "6",
    slug: "alvez",
    name: "New Alvez",
    tagline: "Born Extraordinary",
    category: "SUV",
    thumbnail: "/images/cars/alvez/alvez-thumb.png",
    images: [
      { url: "/images/cars/alvez/alvez-ext-1.webp", alt: "Alvez Tampak Depan", type: "exterior" },
      { url: "/images/cars/alvez/alvez-ext-2.webp", alt: "Alvez Tampak Samping", type: "exterior" },
      { url: "/images/cars/alvez/alvez-ext-3.webp", alt: "Alvez Tampak Belakang", type: "exterior" },
      { url: "/images/cars/alvez/alvez-ext-4.webp", alt: "Alvez Tampak Belakang", type: "exterior" },
      { url: "/images/cars/alvez/alvez-int-1.webp", alt: "Alvez Dashboard", type: "interior" },
      { url: "/images/cars/alvez/alvez-int-2.webp", alt: "Alvez Kursi Depan", type: "interior" },
      { url: "/images/cars/alvez/alvez-int-3.webp", alt: "Alvez Kursi Belakang", type: "interior" },
      { url: "/images/cars/alvez/alvez-int-4.webp", alt: "Alvez Kursi Belakang", type: "interior" },
    ],
    highlights: ["Panoramic Sunroof", "Wireless CarPlay", "ADAS"],
    isNew: true,
    variants: [
      {
        name: "New Alvez CE MT",
        price: 232_900_000,
        transmission: "MT",
        specs: {
          engine: "1.5L",
          transmission: "CVT",
          power: "107 hp",
          torque: "145 Nm",
          fuelType: "Bensin",
          seats: 5,
          dimensions: { length: 4385, width: 1810, height: 1650, wheelbase: 2600 },
          features: ["10.25\" Touchscreen", "Kamera Belakang", "Keyless Entry", "TPMS"],
        },
      },
      {
        name: "New Alvez CE AT",
        price: 280_300_000,
        transmission: "AT",
        specs: {
          engine: "1.5L",
          transmission: "CVT",
          power: "107 hp",
          torque: "145 Nm",
          fuelType: "Bensin",
          seats: 5,
          dimensions: { length: 4385, width: 1810, height: 1650, wheelbase: 2600 },
          features: ["10.25\" Touchscreen", "Wireless CarPlay & Android Auto", "Panoramic Sunroof", "ADAS", "Wireless Charging", "Keyless Entry"],
        },
      },
      {
        name: "Alvez 1.5 CVT Lux+",
        price: 321_600_000,
        transmission: "AT",
        specs: {
          engine: "1.5L",
          transmission: "CVT",
          power: "107 hp",
          torque: "145 Nm",
          fuelType: "Bensin",
          seats: 5,
          dimensions: { length: 4385, width: 1810, height: 1650, wheelbase: 2600 },
          features: ["10.25\" Touchscreen", "Wireless CarPlay & Android Auto", "Panoramic Sunroof", "ADAS", "Wireless Charging", "360° Camera", "Head-up Display", "Keyless Entry"],
        },
      },
    ],
  },

  // ===== MPV =====
  {
    id: "7",
    slug: "confero",
    name: "Confero DB",
    tagline: "Spacious Family MPV with Double Blower AC",
    category: "MPV",
    thumbnail: "/images/cars/confero/confero-thumb.png",
    images: [
      { url: "/images/cars/confero/confero-ext-1.webp", alt: "Confero Tampak Depan", type: "exterior" },
      { url: "/images/cars/confero/confero-ext-2.webp", alt: "Confero Tampak Samping", type: "exterior" },
      { url: "/images/cars/confero/confero-ext-3.webp", alt: "Confero Tampak Samping", type: "exterior" },
      { url: "/images/cars/confero/confero-ext-4.webp", alt: "Confero Tampak Samping", type: "exterior" },
      { url: "/images/cars/confero/confero-int-1.webp", alt: "Confero Dashboard", type: "interior" },
      { url: "/images/cars/confero/confero-int-2.webp", alt: "Confero Kabin Belakang", type: "interior" },
      { url: "/images/cars/confero/confero-int-3.webp", alt: "Confero Kabin Belakang", type: "interior" },
      { url: "/images/cars/confero/confero-int-4.webp", alt: "Confero Kabin Belakang", type: "interior" },
    ],
    highlights: [
      "8-Seater MPV",
      "Double Blower AC",
      "Rear Wheel Drive",
      "Spacious Cabin",
      "Affordable Family Car"
    ],
    variants: [
      {
        name: "Confero DB",
        price: 207_500_000,
        transmission: "MT",
        specs: {
          engine: "1.5L DOHC 4-Cylinder",
          transmission: "Manual 5-Speed",
          power: "98 PS @ 5,800 rpm",
          torque: "135 Nm @ 3,800-4,200 rpm",
          fuelType: "Bensin",
          seats: 8,

          dimensions: {
            length: 4493,
            width: 1691,
            height: 1715,
            wheelbase: 2720
          },

          features: [
            "Double Blower AC",
            "Electric Power Steering (EPS)",
            "Rear Wheel Drive",
            "Front Disc Brake",
            "Rear Drum Brake",
            "15\" Steel Wheel with Full Cap",
            "Rack & Pinion Steering",
            "McPherson Front Suspension",
            "Semi-independent Rear Suspension",
            "AM/FM Radio",
            "Spacious Cabin",
            "Rear AC Vent"
          ],
        },
      },
    ],
  },

  // ===== ELECTRIC =====

  // ===== COMMERCIAL =====
  {
    id: "8",
    slug: "mitra-ev",
    name: "Mitra EV",
    tagline: "Electric Commercial Vehicle for Business",
    category: "Electric",
    thumbnail: "/images/cars/mitraev/mitraev-thumb.png",
    images: [
      { url: "/images/cars/mitraev/mitraev-ext-1.webp", alt: "Mitra EV Tampak Depan", type: "exterior" },
      { url: "/images/cars/mitraev/mitraev-ext-2.webp", alt: "Mitra EV Tampak Samping", type: "exterior" },
      { url: "/images/cars/mitraev/mitraev-int-1.webp", alt: "Mitra EV Kabin Kargo", type: "interior" },
      { url: "/images/cars/mitraev/mitraev-int-2.webp", alt: "Mitra EV Dashboard", type: "interior" },
    ],
    highlights: [
      "Electric Commercial Vehicle",
      "Up to 400 km Range",
      "Fast Charging DC",
      "Dual Sliding Door",
      "Large Cargo Capacity"
    ],
    isNew: true,
    isElectric: true,
    variants: [
      {
        name: "Mitra EV Blind Van Long Range",
        price: 337_000_000,
        transmission: "Single Speed",
        specs: {
          engine: "Permanent Magnet Synchronous Motor",
          transmission: "Single Speed",
          power: "75 kW",
          torque: "180 Nm",
          fuelType: "Electric",
          seats: 2,

          dimensions: {
            length: 5010,
            width: 1800,
            height: 1975,
            wheelbase: 3050
          },

          battery: {
            capacity: "41.9 kWh",
            type: "Lithium Iron Phosphate"
          },

          range: {
            electric: "300 km"
          },

          drivetrain: "RWD",

          charging: {
            dc: "±30 menit (30-80%)"
          },

          features: [
            "Dual Sliding Door",
            "Rear Barn Door 270°",
            "3.5\" TFT Cluster",
            "Rotary Gear Selector",
            "Rear Parking Sensor",
            "ABS + EBD",
            "TPMS",
            "Driver Airbag",
            "Electric AC",
            "AM/FM, USB, Bluetooth"
          ],
        },
      },
      {
        name: "Mitra EV Blind Van Premium Range",
        price: 367_000_000,
        transmission: "Single Speed",
        specs: {
          engine: "Permanent Magnet Synchronous Motor",
          transmission: "Single Speed",
          power: "75 kW",
          torque: "180 Nm",
          fuelType: "Electric",
          seats: 2,

          dimensions: {
            length: 5010,
            width: 1800,
            height: 1975,
            wheelbase: 3050
          },

          battery: {
            capacity: "56.2 kWh",
            type: "Lithium Iron Phosphate"
          },

          range: {
            electric: "400 km"
          },

          drivetrain: "RWD",

          charging: {
            dc: "±30 menit (30-80%)"
          },

          features: [
            "Dual Sliding Door",
            "Rear Barn Door 270°",
            "Cargo Capacity up to 6.5 m³",
            "3.5\" TFT Cluster",
            "Rotary Gear Selector",
            "Rear Parking Sensor",
            "ABS + EBD",
            "TPMS",
            "Driver Airbag",
            "Electric AC",
            "AM/FM, USB, Bluetooth"
          ],
        },
      },
      {
        name: "Mitra EV Minibus Long Range",
        price: 357_000_000,
        transmission: "Single Speed",
        specs: {
          engine: "Permanent Magnet Synchronous Motor",
          transmission: "Single Speed",
          power: "75 kW",
          torque: "180 Nm",
          fuelType: "Electric",
          seats: 8,

          dimensions: {
            length: 5010,
            width: 1800,
            height: 1975,
            wheelbase: 3050
          },

          battery: {
            capacity: "41.9 kWh",
            type: "Lithium Iron Phosphate"
          },

          range: {
            electric: "300 km"
          },

          drivetrain: "RWD",

          charging: {
            dc: "±30 menit (30-80%)"
          },

          features: [
            "8-Seater Minibus",
            "Dual Sliding Door",
            "Rear AC Double Blower",
            "3.5\" TFT Cluster",
            "Rear Parking Sensor",
            "ABS + EBD",
            "TPMS",
            "Dual Airbag",
            "Electric AC",
            "USB & Bluetooth"
          ],
        },
      },
      {
        name: "Mitra EV Minibus Premium Range",
        price: 387_500_000,
        transmission: "Single Speed",
        specs: {
          engine: "Permanent Magnet Synchronous Motor",
          transmission: "Single Speed",
          power: "75 kW",
          torque: "180 Nm",
          fuelType: "Electric",
          seats: 8,

          dimensions: {
            length: 5010,
            width: 1800,
            height: 1975,
            wheelbase: 3050
          },

          battery: {
            capacity: "56.2 kWh",
            type: "Lithium Iron Phosphate"
          },

          range: {
            electric: "400 km"
          },

          drivetrain: "RWD",

          charging: {
            dc: "±30 menit (30-80%)"
          },

          features: [
            "8-Seater Minibus",
            "Dual Sliding Door",
            "Rear AC Double Blower",
            "Premium Range Battery",
            "3.5\" TFT Cluster",
            "Rear Parking Sensor",
            "ABS + EBD",
            "TPMS",
            "Dual Airbag",
            "Electric AC",
            "USB & Bluetooth"
          ],
        },
      },
    ],
  },
  {
    id: "9",
    slug: "formo-max",
    name: "Formo Max",
    tagline: "Powerful Pick Up for Business Needs",
    category: "MPV",
    thumbnail: "/images/cars/formomax/formomax-thumb.png",
    images: [
      { url: "/images/cars/formomax/formomax-ext-1.webp", alt: "Formo Max Tampak Depan", type: "exterior" },
      { url: "/images/cars/formomax/formomax-ext-2.webp", alt: "Formo Max Tampak Samping", type: "exterior" },
      { url: "/images/cars/formomax/formomax-int-1.webp", alt: "Formo Max Dashboard", type: "interior" },
      { url: "/images/cars/formomax/formomax-int-2.webp", alt: "Formo Max Bak", type: "interior" },
      { url: "/images/cars/formomax/formomax-int-3.webp", alt: "Formo Max Bak", type: "interior" },
      { url: "/images/cars/formomax/formomax-int-4.webp", alt: "Formo Max Bak", type: "interior" },
    ],
    highlights: [
      "Bak Luas 2.7 Meter",
      "Mesin 1.5L 98 HP",
      "Kapasitas Angkut Besar",
      "Rear Wheel Drive",
      "Tangguh untuk Usaha"
    ],
    variants: [
    {
      name: "Formo Max Standard",
      price: 222_000_000,
      transmission: "MT",
      specs: {
        engine: "1.5L DOHC 4-Cylinder",
        transmission: "Manual 5-Speed",
        power: "98 hp @ 5,800 rpm",
        torque: "140 Nm @ 3,400-4,400 rpm",
        fuelType: "Bensin",
        seats: 2,

        dimensions: {
          length: 5135,
          width: 1725,
          height: 1740,
          wheelbase: 3160
        },

        features: [
          "Bak 2.695 mm",
          "Electric Power Steering (EPS)",
          "ABS + EBD",
          "Rear Wheel Drive",
          "Front Disc Brake",
          "Rear Drum Brake",
          "Leaf Spring Suspension",
          "AM/FM Radio + USB",
          "2 Speaker",
          "Remote Key",
          "Power Window"
        ],
      },
    },
    {
      name: "Formo Max AC",
      price: 230_000_000,
      transmission: "MT",
      specs: {
        engine: "1.5L DOHC 4-Cylinder",
        transmission: "Manual 5-Speed",
        power: "98 hp @ 5,800 rpm",
        torque: "140 Nm @ 3,400-4,400 rpm",
        fuelType: "Bensin",
        seats: 2,

        dimensions: {
          length: 5135,
          width: 1725,
          height: 1740,
          wheelbase: 3160
        },

        features: [
          "Bak 2.695 mm",
          "Air Conditioner",
          "Electric Power Steering (EPS)",
          "ABS + EBD",
          "Rear Wheel Drive",
          "Front Disc Brake",
          "Rear Drum Brake",
          "Leaf Spring Suspension",
          "AM/FM Radio + USB",
          "2 Speaker",
          "Remote Key",
          "Power Window"
        ],
      },
    },
  ],
},
];

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find((car) => car.slug === slug);
}

export function getCarsByCategory(category: Car["category"]): Car[] {
  return cars.filter((car) => car.category === category);
}

export function getAllCategories(): Car["category"][] {
  return [...new Set(cars.map((car) => car.category))];
}