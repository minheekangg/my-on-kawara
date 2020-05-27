import React from "react";

import CreatePhoto from './photo';
import CreateTrip from "./trip";

const CreateArticle = ({ isDestinationsFetched, isTripFetched }) => {

    if (isDestinationsFetched && isTripFetched) {
        return <CreatePhoto />;
    }

    return <CreateTrip />;
};

export default CreateArticle;
