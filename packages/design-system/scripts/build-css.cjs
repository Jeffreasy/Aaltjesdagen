const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

async function buildCSS() {
    console.log('🎨 Building CSS bundles...');

    // Ensure dist directory exists
    if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist', { recursive: true });
    }

    // Read source files
    const theme = fs.readFileSync('src/styles/theme.css', 'utf8');
    const animations = fs.readFileSync('src/styles/animations.css', 'utf8');
    const main = fs.readFileSync('src/styles/main.css', 'utf8');

    // Process with PostCSS
    const processor = postcss([
        autoprefixer(),
        cssnano({
            preset: ['default', {
                discardComments: { removeAll: true },
                normalizeWhitespace: true,
            }]
        })
    ]);

    // Bundle: base.css (theme + animations, no Tailwind)
    console.log('  → Building base.css (theme + animations)...');
    const baseCSS = `${theme}\n${animations}`;
    const baseResult = await processor.process(baseCSS, { from: undefined });
    fs.writeFileSync('dist/base.css', baseResult.css);

    // Copy individual files (minified)
    console.log('  → Building theme.css...');
    const themeResult = await processor.process(theme, { from: undefined });
    fs.writeFileSync('dist/theme.css', themeResult.css);

    console.log('  → Building animations.css...');
    const animResult = await processor.process(animations, { from: undefined });
    fs.writeFileSync('dist/animations.css', animResult.css);

    // Full bundle (everything including main.css with Tailwind directives)
    console.log('  → Building full.css (complete bundle)...');
    const fullResult = await processor.process(main, { from: undefined });
    fs.writeFileSync('dist/full.css', fullResult.css);

    console.log('✅ CSS bundles created in dist/');
    console.log('   - base.css:', (baseResult.css.length / 1024).toFixed(2), 'KB');
    console.log('   - theme.css:', (themeResult.css.length / 1024).toFixed(2), 'KB');
    console.log('   - animations.css:', (animResult.css.length / 1024).toFixed(2), 'KB');
    console.log('   - full.css:', (fullResult.css.length / 1024).toFixed(2), 'KB');
}

buildCSS().catch(err => {
    console.error('❌ CSS build failed:', err);
    process.exit(1);
});
