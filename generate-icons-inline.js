const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'src', 'assets', 'icons');
const outputFile = path.join(__dirname, 'src', 'app', 'dumb-components', 'icon', 'icon-cases.ts');

function ensureFillCurrentColor(svg) {
  return svg.replace(
    /<svg([^>]*?)>/,
    (match, attrs) => {
      if (/fill=/.test(attrs)) return match;
      return `<svg${attrs} fill="currentColor">`;
    }
  );
}

const iconFiles = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg'));

const iconCases = iconFiles.map(filename => {
  const iconName = filename.replace('.svg', '');
  let svgContent = fs.readFileSync(path.join(iconsDir, filename), 'utf8')
    .replace(/\r?\n|\r/g, ' ') // Remove quebras de linha
    .replace(/\s{2,}/g, ' ')   // Remove espaços duplicados
    .trim();

  svgContent = ensureFillCurrentColor(svgContent);
  // Adiciona [attr.class]="svgClass()" se não existir
  if (!svgContent.includes('[attr.class]')) {
    svgContent = svgContent.replace('<svg', '<svg [attr.class]="svgClass()"');
  }

  return `      @case ('${iconName}'){
        ${svgContent}
      }`;
}).join('\n');

const fileContent = `// AUTO-GERADO por generate-icons-inline.js
// Copie e cole este conteúdo no template do IconComponent

@switch (name()) {
${iconCases}
}`;

fs.writeFileSync(outputFile, fileContent, 'utf8');
console.log(`Arquivo gerado: ${outputFile}`);
