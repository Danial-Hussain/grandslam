# grandslam

**grandslam** serves to be the easiest way to relive tennis history. Featuring radial tournament brackets from the past two decades (both the ATP and WTA), grandslam eliminates the nuisances of traditional tennis tournament brackets and allows you to quickly take a walk down memory lane.  

## Technical Details

The data for the brackets are being scraped from https://www.tennisexplorer.com/ (WTA data) and https://www.atptour.com/ (ATP data) with a python script located in `/data`. The scraped data is formatted into a binary-tree representation, converted to a json string, and stored in a redis instance hosted with UpStash. 

The web application is written in React and TypeScript, and the pages for each tournament bracket are statically generated using Next.js. The majority of ui styling is done using TailwindCSS and the radial brackets are built using D3.js. The code for creating the brackets can be found here: `/components/Bracket.tsx`
