const express = require('express'); // Web framework
const fs = require('fs').promises; // File system module with Promises
const axios = require('axios'); // HTTP client

const app = express();
const PORT = 3000;

// Define the JSON object
const welcomeMessage = {
  status: "success",
  message: "Welcome to our API!",
  description: "Thank you for visiting. Use our endpoints to access various services.",
  endpoints: [
      {
          method: "GET",
          path: "/random",
          description: "Fetch a random URL and its response."
      },
      {
          method: "GET",
          path: "/status",
          description: "Check the status of the API."
      },
      {
          method: "POST",
          path: "/submit",
          description: "Submit your data to the API."
      }
  ]
};

// Convert JSON object to string
const welcomeMessageString = JSON.stringify(welcomeMessage);

app.get('/', (req, res) => {
  // Send the JSON string as the response
  res.send(welcomeMessageString);
});

// Endpoint to serve a random URL
app.get('/random', async (req, res) => {
    try {
      console.log('some request arrive!!')
        // Step 1: Read the JSON file
        const data = await fs.readFile('urllist.json', 'utf8');
        const urls = JSON.parse(data);

        if (!Array.isArray(urls) || urls.length === 0) {
            return res.status(500).send('No URLs available.');
        }
        console.log(`JSON picked successfully!! ${urls}`)
        // Step 2: Pick a random URL
        const randomUrl = urls[Math.floor(Math.random() * urls.length)];

        console.log("picked random url is :  ", randomUrl)
        // Step 3: Execute the URL (HTTP GET request)
        const response = await axios.get(randomUrl);

        // Step 4: Send the response data back to the caller
        res.json({
            requestedUrl: randomUrl,
            data: response.data
        });
    } catch (err) {
        console.error('Error handling /random endpoint:', err);
        res.status(500).send('An error occurred while processing your request.');
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
