# Travel Diary

This project keeps a photo journal of places visited. The user is able to create duration of a trip, add multiple cities they've been to during the trip. See below User Stories for more!

## User Story
1. User is able to create a Trip using title, start date, end date, people, and content.
2. User is able to create multiple Destinations within one trip (eg. Paris-London trip 2018, I went to Paris + London).
3. User is able to create duration of each Destination
4. User is able to upload photo using Cloudinary Widget that allows upload from desktop, camera, url, and social media platforms (Instagram, Facebook etc).
5. User is able to choose from sorted dates based on where the Photo was taken. 
6. User is able to choose who was in the Photo based on who was part of the current trip.
7. User is able to upload link to the location of the Photo.
8. User is able to view all Trips taken.
9. User is able to view single Trip that has a title section which holds information about where + the duration of the whole trip, along with Stickers (images of sentimental items taken during the trip) in the background that is draggable (for funsies).
10. User is able to edit information about the Trip, Stickers, Photos, Destinations and People. 


## Getting Started


### Installing

Make sure mongodb cluster is created + added to .env file in /server folder.

```
MONGODB_URI=mongodb+srv://{USER NAME HERE}:{PASSWORD HERE}@{CLUSTER NAME HERE}.mongodb.net/{FOLDER NAME HERE}?retryWrites=true&w=majority
```

Start server
```
yarn install
node app.js
```

Add Cloudinary credentials in .env file in /client folder.
```
REACT_APP_MY_CLOUD_NAME = {CLOUDINARY NAME}
REACT_APP_CLOUDINARY_UPLOAD_PRESET = {CLOUDINARY PRESET}
REACT_APP_CLOUDINARY_FILE={CLOUDINARY FILE}
```

Start react
```
yarn install
yarn start
```

## Built With

* MongoDB 
* NodeJS
* Express
* React
* [Cloudinary](https://cloudinary.com/) - Picture API: allows picture upload from desktop, camera, Instagram, FB, Shutterstock, URL, etc.
