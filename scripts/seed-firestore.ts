const admin = require('firebase-admin');

// Note: In a real environment, you would use a service account key JSON
// For this environment, we assume the environment is pre-authenticated or uses local emulator
// But for the script to be complete, we'll provide the structure.
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  });
}

const db = admin.firestore();

const facilities = [
  { name: "Burgers & Dogs", type: "Concession", waitTime: 2, status: "green", iconType: "utensils", location: "Section 102" },
  { name: "Stadium Brews", type: "Concession", waitTime: 12, status: "yellow", iconType: "beer", location: "Section 104" },
  { name: "North Restroom", type: "Facility", waitTime: 15, status: "red", iconType: "ticket", location: "Section 101" },
  { name: "South Restroom", type: "Facility", waitTime: 4, status: "green", iconType: "ticket", location: "Section 106" },
  { name: "West Merch Stand", type: "Merch", waitTime: 1, status: "green", iconType: "utensils", location: "Section 108" },
];

const incentives = [
  { 
    title: "Beat the Gate 4 Rush!", 
    description: "Gate 4 is experiencing high volume. Exit via Gate 7 (West) instead and get a voucher for a free official match scarf!",
    reward: "Match Scarf", 
    targetGate: "Gate 7",
    active: true,
    probabilityWeight: 0.2 // Only 20% of users see this to balance flow
  },
  { 
    title: "Fast Beer Alert!", 
    description: "Section 108 Brews has zero wait. Head there now for 10% off your order.",
    reward: "10% Discount", 
    targetGate: "Section 108",
    active: true,
    probabilityWeight: 0.5
  }
];

async function seed() {
  console.log('Seeding facilities...');
  const facCol = db.collection('facilities');
  for (const f of facilities) {
    await facCol.add(f);
  }

  console.log('Seeding incentives...');
  const incCol = db.collection('incentives');
  for (const i of incentives) {
    await incCol.add(i);
  }
  
  console.log('Seed complete! ✅');
}

seed().catch(console.error);
