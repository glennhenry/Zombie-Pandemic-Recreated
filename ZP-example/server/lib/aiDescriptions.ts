import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "MISSING_API_KEY" });

// Generate a location description based on the location name and type
export async function generateLocationDescription(
  locationName: string,
  locationType: string
): Promise<string> {
  try {
    // Handle missing API key
    if (process.env.OPENAI_API_KEY === "MISSING_API_KEY") {
      return generateFallbackDescription(locationName, locationType);
    }

    const prompt = `
      Generate a short, atmospheric post-apocalyptic description of a location during a zombie outbreak.
      Location name: ${locationName}
      Location type: ${locationType}
      
      The description should be 2-3 sentences long, mentioning:
      - The general state of the area (damaged, abandoned, etc.)
      - One notable feature or object
      - A subtle hint about potential danger or resources
      
      Response format: Just the plain text description without quotes.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    const description = response.choices[0].message.content?.trim() || generateFallbackDescription(locationName, locationType);
    return description;
  } catch (error) {
    console.error("Error generating location description:", error);
    return generateFallbackDescription(locationName, locationType);
  }
}

// Generate a zombie encounter description
export async function generateZombieDescription(
  zombieType: string = "standard"
): Promise<string> {
  try {
    // Handle missing API key
    if (process.env.OPENAI_API_KEY === "MISSING_API_KEY") {
      return generateFallbackZombieDescription(zombieType);
    }

    const prompt = `
      Generate a brief, tense description of a zombie encounter in a post-apocalyptic setting.
      Zombie type: ${zombieType}
      
      The description should be 1-2 sentences long, mentioning:
      - The zombie's appearance
      - Its behavior or movement
      - The immediate threat it poses
      
      Response format: Just the plain text description without quotes.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
      temperature: 0.7,
    });

    const description = response.choices[0].message.content?.trim() || generateFallbackZombieDescription(zombieType);
    return description;
  } catch (error) {
    console.error("Error generating zombie description:", error);
    return generateFallbackZombieDescription(zombieType);
  }
}

// Generate a loot discovery description
export async function generateLootDescription(
  itemName: string,
  buildingType: string = "building"
): Promise<string> {
  try {
    // Handle missing API key
    if (process.env.OPENAI_API_KEY === "MISSING_API_KEY") {
      return generateFallbackLootDescription(itemName, buildingType);
    }

    const prompt = `
      Generate a brief description of finding an item in a post-apocalyptic setting during a zombie outbreak.
      Item found: ${itemName}
      Location type: ${buildingType}
      
      The description should be 1-2 sentences long, mentioning:
      - Where specifically the item was found
      - The condition of the item
      - A small detail that adds atmosphere
      
      Response format: Just the plain text description without quotes.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
      temperature: 0.7,
    });

    const description = response.choices[0].message.content?.trim() || generateFallbackLootDescription(itemName, buildingType);
    return description;
  } catch (error) {
    console.error("Error generating loot description:", error);
    return generateFallbackLootDescription(itemName, buildingType);
  }
}

// Fallback descriptions when OpenAI API is not available
function generateFallbackDescription(locationName: string, locationType: string): string {
  const descriptions = [
    `The ${locationName} stands abandoned, windows broken and walls covered in graffiti. Debris litters the ground, and the eerie silence is occasionally broken by distant moans.`,
    `Once bustling, the ${locationName} is now a shell of its former self. Overturned furniture and scattered papers tell the story of a hasty evacuation. The back area might still hold useful supplies.`,
    `The ${locationType} has been partially barricaded, suggesting previous survivors took shelter here. Blood stains on the floor lead to a closed door, but a first aid cabinet on the wall might be worth checking.`,
    `This ${locationType} has been heavily looted, but the upper floors appear untouched. A flickering light from the second floor suggests someone might have been here recently.`,
    `Rain leaks through the damaged roof of the ${locationName}, forming puddles on the floor. The smell of mold and decay fills the air, but a partially open storage closet catches your eye.`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function generateFallbackZombieDescription(zombieType: string): string {
  const descriptions = [
    "A shambling zombie with torn clothes has spotted you. It growls hungrily and moves in your direction.",
    "A zombie in a tattered business suit lurches from behind a car. Its cloudy eyes fix on you as it begins to approach.",
    "A decayed zombie with exposed bones crawls out from under debris. It sniffs the air and suddenly turns toward you.",
    "A freshly-turned zombie in a security uniform stands motionless until it hears your footsteps, then spins around with surprising speed.",
    "A bloated zombie drags itself forward, leaving a trail of dark fluid. It raises its head at your presence and lets out a guttural moan."
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function generateFallbackLootDescription(itemName: string, buildingType: string): string {
  const locations = [
    "behind the counter",
    "in a desk drawer",
    "on a dusty shelf",
    "inside a cabinet",
    "under some debris",
    "in a backpack",
    "inside a locker",
    "beneath a fallen shelf"
  ];
  
  const conditions = [
    "in good condition",
    "slightly damaged but usable",
    "dusty but intact",
    "well-preserved",
    "with minor scratches"
  ];
  
  const location = locations[Math.floor(Math.random() * locations.length)];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return `You found ${itemName} ${location} of the ${buildingType}, ${condition}. This could prove useful in your survival.`;
}
