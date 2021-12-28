# Dump of code used in the making of my "The map of History" map

## The final project can be found *pending*

## Brief description

This project attempts to show the geographic locations in which history is recorded by using the date and location of death of people with entries in Wikidata

The following code is used in the process of converting the raw database dump into the final maps

**NOTE** The scripts listed in this repo are in no ways, efficent, perfect (in the sense of not randomly throwing errors or dropping some data entries), although it works. This is not intended to be something that is used again instead just bodged codes. Do not use for any important application.

## Chain of tools used and where each file comes in

- The entire [Wikidata JSON dump](https://www.wikidata.org/wiki/Wikidata:Database_download) is downloaded from Wikidata
- The database dump is decompressed (in this case, I downloaded the gzip version and used 7-zip to decompress)
- [count-lines.js](count-lines.js) is used to estimate the size of the dump, although a number is already given directly by Wikidata
- [filter.js](filter.js) is used to filter out the data that will not be used. The results are written into another JSON file. The resulting file is about 140 megabytes.
    - *These scripts are ran with node, written in JS, and not optimized for speed. Which makes them pretty slow, but the dataset is not too big so it's acceptable to me*
- Data is filtered again with [second-filter.js](second-filter.js): unused entries removed and dates converted to Number. Note that the calender system doesn't really matter because percision is not of concern here (at least for the Gregorian-Julian difference)
- **IMPORTANT:** the string 'HALT' is manually appended on a new line in sfiltered.json
- [get.location-entity-list.js](get.location-entity-list.js) is used to extract the unique ID's of needed locations
- The file generated by the previous script along with the main database dump is used by [get-coord-from-dump.js](get-coord-from-dump.js) to generate a lookup table of needed coordinates
- Commas and brackets are added to the resulting file, I forgot to code that in, the code is not fixed so yeah. It should be a simple find-and-replace though
- [generate-final-data.js](generate-final-data.js) is used to generate a list of data that can be trivially catagorized and plotted onto a map *ready.json*

[inspect-data.js](inspect-data.js) can be used to print the first few lines of files to console. This is used for very large files that text editors can't handle

### The flow of data from the database dump to the map-ready json can also be seen from the following diagram

![data flow diagram](data-through-scripts.jpg)

These scripts are not perfect, they might (and some will) probably drop a few entries. These should be fine for this application but you might want to add a few things to prevent entries being dropped if you want to use these scripts for something else. 