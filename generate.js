const fs = require("fs");
const path = require("path");

const emotions = [
  { id: "happy", label: "快樂" },
  { id: "sad", label: "悲傷" },
  { id: "angry", label: "生氣" },
  { id: "surprised", label: "驚訝" },
  { id: "sleepy", label: "愛睏" },
  { id: "inlove", label: "戀愛" },
  { id: "playful", label: "調皮" },
  { id: "cool", label: "耍酷" },
  { id: "fearful", label: "恐懼" },
  { id: "thinking", label: "思考" },
  { id: "laughing", label: "大笑" },
  { id: "crying", label: "痛哭" },
  { id: "frustrated", label: "沮喪" },
  { id: "anxious", label: "焦慮" },
  { id: "shocked", label: "震驚" },
  { id: "hugging", label: "擁抱" },
  { id: "devilish", label: "搗蛋" },
  { id: "angelic", label: "天使" },
  { id: "pleading", label: "哀求" },
  { id: "neutral", label: "面癱" },
];

function svg(id, label, eyes, mouth, extras = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" rx="20" fill="#fdf6e3"/>
  <circle cx="100" cy="100" r="80" fill="#ffd54f" stroke="#f9a825" stroke-width="2"/>
  ${eyes}
  ${mouth}
  ${extras}
  <text x="100" y="190" text-anchor="middle" font-size="10" fill="#666" font-family="sans-serif">${label}</text>
</svg>`;
}

const faces = {
  happy: svg("happy", "快樂",
    `<circle cx="70" cy="80" r="8" fill="#333"/><circle cx="130" cy="80" r="8" fill="#333"/><circle cx="70" cy="76" r="3" fill="#fff"/><circle cx="130" cy="76" r="3" fill="#fff"/>`,
    `<path d="M60 125 Q100 160 140 125" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round"/>`
  ),
  sad: svg("sad", "悲傷",
    `<circle cx="70" cy="85" r="8" fill="#333"/><circle cx="130" cy="85" r="8" fill="#333"/><circle cx="70" cy="81" r="3" fill="#fff"/><circle cx="130" cy="81" r="3" fill="#fff"/>`,
    `<path d="M140 130 Q100 105 60 130" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round"/>`,
    `<circle cx="55" cy="70" r="4" fill="#64b5f6" opacity="0.6"/><circle cx="62" cy="65" r="3" fill="#64b5f6" opacity="0.6"/>`
  ),
  angry: svg("angry", "生氣",
    `<line x1="55" y1="62" x2="78" y2="78" stroke="#333" stroke-width="4" stroke-linecap="round"/><line x1="145" y1="62" x2="122" y2="78" stroke="#333" stroke-width="4" stroke-linecap="round"/><circle cx="70" cy="85" r="8" fill="#333"/><circle cx="130" cy="85" r="8" fill="#333"/><circle cx="68" cy="82" r="3" fill="#fff"/><circle cx="128" cy="82" r="3" fill="#fff"/>`,
    `<path d="M65 130 L135 130" stroke="#333" stroke-width="4" stroke-linecap="round"/>`
  ),
  surprised: svg("surprised", "驚訝",
    `<circle cx="70" cy="75" r="10" fill="#333"/><circle cx="130" cy="75" r="10" fill="#333"/><circle cx="68" cy="72" r="3" fill="#fff"/><circle cx="128" cy="72" r="3" fill="#fff"/>`,
    `<ellipse cx="100" cy="130" rx="12" ry="15" fill="#333"/><ellipse cx="100" cy="128" rx="4" ry="5" fill="#e57373"/>`
  ),
  sleepy: svg("sleepy", "愛睏",
    `<path d="M58 80 Q70 70 82 80" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/><path d="M118 80 Q130 70 142 80" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>`,
    `<ellipse cx="100" cy="125" rx="20" ry="8" fill="#333"/><ellipse cx="100" cy="125" rx="15" ry="5" fill="#e57373"/>`,
    `<text x="65" y="60" font-size="16" fill="#333">z</text><text x="80" y="50" font-size="12" fill="#999">z</text><text x="90" y="42" font-size="8" fill="#ccc">z</text>`
  ),
  inlove: svg("inlove", "戀愛",
    `<path d="M60 80 Q70 65 80 80 Q90 65 100 80" fill="#e57373" stroke="none"/><path d="M100 80 Q110 65 120 80 Q130 65 140 80" fill="#e57373" stroke="none"/>`,
    `<path d="M70 125 Q100 155 130 125" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>`,
    `<circle cx="40" cy="50" r="6" fill="#ef9a9a" opacity="0.5"/><circle cx="160" cy="45" r="4" fill="#ef9a9a" opacity="0.5"/><circle cx="45" cy="40" r="3" fill="#ef9a9a" opacity="0.3"/>`
  ),
  playful: svg("playful", "調皮",
    `<circle cx="70" cy="80" r="8" fill="#333"/><circle cx="130" cy="80" r="8" fill="#333"/><circle cx="68" cy="76" r="3" fill="#fff"/><circle cx="128" cy="76" r="3" fill="#fff"/>`,
    `<path d="M80 125 Q100 155 120 125" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>`,
    `<ellipse cx="100" cy="135" rx="10" ry="6" fill="#e57373"/>`
  ),
  cool: svg("cool", "耍酷",
    `<rect x="50" y="65" width="45" height="22" rx="3" fill="#333"/><rect x="105" y="65" width="45" height="22" rx="3" fill="#333"/><line x1="72" y1="65" x2="67" y2="55" stroke="#333" stroke-width="2"/><line x1="128" y1="65" x2="133" y2="55" stroke="#333" stroke-width="2"/>`,
    `<path d="M70 125 L130 125" stroke="#333" stroke-width="3" stroke-linecap="round"/>`
  ),
  fearful: svg("fearful", "恐懼",
    `<circle cx="65" cy="70" r="12" fill="#333"/><circle cx="135" cy="70" r="12" fill="#333"/><circle cx="62" cy="66" r="3" fill="#fff"/><circle cx="132" cy="66" r="3" fill="#fff"/><line x1="55" y1="82" x2="75" y2="78" stroke="#333" stroke-width="1.5"/><line x1="145" y1="82" x2="125" y2="78" stroke="#333" stroke-width="1.5"/>`,
    `<ellipse cx="100" cy="130" rx="10" ry="6" fill="#333"/><path d="M85 135 Q100 145 115 135" fill="none" stroke="#333" stroke-width="2"/>`
  ),
  thinking: svg("thinking", "思考",
    `<circle cx="70" cy="80" r="8" fill="#333"/><circle cx="130" cy="80" r="8" fill="#333"/><circle cx="68" cy="76" r="3" fill="#fff"/><circle cx="128" cy="76" r="3" fill="#fff"/><line x1="130" y1="80" x2="145" y2="75" stroke="#333" stroke-width="2"/>`,
    `<path d="M75 128 Q100 135 125 128" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>`,
    `<circle cx="160" cy="60" r="12" fill="#e0e0e0"/><text x="160" y="64" text-anchor="middle" font-size="14" fill="#333">?</text>`
  ),
  laughing: svg("laughing", "大笑",
    `<path d="M58 75 Q70 60 82 75" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/><path d="M118 75 Q130 60 142 75" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>`,
    `<ellipse cx="100" cy="125" rx="25" ry="18" fill="#333"/><ellipse cx="100" cy="125" rx="18" ry="13" fill="#e57373"/><path d="M85 115 Q100 110 115 115" fill="none" stroke="#fff" stroke-width="1.5"/>`,
    `<circle cx="45" cy="70" r="3" fill="#ffd54f" opacity="0.8"/><circle cx="155" cy="65" r="2" fill="#ffd54f" opacity="0.8"/>`
  ),
  crying: svg("crying", "痛哭",
    `<circle cx="70" cy="80" r="8" fill="#333"/><circle cx="130" cy="80" r="8" fill="#333"/><circle cx="68" cy="76" r="3" fill="#fff"/><circle cx="128" cy="76" r="3" fill="#fff"/>`,
    `<path d="M140 125 Q100 110 60 125" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round"/>`,
    `<circle cx="50" cy="75" r="5" fill="#64b5f6" opacity="0.7"/><circle cx="45" cy="85" r="4" fill="#64b5f6" opacity="0.5"/><circle cx="150" cy="70" r="5" fill="#64b5f6" opacity="0.7"/><circle cx="155" cy="80" r="4" fill="#64b5f6" opacity="0.5"/><path d="M55 82 Q50 90 55 95" fill="none" stroke="#64b5f6" stroke-width="2" opacity="0.5"/><path d="M145 77 Q140 85 145 90" fill="none" stroke="#64b5f6" stroke-width="2" opacity="0.5"/>`
  ),
  frustrated: svg("frustrated", "沮喪",
    `<line x1="55" y1="65" x2="78" y2="78" stroke="#333" stroke-width="3" stroke-linecap="round"/><line x1="145" y1="65" x2="122" y2="78" stroke="#333" stroke-width="3" stroke-linecap="round"/><circle cx="70" cy="85" r="7" fill="#333"/><circle cx="130" cy="85" r="7" fill="#333"/>`,
    `<path d="M70 130 Q100 120 130 130" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>`
  ),
  anxious: svg("anxious", "焦慮",
    `<circle cx="70" cy="80" r="7" fill="#333"/><circle cx="130" cy="80" r="7" fill="#333"/><circle cx="68" cy="77" r="2.5" fill="#fff"/><circle cx="128" cy="77" r="2.5" fill="#fff"/><circle cx="70" cy="80" r="9" fill="none" stroke="#333" stroke-width="1" stroke-dasharray="2,2"/><circle cx="130" cy="80" r="9" fill="none" stroke="#333" stroke-width="1" stroke-dasharray="2,2"/>`,
    `<path d="M65 125 Q80 135 100 125 Q120 115 135 125" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>`,
    `<path d="M40 50 Q50 40 60 50" fill="none" stroke="#e57373" stroke-width="2"/><path d="M140 45 Q150 35 160 45" fill="none" stroke="#e57373" stroke-width="2"/>`
  ),
  shocked: svg("shocked", "震驚",
    `<circle cx="65" cy="70" r="12" fill="#fff" stroke="#333" stroke-width="2"/><circle cx="135" cy="70" r="12" fill="#fff" stroke="#333" stroke-width="2"/><circle cx="65" cy="70" r="5" fill="#333"/><circle cx="135" cy="70" r="5" fill="#333"/>`,
    `<ellipse cx="100" cy="135" rx="10" ry="15" fill="#333"/><ellipse cx="100" cy="135" rx="5" ry="8" fill="#e57373"/>`,
    `<line x1="50" y1="85" x2="55" y2="80" stroke="#333" stroke-width="2"/><line x1="150" y1="85" x2="145" y2="80" stroke="#333" stroke-width="2"/>`
  ),
  hugging: svg("hugging", "擁抱",
    `<circle cx="70" cy="80" r="8" fill="#333"/><circle cx="130" cy="80" r="8" fill="#333"/><circle cx="68" cy="76" r="3" fill="#fff"/><circle cx="128" cy="76" r="3" fill="#fff"/>`,
    `<path d="M70 125 Q100 150 130 125" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>`,
    `<path d="M30 100 Q35 70 50 60" fill="none" stroke="#f9a825" stroke-width="4" stroke-linecap="round"/><path d="M170 100 Q165 70 150 60" fill="none" stroke="#f9a825" stroke-width="4" stroke-linecap="round"/><path d="M30 100 Q25 110 30 120" fill="none" stroke="#f9a825" stroke-width="4" stroke-linecap="round"/><path d="M170 100 Q175 110 170 120" fill="none" stroke="#f9a825" stroke-width="4" stroke-linecap="round"/>`
  ),
  devilish: svg("devilish", "搗蛋",
    `<path d="M55 45 L65 70 L75 45" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/><path d="M125 45 L135 70 L145 45" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="80" r="7" fill="#e53935"/><circle cx="130" cy="80" r="7" fill="#e53935"/><circle cx="68" cy="77" r="2.5" fill="#fff"/><circle cx="128" cy="77" r="2.5" fill="#fff"/>`,
    `<path d="M70 125 Q100 140 130 125" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>`,
    `<path d="M95 115 L100 130 L105 115" fill="#333"/>`
  ),
  angelic: svg("angelic", "天使",
    `<circle cx="70" cy="80" r="7" fill="#333"/><circle cx="130" cy="80" r="7" fill="#333"/><circle cx="68" cy="76" r="3" fill="#fff"/><circle cx="128" cy="76" r="3" fill="#fff"/>`,
    `<path d="M65 125 Q100 150 135 125" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>`,
    `<ellipse cx="100" cy="40" rx="20" ry="8" fill="none" stroke="#ffd54f" stroke-width="2.5"/><ellipse cx="85" cy="42" rx="12" ry="6" fill="none" stroke="#ffd54f" stroke-width="2.5"/><ellipse cx="115" cy="42" rx="12" ry="6" fill="none" stroke="#ffd54f" stroke-width="2.5"/>`
  ),
  pleading: svg("pleading", "哀求",
    `<circle cx="65" cy="75" r="10" fill="#333"/><circle cx="135" cy="75" r="10" fill="#333"/><circle cx="62" cy="71" r="4" fill="#fff"/><circle cx="132" cy="71" r="4" fill="#fff"/><circle cx="58" cy="68" r="2" fill="#fff"/><circle cx="128" cy="68" r="2" fill="#fff"/>`,
    `<path d="M70 125 Q100 140 130 125" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>`
  ),
  neutral: svg("neutral", "面癱",
    `<circle cx="70" cy="80" r="7" fill="#333"/><circle cx="130" cy="80" r="7" fill="#333"/><circle cx="68" cy="77" r="2.5" fill="#fff"/><circle cx="128" cy="77" r="2.5" fill="#fff"/>`,
    `<line x1="70" y1="125" x2="130" y2="125" stroke="#333" stroke-width="3" stroke-linecap="round"/>`
  ),
};

Object.entries(faces).forEach(([id, svgContent]) => {
  fs.writeFileSync(path.join(__dirname, `${id}.svg`), svgContent.trim() + "\n");
});

const readme = `# Emoji Collection 🎭

20 種不同情緒的表情圖案（SVG 格式）。

| # | 情緒 | 檔案 |
|---|------|------|
${emotions.map((e, i) => `| ${String(i + 1).padStart(2, "0")} | ${e.label} | \`${e.id}.svg\` |`).join("\n")}

## 情緒列表

${emotions.map(e => `- ![${e.label}](${e.id}.svg) **${e.label}** (\`${e.id}.svg\`)`).join("\n")}
`;

fs.writeFileSync(path.join(__dirname, "README.md"), readme);
console.log(`✅ Generated ${Object.keys(faces).length} emoji SVGs + README.md`);
