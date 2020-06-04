import { connect } from 'react-redux';
import CreatePhoto from '../../create/photo/create-photo';

import { createPhotos } from "redux/action/createActions";

const mapStateToProps = (state, ownProps) => {
  const article = state.article && state.article.article;
  return {
    people: (article && article.people) || [],
    destinations: (article && article.destinations) || [],
    tripId: (article && article._id) || "",
    ...ownProps
  }
};


export default connect(mapStateToProps, { createPhotos })(CreatePhoto);