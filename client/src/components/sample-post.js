import React from 'react';

import Parallax from './parallax';

const post = {
    title: "Paris",
    startDate: new Date("03/25/2015"),
    endDate: new Date("03/30/2015"),
    location: "London",
    coverImage:
        "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
};

const SamplePost = () => {
    return <div>
        sample post here
        <Parallax post={post}/>
    </div>
}

export default SamplePost;