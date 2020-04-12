import React from 'react';

import PostTitle from './post-title';
import PictureContainer from './picture-container';

const post = {
    title: "Paris, London, Amsterdam",
    startDate: new Date("03/25/2015"),
    endDate: new Date("03/30/2015"),
    location: ["London", "Paris", "Amsterdam"],
    stickerPictures: [{img: '', x:0, y:0 }],
    pictures: [{
        
    }]
};

const SamplePost = () => {
    return <div>
        <PostTitle />
        <PictureContainer/>
    </div>
}

export default SamplePost;