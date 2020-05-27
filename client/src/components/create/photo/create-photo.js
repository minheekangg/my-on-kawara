import React from 'react'
// import styled from "styled-components";
import { Form, Dropdown } from "semantic-ui-react";
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

  formatOptions = (options) => {
    if (!options || options.length <= 0) {
        return [];
    }

    debugger

    return options.map((d) => {
        return {
            key: d,
            text: d,
            value: d,
        };
    });
  }

  handleChange = (value, key)=> {
      this.setState ({
        photo: {
          ...this.state.photo,
          [key]: value
        }
      })
      debugger
      return;
  }

  handleSubmit = (e) => {
      e.preventDefault();

      return this.props.createPhotos(this.state.photo);
  }

 
  render() {
    return (
        <Form onSubmit={this.handleSubmit}>
            {
              this.state.photo.publicId &&
              this.state.photo.publicId.length > 0 &&
              this.state.photo.publicId.map((e) => {
                  return <Image publicId={e} width="100" cloudName={MY_CLOUD_NAME} />;
              })
            }
            <Form.Group>
                <Dropdown
                    placeholder="People"
                    name="people"
                    fluid
                    multiple
                    selection
                    options={this.formatOptions(this.state.people)}
                    onChange={(e, { value }) =>
                        this.handleChange(value, "people")
                    }
                />
                <Dropdown
                    placeholder="Destination"
                    name="destination"
                    fluid
                    selection
                    options={this.formatOptions(this.state.destinations)}
                    onChange={(e, { value }) =>
                        this.handleChange(value, "destination")
                    }
                />
                {this.state.destination && (
                    <Dropdown
                        placeholder="Date"
                        name="date"
                        fluid
                        selection
                        options={this.formatOptions(this.state.dates)}
                        onChange={(e, { value }) =>
                            this.handleChange(value, "dates")
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