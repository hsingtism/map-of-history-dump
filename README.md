# Dump of code used in the making of my "The map of History" map

## The final project can be found *pending*

## Brief description

This project attempts to show the geographic locations in which history is recorded by using the date and location of death of people with entries in Wikidata

The following code is used in the process of converting the raw database dump into the final maps

## Chain of tools used and where each file comes in

- The entire [Wikidata JSON dump](https://www.wikidata.org/wiki/Wikidata:Database_download) is downloaded from Wikidata
- The database dump is decompressed (in this case, I downloaded the gzip version and used 7-zip to decompress)
- [count-lines.js](count-lines.js) is used to estimate the size of the dump, although a number is already given directly by Wikidata
- [filter.js](filter.js) is used to filter out the data that will not be used. The results are written into another JSON file. The resulting file is about 140 megabytes.
    - *These scripts are ran with node, written in JS, and not optimized for speed. Which makes them pretty slow, but the dataset is not too big so it's acceptable to me*
- Data is filtered again with [second-filter.js](second-filter.js): unused entries removed and dates converted to Number. Note that the calender system doesn't really matter because percision is not of concern here (at least for the Gregorian-Julian difference)
- **IMPORTANT:** the string 'HALT' is manually appended on a new line in sfiltered.json
- [get.location-entity-list.js](get.location-entity-list.js) is used to extract the unique ID's of needed locations
- *pending*

[inspect-data.js](inspect-data.js) can be used to print the first few lines of files to console. This is used for very large files that text editors can't handle