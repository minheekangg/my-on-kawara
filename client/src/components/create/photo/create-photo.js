import React from 'react'
// import styled from "styled-components";
import { Form, Dropdown, Input } from "semantic-ui-react";
import { Image } from "cloudinary-react";
const MY_CLOUD_NAME = process.env.REACT_APP_MY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

class CreatePhoto extends React.Component {
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
      window.cloudinary.createUploadWidget(
      {
        cloudName: MY_CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        folder: "trips",
        // tags: ["mh", "paris"]
      },
      (error, result) => {
        if (result && result.event === "success") {
          this.setState({
            photo: {
              ...this.state.photo,
              url: [...this.state.photo.url, result.info.url],
              publicId: [...this.state.photo.url, result.info.public_id]
            }
          },()=> {
            console.log('state is', this.state)
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
    console.log('found', foundDestination);
    return foundDestination.dates.map(d => {
      return {
            key: d.date,
            text: d.date,
            value: d._id,
        };
    })
  }

  handleChange = (value, key)=> {
      this.setState ({
        photo: {
          ...this.state.photo,
          [key]: value
        }
      }, ()=> {console.log('state changed to', this.state)})
      return;
  }

  handleSubmit = (e) => {
      e.preventDefault();
      return this.props.createPhotos(this.state.photo);
  }

 
  render() {
    return (
        <Form onSubmit={this.handleSubmit}>
            {this.state.photo.publicId &&
                this.state.photo.publicId.length > 0 &&
                this.state.photo.publicId.map((e) => {
                    return (
                        <Image
                            publicId={e}
                            width="100"
                            cloudName={MY_CLOUD_NAME}
                        />
                    );
                })}
            <Form.Group>
                <Dropdown
                    placeholder="People"
                    name="people"
                    multiple
                    selection
                    options={this.formatPeople(this.state.people)}
                    onChange={(e, { value }) =>
                        this.handleChange(value, "people")
                    }
                />
                <Dropdown
                    placeholder="Destination"
                    name="destination"
                    selection
                    required
                    options={this.formatDestinations(this.state.destinations)}
                    onChange={(e, { value }) =>
                        this.handleChange(value, "destination")
                    }
                />
                <Form.Field
                    control={Input}
                    label="Location"
                    name="location"
                    value={this.state.photo.location}
                    onChange={(e, { value }) =>
                        this.handleChange(value, "location")
                    }
                />
                {this.state.photo.destination && (
                    <Dropdown
                        placeholder="Date"
                        name="date"
                        selection
                        options={this.formatDates(this.state.destinations)}
                        onChange={(e, { value }) =>
                            this.handleChange(value, "date")
                        }
                    />
                )}
            </Form.Group>
            <Form.Button>Submit</Form.Button>
        </Form>
    );
  }
}

export default CreatePhoto;