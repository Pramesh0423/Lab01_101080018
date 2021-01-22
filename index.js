
const csv = require('csv-parser');
const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const canadaData = [];
const usaData = [];


// function checks if the file with the same name already exists and deletes (if any) to create the new file

function checkFileExist(data, country, path){
if(fs.existsSync(path)){
fs.unlink(path, err=>console.log(`----------------\nFile "${path}" to store data for "${country}" already exists and thus was deleted to create the new one with the same name!`))
writeData(data, path)
}else{
writeData(data, path)
console.log(`-----------------\nSuccessfully filtered data for "${country}" and stored in the "${path}" File!`)
}
}

//function that created and writes data

function writeData(data, path){
const csvWriter = createCsvWriter({
path: path,
header: [
{id: 'country', title: 'Country'},
{id: 'year', title: 'Year'},
{id: 'population', title: 'Population'}
]
});
csvWriter
.writeRecords(data)
}

// Data read and write 

fs.createReadStream('input_countries.csv')
.pipe(csv({}))
.on('data', (row)=>{
if(row.country==="Canada"){
canadaData.push(row)
country1 = row.country
}

if(row.country==='United States'){
usaData.push(row)
country2 = row.country
}
})
.on('end', () => {
checkFileExist(canadaData, country1, "canada.txt")
checkFileExist(usaData, country2, "usa.txt")
})


