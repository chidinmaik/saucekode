// src/App.js
import React, { useState } from 'react';
import './index.css';
import Bar from './components/Bar';
import FAQ from './components/FAQ'; 
import Footer from './components/Footer';

function App() {
  const [url, setUrl] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [canDownload, setCanDownload] = useState(false);

  const handlePreview = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const html = await response.text();
        setPreviewHtml(html);
        setCanDownload(true);
      } else {
        alert('Failed to fetch website preview.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'website.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert('Failed to download website.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
       <div style={{ width: '100%', margin: 0, padding: 0 }}> {/* Set full width */}
   
    <Bar/>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
    
   
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Website Source Code Downloader</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePreview();
          }}
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
            className="border p-2 w-full mb-4 rounded"
            required
          />
          <button
            type="submit"
            className={`bg-primary text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Loading Preview...' : 'Preview'}
          </button>  <button
              onClick={handleDownload}
              className={`mt-4 bg-secondary text-white py-2 px-4 rounded ${!canDownload ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!canDownload || loading}
            >
              {loading ? 'Downloading...' : 'Download'}
            </button>
        </form>

        {previewHtml && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Preview</h2>
            <iframe
              srcDoc={previewHtml}
              style={{ width: '100%', height: '500px', border: 'none' }}
              title="Website Preview"
            />
            <button
              onClick={handleDownload}
              className={`mt-4 bg-green-500 text-white py-2 px-4 rounded ${!canDownload ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!canDownload || loading}
            >
              {loading ? 'Downloading...' : 'Download'}
            </button>
          </div>
        
        )}
        </div>
      </div>


      <div className="flex flex-col items-bottom justify-bottom bg-gray-100 p-4">
          <FAQ />
        </div>

        <Footer />
    </div>
    </div>
  );
}

export default App;
