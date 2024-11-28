const express = require('express');
const axios = require('axios');
const path = require('path');
const checklistRules = require('./checklistRules'); 
const app = express();

app.use(express.json()); 


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

const PORT = 3001;

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the Checklist Processing API');
});

// Function to fetch data from an external API
const fetchExternalData = async () => {
  try {
    const response = await axios.get(
      'http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw new Error('Could not retrieve data from external API. Please try again later.');
  }
};


// Checklist processing route
app.post('/process-checklist', async (req, res) => {
  const checklist = req.body.checklist;

  if (!checklist || !Array.isArray(checklist)) {
    return res.status(400).json({ error: 'Invalid checklist format. Provide an array.' });
  }

  try {
    const externalData = await fetchExternalData();

    const results = checklist.map(item => {
      const ruleFunction = checklistRules[item];

      if (ruleFunction) {
        return {
          item,
          status: ruleFunction(externalData) ? 'Passed' : 'Failed',
        };
      } else {
        return { item, status: 'Rule not found' };
      }
    });

    
    res.json({ results });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
