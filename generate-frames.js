const fs = require('fs');
const path = require('path');

// Using mock frames without canvas to save complexity, we will just copy a single image or draw simple svgs.
// Actually, it's simpler to just make basic SVGs and save them as jpgs or similiar, or just use HTML5 canvas in browser?
// Wait, the easiest way to generate 240 distinct images without extra dependencies is to write SVG strings and save them.

const outDir = path.join(__dirname, 'public', 'sequence');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const bgColor = '#0f0c09'; // Dark coffee background

// Generate 240 simple SVG frames and save as SVG (we can configure Next.js to use them, or just use them as .jpg with an SVG inside if browser supports it... no wait, the prompt asks for ezgif-frame-[i].jpg).
// Let's generate base64 encoded JPEGs or just raw SVGs named .jpg (browsers might reject this if strict).
// Real solution: let's write a simple HTML file that generates and downloads them, OR
// just use a small node script with `canvas` library. Let me provide a dummy image generator.

// Since I cannot easily install node-canvas here without python/build-tools sometimes on Windows,
// I'll create a simple 1x1 pixel JPEG hex string, but let's make it a valid SVG saved as .svg and update the code to load .svg.
// No, prompt says: "Naming convention: ezgif-frame-[i].jpg". 
// Let's just create 240 copies of a single placeholder JPEG for now, or maybe just 240 tiny distinct JPEGs?
// A valid 1x1 black JPG hex:
const emptyJpgHex = "ffd8ffe000104a46494600010101004800480000ffdb004300080606070605080707070909080a0c140d0c0b0b0c1912130f141d1a1f1e1d1a1c1c20242e2720222c231c1c2837292c30313434341f27393d38323c2e333430ffdb0043010909090c0b0c180d0d1830201c203030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030ffc00011080001000103012200021101031101ffc4001f0000010501010101010100000000000000000102030405060708090a0bffc400b5100002010303020403050504040000017d01020300041105122131410613516107227114328191a1082342b1c11552d1f02433627282090a161718191a25262728292a3435363738393a434445464748494a535455565758595a636465666768696a737475767778797a838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae1e2e3e4e5e6e7e8e9eaf1f2f3f4f5f6f7f8f9faffc4001f0100030101010101010101010000000000000102030405060708090a0bffc400b51100020102040403040705040400010277000102031104052131061241510761711322328108144291a1b1c109233352f0156272d10a162434e125f11718191a262728292a35363738393a434445464748494a535455565758595a636465666768696a737475767778797a82838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae2e3e4e5e6e7e8e9eaf2f3f4f5f6f7f8f9faffda000c03010002110311003f00fddcdd";

const jpgBuffer = Buffer.from(emptyJpgHex, 'hex');

for (let i = 1; i <= 240; i++) {
  const numStr = i.toString().padStart(3, '0');
  const filename = `ezgif-frame-${numStr}.jpg`;
  fs.writeFileSync(path.join(outDir, filename), jpgBuffer);
}

console.log('Generated 240 mock frames.');
