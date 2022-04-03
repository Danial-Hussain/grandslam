# grandslam

## Goal

Visualize tennis history.

## High-level Documentation

**Data**

The data is being scraped from https://www.tennisexplorer.com/ (WTA data) and https://www.atptour.com/ (ATP data) with a python script. The script grabs the data, formats it into a tree representation and persists the data into redis.

**Frontend**

The site is statically generated using Next.js and styled using TailwindCSS. The radial brackets is built using D3.js.

**Database**:

I am using a redis instance hosted on AWS with Upstash. They offer a pretty generous free tier which meets the requirements for this project. Redis stores data as key-value pairs and in this scenario the key is the unique identifier for a tournament and the value is a string representation of the tournament's tree json data.
