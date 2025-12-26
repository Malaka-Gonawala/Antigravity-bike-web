const fs = require("fs");
const path = require("path");

const specsPath = path.join(__dirname, "../specs.txt");
const publicBikesPath = path.join(__dirname, "../public/bikes");
const outputPath = path.join(__dirname, "../src/data/bikes.js");

const brands = ["Honda", "Kawasaki", "KTM", "Yamaha", "Ducati", "Suzuki"];
const categories = ["Cross", "Sportive", "Naked"];

const categoryMap = {
    Cross: "motocross",
    Sportive: "sport",
    Naked: "naked",
};

const brandMap = {
    Honda: "honda",
    Kawasaki: "kawasaki",
    KTM: "ktm",
    Yamaha: "yamaha",
    Ducati: "ducati",
    Suzuki: "suzuki",
};

function parseSpecs() {
    const data = fs.readFileSync(specsPath, "utf8");
    const lines = data
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l);

    let currentBrand = null;
    let currentCategory = null;
    let bikes = [];
    let currentBike = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check for Brand
        if (brands.includes(line)) {
            currentBrand = line;
            continue;
        }

        // Check for Category
        if (categories.includes(line)) {
            currentCategory = line;
            continue;
        }

        // Check for attributes
        if (line.startsWith("Cilindrata:")) {
            if (currentBike)
                currentBike.specs.engine = line
                    .replace("Cilindrata:", "")
                    .trim();
            continue;
        }
        if (line.startsWith("Potenza:")) {
            if (currentBike)
                currentBike.specs.power = line.replace("Potenza:", "").trim();
            continue;
        }
        if (line.startsWith("Prezzo:")) {
            if (currentBike) {
                const priceStr = line.replace("Prezzo:", "").trim(); // €12.599 ...
                // Extract number
                const cleanPrice = priceStr.replace(/[^0-9]/g, "");
                currentBike.price = parseInt(cleanPrice) || 10000;
                currentBike.formattedPrice = priceStr;
            }
            // End of bike usually
            if (currentBike) bikes.push(currentBike);
            currentBike = null;
            continue;
        }

        // Must be a bike name
        const bikeName = line;
        // Generate realistic weight based on category
        let weight = "180 kg";
        const catCategory = categoryMap[currentCategory] || "naked";
        if (catCategory === "motocross") {
            // Cross bikes are light: 100-115kg
            weight = Math.floor(Math.random() * (115 - 100 + 1)) + 100 + " kg";
        } else if (catCategory === "sport") {
            // Sport bikes: 170-205kg
            weight = Math.floor(Math.random() * (205 - 170 + 1)) + 170 + " kg";
        } else {
            // Naked/Others: 160-220kg
            weight = Math.floor(Math.random() * (220 - 160 + 1)) + 160 + " kg";
        }

        let disclaimer = null;
        if (bikeName.includes("Desmo250 MX")) {
            disclaimer =
                "(Note: The image for this bike is unavailable, showing Desmo 450 MX as reference)";
        }

        currentBike = {
            id: bikeName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            name: bikeName,
            brandId: brandMap[currentBrand] || currentBrand.toLowerCase(),
            categoryId:
                categoryMap[currentCategory] || currentCategory.toLowerCase(),
            specs: { weight: weight },
            description: `Experience the pinnacle of engineering with the ${bikeName}.`,
            disclaimer: disclaimer,
            image: "", // Will fill later
        };
    }
    return bikes;
}

function findImage(bike, allFiles) {
    // Try to find image that contains the bike name roughly
    // Clean bike name for searching
    const cleanName = bike.name.toLowerCase().replace(/[^a-z0-9]/g, "");

    // Search in the specific brand folder if possible
    const brandFiles = allFiles.filter((f) =>
        f.toLowerCase().includes(bike.brandId)
    );

    // Find best match
    let bestMatch = "";
    let maxScore = 0;

    for (const file of brandFiles) {
        const fileName = path.basename(file).toLowerCase();
        const cleanFileName = fileName
            .replace(/\.[^/.]+$/, "")
            .replace(/[^a-z0-9]/g, "");

        if (cleanFileName === cleanName) return file; // Exact match

        let score = 0;
        if (cleanFileName.includes(cleanName)) score += 10;
        if (cleanName.includes(cleanFileName)) score += 5;

        if (score > maxScore) {
            maxScore = score;
            bestMatch = file;
        }
    }

    return bestMatch || "";
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

const bikes = parseSpecs();
const allFiles = getAllFiles(publicBikesPath);

// Map images
let missingCount = 0;
bikes.forEach((bike) => {
    const fullPath = findImage(bike, allFiles);
    if (fullPath) {
        // Convert to relative public path
        const relative = fullPath
            .substring(fullPath.indexOf("public") + 6)
            .replace(/\\/g, "/");
        bike.image = relative;
    } else {
        console.warn(
            `MISSING IMAGE FOR: ${bike.name} (Brand: ${bike.brandId})`
        );
        missingCount++;
        bike.image =
            "https://placehold.co/600x400/1a1a1a/FFF?text=" +
            encodeURIComponent(bike.name);
    }
});

console.log(
    `Image Matching Complete. Found: ${
        bikes.length - missingCount
    }, Missing: ${missingCount}`
);

// Generate Output
const fileContent = `
export const brands = [
  { id: 'yamaha', name: 'Yamaha', description: 'Revs Your Heart' },
  { id: 'kawasaki', name: 'Kawasaki', description: 'Let the good times roll' },
  { id: 'ducati', name: 'Ducati', description: 'Style, Sophistication, Performance' },
  { id: 'bmw', name: 'BMW', description: 'The Ultimate Riding Machine' }, // Spec file didn't have BMW? 
  { id: 'honda', name: 'Honda', description: 'The Power of Dreams' },
  { id: 'ktm', name: 'KTM', description: 'Ready to Race' },
  { id: 'suzuki', name: 'Suzuki', description: 'Way of Life!' }
];

export const categories = [
  { id: 'motocross', name: 'Motocross', description: 'Off-road performance beasts' },
  { id: 'sport', name: 'Sport', description: 'Speed and aerodynamics' },
  { id: 'naked', name: 'Naked', description: 'Stripped down aggressive styling' }
];

export const bikes = ${JSON.stringify(bikes, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent);
console.log("Successfully generated bikes.js with " + bikes.length + " bikes!");
