const {google} = require('googleapis');
let privatekey = require("./private_keys.json");

const auth = new google.auth.GoogleAuth({
    keyFile: "private_keys.json", //the key file
    //url to spreadsheets API
    scopes: ["https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"], 
});

async function readData(){
const authClientObject = await auth.getClient();
const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

// spreadsheet id
const spreadsheetId = "199MfsWshW5zGbpapi7_4yWX9oTzXOQ7KL7R-fqZTiUg";

// Get metadata about spreadsheet
const sheetInfo = await googleSheetsInstance.spreadsheets.get({
    auth,
    spreadsheetId,
});

//Read from the spreadsheet
const readData = await googleSheetsInstance.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId, // spreadsheet id
    range: "Sheet1!A:A", //range of cells to read from.
})

//write data into the google sheets
await googleSheetsInstance.spreadsheets.values.update({
    auth, //auth object
    spreadsheetId,
    range: "Sheet1!C3", 
    valueInputOption: "RAW", 
    resource: {
        values: [['test1', 'b.ed']]
    },
}, (err, result) => {
    if (err) {
      // Handle error
      console.log('error-------', err);
    } else {
      console.log(' cells updated.');
    }
  });
}


readData()

