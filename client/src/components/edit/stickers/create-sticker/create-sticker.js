import React from 'react'
import { withRouter } from 'react-router-dom';

import { Image } from "cloudinary-react";
import { Form, Checkbox } from "semantic-ui-react";

const MY_CLOUD_NAME = process.env.REACT_APP_MY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

class CreateSticker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      photo: [],
      isSmall: true,
    };
  }

  componentDidMount() {
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
          const newPhoto = {
            url: result.info.url,
            publicId: result.info.public_id,
          }
          this.setState({
            photo: [...this.state.photo, newPhoto]
          });

        }
      }
    ).open()
  }


  handleSubmit = (e) => {
      e.preventDefault();
      this.state.photo.forEach(p=>{
        return p.size = this.state.isSmall ? 'small' : 'large';
      })

      this.props.createSticker({ photos: this.state.photo, tripId: this.props.tripId });
      return;
  }

  
  render() {
    return (
        <Form onSubmit={this.handleSubmit}>
            {this.state.photo &&
                this.state.photo.length > 0 &&
                this.state.photo.map((e) => {
                    return (
                        <Image
                            key={e.publicId}
                            publicId={e.publicId}
                            width="100"
                            height="100"
                            cloudName={MY_CLOUD_NAME}
                        />
                    );
                })}
          <Checkbox checked={this.state.isSmall}
            onChange={()=>this.setState({isSmall :!this.state.isSmall })} label="picture is small"/>
          <Form.Button>Submit</Form.Button>
        </Form>
    );
  }
}

export default withRouter(CreateSticker);