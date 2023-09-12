// Code written for Node.js v19

const csvData = `
Name,Date,notes,Value,Change
IQZ,2015-7-8,notes,656.36,INCREASED
DLV,2015-8-8,notes,173.35,INCREASED
DLV,2015-10-4,notes,231.67,INCREASED
DLV,2015-9-7,notes,209.57,DECREASED
IQZ,2015-9-7,notes,641.23,DECREASED
IQZ,2015-10-4,notes,657.32,INCREASED
DLV,2015-8-18,notes,233.43,INCREASED
DLV,2015-9-15,notes,158.73,DECREASED
IQZ,2015-10-8,notes,537.53,DECREASED
IQZ,2015-10-6,notes,Invalid,UNKNOWN
`;

// Convert the provided data into an array of objects which is sorted by the Date
function parseData(csvData) {
	const lines = csvData.trim().split('\n');
	const headers = lines.shift().split(',');
	const result = [];

	// Iterate through each line and convert it into an object
	lines.forEach(line => {
	  const values = line.split(',');
	  const obj = {};
	  headers.forEach((header, index) => {
	    obj[header] = values[index];
	  });
	  result.push(obj);
	});

	// Sort the array of objects by date
	result.sort((a, b) => {
	  const dateA = new Date(a.Date);
	  const dateB = new Date(b.Date);
	  return dateA - dateB;
	});
	return result;
}

// The core function for the test: using a single loop to iterate through the data once and keep track of the largest increase for each company. 
function findLargestIncrease(result) {
  let largestIncreaseData = { name: '', increased: 0 };
  const companyData = {}; // Use an object to store data for each company

  for (const item of result) {
    if (item.Name && item.Value && !isNaN(Number(item.Value))) {
      const companyName = item.Name;
      const value = Number(item.Value);

      // Initialize company data if it doesn't exist
      if (!companyData[companyName]) {
        companyData[companyName] = {
          lastValue: value,
          largestIncrease: 0,
        };
      } else {
        // Calculate the increase and update the largest increase if needed
        const increase = value - companyData[companyName].lastValue;
        // Here we just record the largest increase of each company, in this test, we can also remove the following 'if' block.
        if (increase > companyData[companyName].largestIncrease) {
          companyData[companyName].largestIncrease = increase;
        }
        // Here is the point, we record the largest increase data of specific company
        if (increase > largestIncreaseData.increased) {
        	largestIncreaseData.name = companyName;
          largestIncreaseData.increased = increase;
        }
      }

      // Update the lastValue for the current company
      companyData[companyName].lastValue = value;
    }
  }

  return largestIncreaseData;
}


// Print the result as the required
function print(largestIncreaseObj) {
  const message =
    largestIncreaseObj.increased > 0
      ? `公司: ${largestIncreaseObj.name}, 股价增值: ${largestIncreaseObj.increased}`
      : 'nil';

  console.log(message);
}

print(findLargestIncrease(parseData(csvData)))
