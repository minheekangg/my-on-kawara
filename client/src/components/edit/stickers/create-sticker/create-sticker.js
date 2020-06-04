import React from 'react'
import { withRouter } from 'react-router-dom';

import { Image } from "cloudinary-react";
import { Form } from "semantic-ui-react";

const MY_CLOUD_NAME = process.env.REACT_APP_MY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

class CreateSticker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      photo: {
        url: [],
        publicId: [],
      },
      showWidget: props.showWidget || true,
    };
  }

  componentDidMount() {
    
  }
  
  handleSubmit = (e) => {
      e.preventDefault();
      this.props.createSticker(this.state.photo);
      // this.props.history.push(`/articles/${this.props.tripId}`)
      return;
  }

  renderWidget = () => {
    const tag = this.props.tripId ? [this.props.tripId] : [];
    window.cloudinary.createUploadWidget(
      {
        cloudName: MY_CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        folder: "trips",
        tags: tag
      },
      (error, result) => {
        if (result && result.event === "success") {
          this.setState({
            photo: {
              ...this.state.photo,
              url: [...this.state.photo.url, result.info.url],
              publicId: [...this.state.photo.url, result.info.public_id]
            }
          });
  
        }
      }
    ).open()
  }

  render() {
    return (
        <Form onSubmit={this.handleSubmit}>
          {this.state.showWidget && this.renderWidget()}
            {this.state.photo.publicId &&
                this.state.photo.publicId.length > 0 &&
                this.state.photo.publicId.map((e) => {
                    return (
                        <Image
                            key={e}
                            publicId={e}
                            width="100"
                            cloudName={MY_CLOUD_NAME}
                        />
                    );
                })}
          <Form.Button>Submit</Form.Button>
        </Form>
    );
  }
}

export default withRouter(CreateSticker);