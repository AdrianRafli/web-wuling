import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Mulai seeding database Wuling Semarang...\n");

  // ============================================================
  // HAPUS DATA LAMA (urutan penting karena foreign key)
  // ============================================================
  await prisma.lead.deleteMany();
  await prisma.dealerHours.deleteMany();
  await prisma.dealer.deleteMany();
  await prisma.carVariantSpec.deleteMany();
  await prisma.carVariant.deleteMany();
  await prisma.carHighlight.deleteMany();
  await prisma.carImage.deleteMany();
  await prisma.car.deleteMany();
  console.log("🗑️  Data lama dihapus.\n");

  // ============================================================
  // DEALER — dari dealer.ts
  // ============================================================
  const dealer = await prisma.dealer.create({
    data: {
      name: "Wuling Motors Semarang",
      address: "Jl. Pemuda No. 123, Sekayu, Semarang Tengah",
      city: "Semarang, Jawa Tengah",
      phone: "628133399568",
      whatsapp: "628133399568",
      email: "adrianrafly20@gmail.com",
      lat: -6.9667,
      lng: 110.4167,
      hours: {
        create: {
          weekday: "08.00 – 17.00 WIB",
          saturday: "08.00 – 15.00 WIB",
          sunday: "Tutup",
        },
      },
    },
  });
  console.log(`✅ Dealer: ${dealer.name}\n`);
  console.log("🚗 Seeding mobil...");

  // ============================================================
  // 1. WULING EKSION — slug: eksion
  // ============================================================
  await prisma.car.create({
    data: {
      slug: "eksion",
      name: "Wuling Eksion",
      tagline: "Exploring Family Journeys",
      category: "SUV",
      thumbnail: "/images/cars/eksion/eksion-thumb.png",
      isNew: true,
      isElectric: false,
      highlights: {
        create: [
          { text: "7-Seater SUV",        order: 1 },
          { text: "EV & Plug-in Hybrid", order: 2 },
          { text: "1000+ km Range",      order: 3 },
          { text: "Level 2 ADAS",        order: 4 },
          { text: "Panoramic Sunroof",   order: 5 },
        ],
      },
      images: {
        create: [
          { url: "/images/cars/eksion/eksion-ext-1.webp", alt: "Eksion Tampak Depan",    type: "exterior", order: 1 },
          { url: "/images/cars/eksion/eksion-ext-2.webp", alt: "Eksion Tampak Samping",  type: "exterior", order: 2 },
          { url: "/images/cars/eksion/eksion-ext-3.webp", alt: "Eksion Tampak Belakang", type: "exterior", order: 3 },
          { url: "/images/cars/eksion/eksion-int-1.gif",  alt: "Eksion Dashboard",       type: "interior", order: 4 },
          { url: "/images/cars/eksion/eksion-int-2.webp", alt: "Eksion Kursi Depan",     type: "interior", order: 5 },
          { url: "/images/cars/eksion/eksion-int-3.gif",  alt: "Eksion Kursi Belakang",  type: "interior", order: 6 },
        ],
      },
      variants: {
        create: [
          {
            name: "Eksion EV CE",
            price: 405_800_000,
            transmission: "Single Speed",
            order: 1,
            specs: {
              create: {
                engine: "Motor Listrik",
                transmission: "Single Speed",
                power: "150 kW (201 hp)",
                torque: "310 Nm",
                fuelType: "Electric",
                seats: 7,
                drivetrain: "FWD",
                dimLength: 4745, dimWidth: 1850, dimHeight: 1755, dimWheelbase: 2810,
                batteryCapacity: "69.2 kWh",
                batteryType: "Lithium Iron Phosphate",
                rangeElectric: "530 km",
                chargingAc: "AC Charging",
                chargingDc: "Fast Charging",
                features: [
                  "12.8\" Control Screen",
                  "8.8\" Digital Cluster",
                  "Wireless Android Auto & Apple CarPlay",
                  "360° Camera",
                  "Voice Command",
                  "IoV System",
                  "ADAS",
                ],
              },
            },
          },
          {
            name: "Eksion EV EX",
            price: 475_800_000,
            transmission: "Single Speed",
            order: 2,
            specs: {
              create: {
                engine: "Motor Listrik",
                transmission: "Single Speed",
                power: "150 kW (201 hp)",
                torque: "310 Nm",
                fuelType: "Electric",
                seats: 7,
                drivetrain: "FWD",
                dimLength: 4745, dimWidth: 1850, dimHeight: 1755, dimWheelbase: 2810,
                batteryCapacity: "69.2 kWh",
                batteryType: "Lithium Iron Phosphate",
                rangeElectric: "530 km",
                chargingAc: "AC Charging",
                chargingDc: "Fast Charging",
                features: [
                  "Panoramic Sunroof",
                  "Ventilated Seats",
                  "50W Wireless Charging",
                  "360° Camera (Transparent Chassis)",
                  "ADAS Level 2",
                  "12.8\" Control Screen",
                  "8.8\" Digital Cluster",
                  "Wireless Android Auto & Apple CarPlay",
                ],
              },
            },
          },
          {
            name: "Eksion PHEV CE",
            price: 478_000_000,
            transmission: "Dedicated Hybrid Transmission",
            order: 3,
            specs: {
              create: {
                engine: "1.5L Hybrid (Atkinson Cycle)",
                transmission: "Hybrid",
                power: "145 kW (195 hp)",
                torque: "230 Nm",
                fuelType: "Hybrid",
                seats: 7,
                drivetrain: "FWD",
                dimLength: 4745, dimWidth: 1850, dimHeight: 1755, dimWheelbase: 2810,
                features: [
                  "1000+ km Range",
                  "12.8\" Control Screen",
                  "8.8\" Digital Cluster",
                  "Wireless Android Auto & Apple CarPlay",
                  "360° Camera",
                  "Voice Command",
                  "ADAS",
                ],
              },
            },
          },
          {
            name: "Eksion PHEV EX",
            price: 528_000_000,
            transmission: "Dedicated Hybrid Transmission",
            order: 4,
            specs: {
              create: {
                engine: "1.5L Hybrid (Atkinson Cycle)",
                transmission: "Hybrid",
                power: "145 kW (195 hp)",
                torque: "230 Nm",
                fuelType: "Hybrid",
                seats: 7,
                drivetrain: "FWD",
                dimLength: 4745, dimWidth: 1850, dimHeight: 1755, dimWheelbase: 2810,
                features: [
                  "1000+ km Range",
                  "Panoramic Sunroof",
                  "Ventilated Seats",
                  "50W Wireless Charging",
                  "360° Camera (Transparent Chassis)",
                  "ADAS Level 2",
                  "Wireless Android Auto & Apple CarPlay",
                ],
              },
            },
          },
        ],
      },
    },
  });
  console.log("  ✓ Wuling Eksion (4 varian)");

  // ============================================================
  // 2. DARION — slug: darion
  // ============================================================
  await prisma.car.create({
    data: {
      slug: "darion",
      name: "Darion",
      tagline: "Premium Family MPV",
      category: "MPV",
      thumbnail: "/images/cars/darion/darion-thumb.png",
      isNew: true,
      isElectric: false,
      highlights: {
        create: [
          { text: "7-Seater MPV",       order: 1 },
          { text: "EV & Plug-in Hybrid", order: 2 },
          { text: "Captain Seat",        order: 3 },
          { text: "Dual Sliding Door",   order: 4 },
          { text: "ADAS Level 2",        order: 5 },
        ],
      },
      images: {
        create: [
          { url: "/images/cars/darion/darion-ext-1.webp", alt: "Darion Tampak Depan",   type: "exterior", order: 1 },
          { url: "/images/cars/darion/darion-ext-2.webp", alt: "Darion Tampak Samping", type: "exterior", order: 2 },
          { url: "/images/cars/darion/darion-ext-3.webp", alt: "Darion Tampak Samping", type: "exterior", order: 3 },
          { url: "/images/cars/darion/darion-ext-4.webp", alt: "Darion Tampak Samping", type: "exterior", order: 4 },
          { url: "/images/cars/darion/darion-int-1.webp", alt: "Darion Dashboard",      type: "interior", order: 5 },
          { url: "/images/cars/darion/darion-int-2.webp", alt: "Darion Captain Seat",   type: "interior", order: 6 },
          { url: "/images/cars/darion/darion-int-3.webp", alt: "Darion Captain Seat",   type: "interior", order: 7 },
        ],
      },
      variants: {
        create: [
          {
            name: "Darion EV CE",
            price: 405_800_000,
            transmission: "Single Speed",
            order: 1,
            specs: {
              create: {
                engine: "Motor Listrik",
                transmission: "Single Speed",
                power: "150 kW (201 hp)",
                torque: "310 Nm",
                fuelType: "Electric",
                seats: 7,
                drivetrain: "FWD",
                dimLength: 4910, dimWidth: 1870, dimHeight: 1770, dimWheelbase: 2910,
                batteryCapacity: "69.2 kWh",
                batteryType: "Lithium Iron Phosphate",
                rangeElectric: "540 km",
                chargingAc: "AC Charging",
                chargingDc: "Fast Charging",
                features: [
                  "Dual Sliding Door",
                  "Captain Seat",
                  "12.8\" Control Screen",
                  "8.8\" Digital Cluster",
                  "360° Camera",
                  "Voice Command",
                  "IoV System",
                  "ADAS",
                ],
              },
            },
          },
          {
            name: "Darion EV EX",
            price: 465_800_000,
            transmission: "Single Speed",
            order: 2,
            specs: {
              create: {
                engine: "Motor Listrik",
                transmission: "Single Speed",
                power: "150 kW (201 hp)",
                torque: "310 Nm",
                fuelType: "Electric",
                seats: 7,
                drivetrain: "FWD",
                dimLength: 4910, dimWidth: 1870, dimHeight: 1770, dimWheelbase: 2910,
                batteryCapacity: "69.2 kWh",
                batteryType: "Lithium Iron Phosphate",
                rangeElectric: "540 km",
                chargingAc: "AC Charging",
                chargingDc: "Fast Charging",
                features: [
                  "Electric Sunroof",
                  "Ventilated Seats",
                  "Electric 2nd Row Seat",
                  "Captain Seat",
                  "Dual Sliding Door",
                  "50W Wireless Charging",
                  "360° Camera",
                  "ADAS Level 2",
                ],
              },
            },
          },
          {
            name: "Darion PHEV CE",
            price: 468_000_000,
            transmission: "Dedicated Hybrid Transmission",
            order: 3,
            specs: {
              create: {
                engine: "1.5L Hybrid (Atkinson Cycle)",
                transmission: "Hybrid",
                power: "145 kW (195 hp)",
                torque: "230 Nm",
                fuelType: "Hybrid",
                seats: 7,
                drivetrain: "FWD",
                dimLength: 4910, dimWidth: 1870, dimHeight: 1770, dimWheelbase: 2910,
                batteryCapacity: "20.5 kWh",
                batteryType: "Lithium Iron Phosphate",
                rangeElectric: "125 km",
                rangeHybrid: "1000+ km",
                features: [
                  "Dual Sliding Door",
                  "Captain Seat",
                  "12.8\" Control Screen",
                  "8.8\" Digital Cluster",
                  "360° Camera",
                  "Voice Command",
                  "ADAS",
                ],
              },
            },
          },
          {
            name: "Darion PHEV EX",
            price: 518_000_000,
            transmission: "Dedicated Hybrid Transmission",
            order: 4,
            specs: {
              create: {
                engine: "1.5L Hybrid (Atkinson Cycle)",
                transmission: "Hybrid",
                power: "145 kW (195 hp)",
                torque: "230 Nm",
                fuelType: "Hybrid",
                seats: 7,
                drivetrain: "FWD",
                dimLength: 4910, dimWidth: 1870, dimHeight: 1770, dimWheelbase: 2910,
                batteryCapacity: "20.5 kWh",
                batteryType: "Lithium Iron Phosphate",
                rangeElectric: "125 km",
                rangeHybrid: "1000+ km",
                features: [
                  "Electric Sunroof",
                  "Ventilated Seats",
                  "Electric 2nd Row Seat",
                  "Captain Seat",
                  "Dual Sliding Door",
                  "50W Wireless Charging",
                  "360° Camera",
                  "ADAS Level 2",
                ],
              },
            },
          },
        ],
      },
    },
  });
  console.log("  ✓ Darion (4 varian)");

  // ============================================================
  // 3. NEW AIR EV — slug: air-ev
  // ============================================================
  await prisma.car.create({
    data: {
      slug: "air-ev",
      name: "New Air ev",
      tagline: "Smart Urban EV",
      category: "Electric",
      thumbnail: "/images/cars/airev/airev-thumb.png",
      isNew: true,
      isElectric: true,
      highlights: {
        create: [
          { text: "Zero Emission",      order: 1 },
          { text: "Easy Home Charging", order: 2 },
          { text: "Compact City Car",   order: 3 },
          { text: "4-Seater",           order: 4 },
          { text: "Low Running Cost",   order: 5 },
        ],
      },
      images: {
        create: [
          { url: "/images/cars/airev/airev-ext-1.webp", alt: "Air ev Tampak Depan",   type: "exterior", order: 1 },
          { url: "/images/cars/airev/airev-ext-2.webp", alt: "Air ev Tampak Samping", type: "exterior", order: 2 },
          { url: "/images/cars/airev/airev-ext-3.webp", alt: "Air ev Tampak Samping", type: "exterior", order: 3 },
          { url: "/images/cars/airev/airev-int-1.webp", alt: "Air ev Dashboard",      type: "interior", order: 4 },
          { url: "/images/cars/airev/airev-int-2.webp", alt: "Air ev Kabin",          type: "interior", order: 5 },
          { url: "/images/cars/airev/airev-int-3.webp", alt: "Air ev Kabin",          type: "interior", order: 6 },
          { url: "/images/cars/airev/airev-int-4.webp", alt: "Air ev Kabin",          type: "interior", order: 7 },
        ],
      },
      variants: {
        create: [
          {
            name: "Air EV Lite 200",
            price: 220_700_000,
            transmission: "Single Speed",
            order: 1,
            specs: {
              create: {
                engine: "Motor Listrik",
                transmission: "Single Speed",
                power: "30 kW (41 hp)",
                torque: "110 Nm",
                fuelType: "Electric",
                seats: 4,
                drivetrain: "RWD",
                dimLength: 2974, dimWidth: 1505, dimHeight: 1631, dimWheelbase: 2010,
                batteryCapacity: "17.3 kWh",
                batteryType: "Lithium Iron Phosphate",
                rangeElectric: "200 km",
                chargingAc: "Home Charging",
                features: [
                  "Integrated Floating Widescreen",
                  "Smart Start System",
                  "Rear Parking Camera",
                  "Wuling Remote App",
                  "EPB & AVH",
                ],
              },
            },
          },
          {
            name: "Air EV Lite 300",
            price: 257_600_000,
            transmission: "Single Speed",
            order: 2,
            specs: {
              create: {
                engine: "Motor Listrik",
                transmission: "Single Speed",
                power: "30 kW (41 hp)",
                torque: "110 Nm",
                fuelType: "Electric",
                seats: 4,
                drivetrain: "RWD",
                dimLength: 2974, dimWidth: 1505, dimHeight: 1631, dimWheelbase: 2010,
                batteryCapacity: "26.7 kWh",
                batteryType: "Lithium Iron Phosphate",
                rangeElectric: "300 km",
                chargingAc: "Home Charging",
                features: [
                  "Integrated Floating Widescreen",
                  "Smart Start System",
                  "Rear Parking Camera",
                  "Wuling Remote App",
                  "EPB & AVH",
                ],
              },
            },
          },
          {
            name: "Air EV Pro 300",
            price: 314_800_000,
            transmission: "Single Speed",
            order: 3,
            specs: {
              create: {
                engine: "Motor Listrik",
                transmission: "Single Speed",
                power: "50 kW (68 hp)",
                torque: "150 Nm",
                fuelType: "Electric",
                seats: 4,
                drivetrain: "RWD",
                dimLength: 2974, dimWidth: 1505, dimHeight: 1631, dimWheelbase: 2010,
                batteryCapacity: "26.7 kWh",
                batteryType: "Lithium Iron Phosphate",
                rangeElectric: "300 km",
                chargingAc: "Home Charging",
                chargingDc: "Fast Charging",
                features: [
                  "Integrated Floating Widescreen",
                  "Smart Start System",
                  "Rear Parking Camera",
                  "Wuling Remote App",
                  "EPB, AVH & HHC",
                  "Fast Charging",
                  "Smartphone Connectivity",
                ],
              },
            },
          },
        ],
      },
    },
  });
  console.log("  ✓ New Air ev (3 varian)");

  // ============================================================
  // 4. NEW BINGUO EV — slug: binguo-ev
  // ============================================================
  await prisma.car.create({
    data: {
      slug: "binguo-ev",
      name: "New Binguo EV",
      tagline: "Next Gen Electric Hatchback",
      category: "Electric",
      thumbnail: "/images/cars/binguoev/binguoev-thumb.png",
      isNew: true,
      isElectric: true,
      highlights: {
        create: [
          { text: "Electric Hatchback",  order: 1 },
          { text: "333 km Range",         order: 2 },
          { text: "Spacious Cabin",       order: 3 },
          { text: "Dual 10.25\" Screen", order: 4 },
          { text: "Fast Charging DC",     order: 5 },
        ],
      },
      images: {
        create: [
          { url: "/images/cars/binguoev/binguoev-ext-1.webp", alt: "BinguoEV Tampak Depan",   type: "exterior", order: 1 },
          { url: "/images/cars/binguoev/binguoev-ext-2.webp", alt: "BinguoEV Tampak Samping", type: "exterior", order: 2 },
          { url: "/images/cars/binguoev/binguoev-ext-3.webp", alt: "BinguoEV Tampak Samping", type: "exterior", order: 3 },
          { url: "/images/cars/binguoev/binguoev-ext-4.webp", alt: "BinguoEV Tampak Samping", type: "exterior", order: 4 },
          { url: "/images/cars/binguoev/binguoev-int-1.webp", alt: "BinguoEV Dashboard",      type: "interior", order: 5 },
          { url: "/images/cars/binguoev/binguoev-int-2.webp", alt: "BinguoEV Kabin",          type: "interior", order: 6 },
          { url: "/images/cars/binguoev/binguoev-int-3.webp", alt: "BinguoEV Kabin",          type: "interior", order: 7 },
          { url: "/images/cars/binguoev/binguoev-int-4.webp", alt: "BinguoEV Kabin",          type: "interior", order: 8 },
        ],
      },
      variants: {
        create: [
          {
            name: "Binguo EV Lite",
            price: 324_200_000,
            transmission: "Single Speed",
            order: 1,
            specs: {
              create: {
                engine: "Motor Listrik",
                transmission: "Single Speed",
                power: "50 kW (68 hp)",
                torque: "150 Nm",
                fuelType: "Electric",
                seats: 4,
                drivetrain: "FWD",
                dimLength: 3950, dimWidth: 1708, dimHeight: 1580, dimWheelbase: 2560,
                batteryCapacity: "31.9 kWh",
                batteryType: "Lithium Ferro-Phosphate (IP67)",
                rangeElectric: "333 km",
                chargingAc: "±5.5 jam (20-100%)",
                features: [
                  "Dual 10.25\" Screen",
                  "Smartphone Interconnection",
                  "Rear Parking Sensor",
                  "Rear Camera",
                  "Keyless Entry & Smart Start",
                  "Electronic Parking Brake",
                  "790L Baggage Capacity",
                ],
              },
            },
          },
          {
            name: "Binguo EV Pro",
            price: 369_300_000,
            transmission: "Single Speed",
            order: 2,
            specs: {
              create: {
                engine: "Motor Listrik",
                transmission: "Single Speed",
                power: "50 kW (68 hp)",
                torque: "150 Nm",
                fuelType: "Electric",
                seats: 4,
                drivetrain: "FWD",
                dimLength: 3950, dimWidth: 1708, dimHeight: 1580, dimWheelbase: 2560,
                batteryCapacity: "31.9 kWh",
                batteryType: "Lithium Ferro-Phosphate (IP67)",
                rangeElectric: "333 km",
                chargingAc: "±5.5 jam (20-100%)",
                chargingDc: "±35 menit (30-80%)",
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
                  "Fast Charging DC",
                ],
              },
            },
          },
        ],
      },
    },
  });
  console.log("  ✓ New Binguo EV (2 varian)");

  // ============================================================
  // 5. NEW CLOUD EV — slug: cloud-ev
  // ============================================================
  await prisma.car.create({
    data: {
      slug: "cloud-ev",
      name: "New Cloud EV",
      tagline: "Home-like Comfort Electric Experience",
      category: "Electric",
      thumbnail: "/images/cars/cloudev/cloudev-thumb.png",
      isNew: true,
      isElectric: true,
      highlights: {
        create: [
          { text: "460 km Range",            order: 1 },
          { text: "Sofa Mode 135°",          order: 2 },
          { text: "Smart Electric Tailgate", order: 3 },
          { text: "15.6\" Control Screen",  order: 4 },
          { text: "ADAS",                    order: 5 },
        ],
      },
      images: {
        create: [
          { url: "/images/cars/cloudev/cloudev-ext-1.webp", alt: "Cloud EV Tampak Depan",   type: "exterior", order: 1 },
          { url: "/images/cars/cloudev/cloudev-ext-2.webp", alt: "Cloud EV Tampak Samping", type: "exterior", order: 2 },
          { url: "/images/cars/cloudev/cloudev-int-1.webp", alt: "Cloud EV Dashboard",      type: "interior", order: 3 },
          { url: "/images/cars/cloudev/cloudev-int-2.webp", alt: "Cloud EV Kabin",          type: "interior", order: 4 },
          { url: "/images/cars/cloudev/cloudev-int-3.webp", alt: "Cloud EV Kabin",          type: "interior", order: 5 },
          { url: "/images/cars/cloudev/cloudev-int-4.webp", alt: "Cloud EV Kabin",          type: "interior", order: 6 },
        ],
      },
      variants: {
        create: [
          {
            name: "Cloud EV Lite",
            price: 422_000_000,
            transmission: "Single Speed",
            order: 1,
            specs: {
              create: {
                engine: "Permanent Magnet Synchronous Motor",
                transmission: "Single Speed",
                power: "100 kW (134 hp)",
                torque: "200 Nm",
                fuelType: "Electric",
                seats: 5,
                drivetrain: "FWD",
                dimLength: 4295, dimWidth: 1850, dimHeight: 1652, dimWheelbase: 2700,
                batteryCapacity: "50.6 kWh",
                batteryType: "Lithium Ferro Phosphate (LFP)",
                rangeElectric: "460 km",
                chargingAc: "±7 jam (20-100%)",
                chargingDc: "±30 menit (30-80%)",
                features: [
                  "10.1\" TFT Display",
                  "Rear Camera",
                  "Keyless Entry & Smart Start",
                  "Digital AC",
                  "6 Speakers",
                  "Parking Assist",
                  "Flat-folding Rear Seats",
                  "Multi Information Display",
                ],
              },
            },
          },
          {
            name: "Cloud EV Pro",
            price: 450_700_000,
            transmission: "Single Speed",
            order: 2,
            specs: {
              create: {
                engine: "Permanent Magnet Synchronous Motor",
                transmission: "Single Speed",
                power: "100 kW (134 hp)",
                torque: "200 Nm",
                fuelType: "Electric",
                seats: 5,
                drivetrain: "FWD",
                dimLength: 4295, dimWidth: 1850, dimHeight: 1652, dimWheelbase: 2700,
                batteryCapacity: "50.6 kWh",
                batteryType: "Lithium Ferro Phosphate (LFP)",
                rangeElectric: "460 km",
                chargingAc: "±7 jam (20-100%)",
                chargingDc: "±30 menit (30-80%)",
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
                  "Wuling Remote App (IoV)",
                ],
              },
            },
          },
        ],
      },
    },
  });
  console.log("  ✓ New Cloud EV (2 varian)");

  // ============================================================
  // 6. NEW ALVEZ — slug: alvez
  // ============================================================
  await prisma.car.create({
    data: {
      slug: "alvez",
      name: "New Alvez",
      tagline: "Born Extraordinary",
      category: "SUV",
      thumbnail: "/images/cars/alvez/alvez-thumb.png",
      isNew: true,
      isElectric: false,
      highlights: {
        create: [
          { text: "Panoramic Sunroof", order: 1 },
          { text: "Wireless CarPlay",  order: 2 },
          { text: "ADAS",              order: 3 },
        ],
      },
      images: {
        create: [
          { url: "/images/cars/alvez/alvez-ext-1.webp", alt: "Alvez Tampak Depan",    type: "exterior", order: 1 },
          { url: "/images/cars/alvez/alvez-ext-2.webp", alt: "Alvez Tampak Samping",  type: "exterior", order: 2 },
          { url: "/images/cars/alvez/alvez-ext-3.webp", alt: "Alvez Tampak Belakang", type: "exterior", order: 3 },
          { url: "/images/cars/alvez/alvez-ext-4.webp", alt: "Alvez Tampak Belakang", type: "exterior", order: 4 },
          { url: "/images/cars/alvez/alvez-int-1.webp", alt: "Alvez Dashboard",       type: "interior", order: 5 },
          { url: "/images/cars/alvez/alvez-int-2.webp", alt: "Alvez Kursi Depan",     type: "interior", order: 6 },
          { url: "/images/cars/alvez/alvez-int-3.webp", alt: "Alvez Kursi Belakang",  type: "interior", order: 7 },
          { url: "/images/cars/alvez/alvez-int-4.webp", alt: "Alvez Kursi Belakang",  type: "interior", order: 8 },
        ],
      },
      variants: {
        create: [
          {
            name: "New Alvez CE MT",
            price: 232_900_000,
            transmission: "MT",
            order: 1,
            specs: {
              create: {
                engine: "1.5L",
                transmission: "CVT",
                power: "107 hp",
                torque: "145 Nm",
                fuelType: "Bensin",
                seats: 5,
                dimLength: 4385, dimWidth: 1810, dimHeight: 1650, dimWheelbase: 2600,
                features: [
                  "10.25\" Touchscreen",
                  "Kamera Belakang",
                  "Keyless Entry",
                  "TPMS",
                ],
              },
            },
          },
          {
            name: "New Alvez CE AT",
            price: 280_300_000,
            transmission: "AT",
            order: 2,
            specs: {
              create: {
                engine: "1.5L",
                transmission: "CVT",
                power: "107 hp",
                torque: "145 Nm",
                fuelType: "Bensin",
                seats: 5,
                dimLength: 4385, dimWidth: 1810, dimHeight: 1650, dimWheelbase: 2600,
                features: [
                  "10.25\" Touchscreen",
                  "Wireless CarPlay & Android Auto",
                  "Panoramic Sunroof",
                  "ADAS",
                  "Wireless Charging",
                  "Keyless Entry",
                ],
              },
            },
          },
          {
            name: "Alvez 1.5 CVT Lux+",
            price: 321_600_000,
            transmission: "AT",
            order: 3,
            specs: {
              create: {
                engine: "1.5L",
                transmission: "CVT",
                power: "107 hp",
                torque: "145 Nm",
                fuelType: "Bensin",
                seats: 5,
                dimLength: 4385, dimWidth: 1810, dimHeight: 1650, dimWheelbase: 2600,
                features: [
                  "10.25\" Touchscreen",
                  "Wireless CarPlay & Android Auto",
                  "Panoramic Sunroof",
                  "ADAS",
                  "Wireless Charging",
                  "360° Camera",
                  "Head-up Display",
                  "Keyless Entry",
                ],
              },
            },
          },
        ],
      },
    },
  });
  console.log("  ✓ New Alvez (3 varian)");

  // ============================================================
  // 7. CONFERO DB — slug: confero
  // ============================================================
  await prisma.car.create({
    data: {
      slug: "confero",
      name: "Confero DB",
      tagline: "Spacious Family MPV with Double Blower AC",
      category: "MPV",
      thumbnail: "/images/cars/confero/confero-thumb.png",
      isNew: false,
      isElectric: false,
      highlights: {
        create: [
          { text: "8-Seater MPV",         order: 1 },
          { text: "Double Blower AC",      order: 2 },
          { text: "Rear Wheel Drive",      order: 3 },
          { text: "Spacious Cabin",        order: 4 },
          { text: "Affordable Family Car", order: 5 },
        ],
      },
      images: {
        create: [
          { url: "/images/cars/confero/confero-ext-1.webp", alt: "Confero Tampak Depan",   type: "exterior", order: 1 },
          { url: "/images/cars/confero/confero-ext-2.webp", alt: "Confero Tampak Samping", type: "exterior", order: 2 },
          { url: "/images/cars/confero/confero-ext-3.webp", alt: "Confero Tampak Samping", type: "exterior", order: 3 },
          { url: "/images/cars/confero/confero-ext-4.webp", alt: "Confero Tampak Samping", type: "exterior", order: 4 },
          { url: "/images/cars/confero/confero-int-1.webp", alt: "Confero Dashboard",      type: "interior", order: 5 },
          { url: "/images/cars/confero/confero-int-2.webp", alt: "Confero Kabin Belakang", type: "interior", order: 6 },
          { url: "/images/cars/confero/confero-int-3.webp", alt: "Confero Kabin Belakang", type: "interior", order: 7 },
          { url: "/images/cars/confero/confero-int-4.webp", alt: "Confero Kabin Belakang", type: "interior", order: 8 },
        ],
      },
      variants: {
        create: [
          {
            name: "Confero DB",
            price: 207_500_000,
            transmission: "MT",
            order: 1,
            specs: {
              create: {
                engine: "1.5L DOHC 4-Cylinder",
                transmission: "Manual 5-Speed",
                power: "98 PS @ 5,800 rpm",
                torque: "135 Nm @ 3,800-4,200 rpm",
                fuelType: "Bensin",
                seats: 8,
                dimLength: 4493, dimWidth: 1691, dimHeight: 1715, dimWheelbase: 2720,
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
                  "Rear AC Vent",
                ],
              },
            },
          },
        ],
      },
    },
  });
  console.log("  ✓ Confero DB (1 varian)");

  // ============================================================
  // 8. MITRA EV — slug: mitra-ev
  // ============================================================
  await prisma.car.create({
    data: {
      slug: "mitra-ev",
      name: "Mitra EV",
      tagline: "Electric Commercial Vehicle for Business",
      category: "Electric",
      thumbnail: "/images/cars/mitraev/mitraev-thumb.png",
      isNew: true,
      isElectric: true,
      highlights: {
        create: [
          { text: "Electric Commercial Vehicle", order: 1 },
          { text: "Up to 400 km Range",          order: 2 },
          { text: "Fast Charging DC",             order: 3 },
          { text: "Dual Sliding Door",            order: 4 },
          { text: "Large Cargo Capacity",         order: 5 },
        ],
      },
      images: {
        create: [
          { url: "/images/cars/mitraev/mitraev-ext-1.webp", alt: "Mitra EV Tampak Depan",   type: "exterior", order: 1 },
          { url: "/images/cars/mitraev/mitraev-ext-2.webp", alt: "Mitra EV Tampak Samping", type: "exterior", order: 2 },
          { url: "/images/cars/mitraev/mitraev-int-1.webp", alt: "Mitra EV Kabin Kargo",    type: "interior", order: 3 },
          { url: "/images/cars/mitraev/mitraev-int-2.webp", alt: "Mitra EV Dashboard",      type: "interior", order: 4 },
        ],
      },
      variants: {
        create: [
          {
            name: "Mitra EV Blind Van Long Range",
            price: 337_000_000,
            transmission: "Single Speed",
            order: 1,
            specs: {
              create: {
                engine: "Permanent Magnet Synchronous Motor",
                transmission: "Single Speed",
                power: "75 kW",
                torque: "180 Nm",
                fuelType: "Electric",
                seats: 2,
                drivetrain: "RWD",
                dimLength: 5010, dimWidth: 1800, dimHeight: 1975, dimWheelbase: 3050,
                batteryCapacity: "41.9 kWh",
                batteryType: "Lithium Iron Phosphate",
                rangeElectric: "300 km",
                chargingDc: "±30 menit (30-80%)",
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
                  "AM/FM, USB, Bluetooth",
                ],
              },
            },
          },
          {
            name: "Mitra EV Blind Van Premium Range",
            price: 367_000_000,
            transmission: "Single Speed",
            order: 2,
            specs: {
              create: {
                engine: "Permanent Magnet Synchronous Motor",
                transmission: "Single Speed",
                power: "75 kW",
                torque: "180 Nm",
                fuelType: "Electric",
                seats: 2,
                drivetrain: "RWD",
                dimLength: 5010, dimWidth: 1800, dimHeight: 1975, dimWheelbase: 3050,
                batteryCapacity: "56.2 kWh",
                batteryType: "Lithium Iron Phosphate",
                rangeElectric: "400 km",
                chargingDc: "±30 menit (30-80%)",
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
                  "AM/FM, USB, Bluetooth",
                ],
              },
            },
          },
          {
            name: "Mitra EV Minibus Long Range",
            price: 357_000_000,
            transmission: "Single Speed",
            order: 3,
            specs: {
              create: {
                engine: "Permanent Magnet Synchronous Motor",
                transmission: "Single Speed",
                power: "75 kW",
                torque: "180 Nm",
                fuelType: "Electric",
                seats: 8,
                drivetrain: "RWD",
                dimLength: 5010, dimWidth: 1800, dimHeight: 1975, dimWheelbase: 3050,
                batteryCapacity: "41.9 kWh",
                batteryType: "Lithium Iron Phosphate",
                rangeElectric: "300 km",
                chargingDc: "±30 menit (30-80%)",
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
                  "USB & Bluetooth",
                ],
              },
            },
          },
          {
            name: "Mitra EV Minibus Premium Range",
            price: 387_500_000,
            transmission: "Single Speed",
            order: 4,
            specs: {
              create: {
                engine: "Permanent Magnet Synchronous Motor",
                transmission: "Single Speed",
                power: "75 kW",
                torque: "180 Nm",
                fuelType: "Electric",
                seats: 8,
                drivetrain: "RWD",
                dimLength: 5010, dimWidth: 1800, dimHeight: 1975, dimWheelbase: 3050,
                batteryCapacity: "56.2 kWh",
                batteryType: "Lithium Iron Phosphate",
                rangeElectric: "400 km",
                chargingDc: "±30 menit (30-80%)",
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
                  "USB & Bluetooth",
                ],
              },
            },
          },
        ],
      },
    },
  });
  console.log("  ✓ Mitra EV (4 varian)");

  // ============================================================
  // 9. FORMO MAX — slug: formo-max
  // ============================================================
  await prisma.car.create({
    data: {
      slug: "formo-max",
      name: "Formo Max",
      tagline: "Powerful Pick Up for Business Needs",
      category: "MPV",
      thumbnail: "/images/cars/formomax/formomax-thumb.png",
      isNew: false,
      isElectric: false,
      highlights: {
        create: [
          { text: "Bak Luas 2.7 Meter",   order: 1 },
          { text: "Mesin 1.5L 98 HP",      order: 2 },
          { text: "Kapasitas Angkut Besar", order: 3 },
          { text: "Rear Wheel Drive",       order: 4 },
          { text: "Tangguh untuk Usaha",    order: 5 },
        ],
      },
      images: {
        create: [
          { url: "/images/cars/formomax/formomax-ext-1.webp", alt: "Formo Max Tampak Depan",   type: "exterior", order: 1 },
          { url: "/images/cars/formomax/formomax-ext-2.webp", alt: "Formo Max Tampak Samping", type: "exterior", order: 2 },
          { url: "/images/cars/formomax/formomax-int-1.webp", alt: "Formo Max Dashboard",      type: "interior", order: 3 },
          { url: "/images/cars/formomax/formomax-int-2.webp", alt: "Formo Max Bak",            type: "interior", order: 4 },
          { url: "/images/cars/formomax/formomax-int-3.webp", alt: "Formo Max Bak",            type: "interior", order: 5 },
          { url: "/images/cars/formomax/formomax-int-4.webp", alt: "Formo Max Bak",            type: "interior", order: 6 },
        ],
      },
      variants: {
        create: [
          {
            name: "Formo Max Standard",
            price: 222_000_000,
            transmission: "MT",
            order: 1,
            specs: {
              create: {
                engine: "1.5L DOHC 4-Cylinder",
                transmission: "Manual 5-Speed",
                power: "98 hp @ 5,800 rpm",
                torque: "140 Nm @ 3,400-4,400 rpm",
                fuelType: "Bensin",
                seats: 2,
                dimLength: 5135, dimWidth: 1725, dimHeight: 1740, dimWheelbase: 3160,
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
                  "Power Window",
                ],
              },
            },
          },
          {
            name: "Formo Max AC",
            price: 230_000_000,
            transmission: "MT",
            order: 2,
            specs: {
              create: {
                engine: "1.5L DOHC 4-Cylinder",
                transmission: "Manual 5-Speed",
                power: "98 hp @ 5,800 rpm",
                torque: "140 Nm @ 3,400-4,400 rpm",
                fuelType: "Bensin",
                seats: 2,
                dimLength: 5135, dimWidth: 1725, dimHeight: 1740, dimWheelbase: 3160,
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
                  "Power Window",
                ],
              },
            },
          },
        ],
      },
    },
  });
  console.log("  ✓ Formo Max (2 varian)");

  // ============================================================
  // RINGKASAN
  // ============================================================
  const totalCars     = await prisma.car.count();
  const totalVariants = await prisma.carVariant.count();
  const totalImages   = await prisma.carImage.count();

  console.log("\n====================================");
  console.log("✅ Seeding selesai!");
  console.log(`   🚗 ${totalCars} mobil`);
  console.log(`   🔧 ${totalVariants} varian`);
  console.log(`   🖼️  ${totalImages} gambar`);
  console.log(`   🏪 1 dealer`);
  console.log("====================================\n");
}

main()
  .catch((e) => {
    console.error("\n❌ Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });