import React from 'react'
import { withRouter } from 'react-router-dom';
import moment from "moment";

import { Image } from "cloudinary-react";
import { Form, Dropdown, Input } from "semantic-ui-react";
import styled from "styled-components";

const MY_CLOUD_NAME = process.env.REACT_APP_MY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const StyledWrapper = styled.div`
    max-width: 300px;
    margin: auto;
    height: 100vh;
    display: flex;
    align-items: center;

    .ui.form{
        width: 100%;
    }
`;

class CreateSticker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      photo: {
        url: [],
        publicId: [],
        people: [],
        date: "",
        destination: "",
        location: "",
      },
      people: props.people,
      destinations: props.destinations,
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

  formatPeople = (people) => {
    if (!people || people.length <= 0) {
        return [];
    }
   return people.map((d) => {
        return {
            key: d.name,
            text: d.name,
            value: d._id,
        };
    });
  }

  formatDestinations = (destinations) => {
    if (!destinations || destinations.length <= 0) {
        return [];
    }

    return destinations.map((d) => {
        return {
            key: d.city,
            text: d.city,
            value: d._id,
        };
    });
  }

  formatDates = (destinations) => {
    if (!destinations || destinations.length <= 0) {
        return [];
    }

    if (!this.state.photo.destination) {
      return [];
    }

    const foundDestination = destinations.find(d=>d._id === this.state.photo.destination);
    const dates = calculateDays(foundDestination.startDate, foundDestination.endDate)

    return dates.map(d => {
      return {
            key: d,
            text: d,
            value: d,
        };
    })
  }

  handleChange = (value, key)=> {
      this.setState ({
        photo: {
          ...this.state.photo,
          [key]: value
        }
      })
      return;
  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.props.createPhotos(this.state.photo);
      this.props.history.push(`/articles/${}`)
      return;
  }
  
  render() {
    return (
      <StyledWrapper>
        <Form onSubmit={this.handleSubmit}>
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
      </StyledWrapper>
    );
  }
}

export default withRouter(CreateSticker);