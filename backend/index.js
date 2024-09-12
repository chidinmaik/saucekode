// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { JSDOM } = require('jsdom');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Allow CORS for frontend
app.use(express.static('downloads'));

// Route to fetch preview HTML
app.post('/preview', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).send('URL is required');

  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    res.send(dom.serialize());
  } catch (error) {
    console.error('Error fetching website preview:', error);
    res.status(500).send('Failed to fetch website preview');
  }
});

// Route to download website assets
app.post('/download', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).send('URL is required');

  try {
    // Create directories for site assets
    const siteName = new URL(url).hostname;
    const baseDir = path.join(__dirname, 'downloads', siteName);
    const htmlDir = path.join(baseDir, 'html');
    const cssDir = path.join(baseDir, 'css');
    const imgDir = path.join(baseDir, 'images');
    
    fs.mkdirSync(htmlDir, { recursive: true });
    fs.mkdirSync(cssDir, { recursive: true });
    fs.mkdirSync(imgDir, { recursive: true });

    // Fetch the HTML content
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // Save HTML file
    const htmlPath = path.join(htmlDir, 'index.html');
    fs.writeFileSync(htmlPath, dom.serialize());

    // Helper function to download and save assets
    const saveAsset = async (src, folder) => {
      try {
        if (src.startsWith('http')) {
          const fileName = path.basename(src);
          const filePath = path.join(folder, fileName);
          const assetResponse = await axios.get(src, { responseType: 'arraybuffer' });
          fs.writeFileSync(filePath, assetResponse.data);
        }
      } catch (error) {
        console.error(`Error downloading ${src}:`, error);
      }
    };

    // Download and save CSS files
    const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map(link => link.href);
    for (const cssLink of cssLinks) {
      await saveAsset(cssLink, cssDir);
    }

    // Download and save images
    const imgSrcs = Array.from(document.querySelectorAll('img'))
      .map(img => img.src);
    for (const imgSrc of imgSrcs) {
      await saveAsset(imgSrc, imgDir);
    }

    // Create a ZIP file
    const zipPath = path.join(__dirname, `${siteName}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      res.download(zipPath, () => {
        fs.unlinkSync(zipPath); // Clean up the zip file after download
      });
    });

    archive.pipe(output);
    archive.directory(baseDir, false);
    await archive.finalize();
  } catch (error) {
    console.error('Error processing the website:', error);
    res.status(500).send('Failed to process the website');
  }
});

app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
