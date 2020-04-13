/* eslint-disable import/order */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import FilePicker from '../FilePicker';
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import Amplify, { Storage } from 'aws-amplify';
import awsconfig from './../../aws-exports';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    Amplify.configure(awsconfig);
    this.submitFormHandler = this.submitFormHandler.bind(this);
  }

  componentDidMount() {
    /*
    Add your bucket name here
    */

    // Storage.configure({
    //   AWSS3: {
    //     bucket: name,
    //     region,
    //   },
    // });
  }


  myCallback = (dataFromChild) => {
    this.setState({
      file: dataFromChild,
      fileName: dataFromChild.name,
    });
  }


  submitFormHandler(event) {
    event.preventDefault();
    const {
      file, fileName,
    } = this.state;
    Storage.put(fileName, file, {
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
      contentType: 'video/*',
    })
    .then(() => console.log(`Successfully Uploaded: ${fileName}`))
    .catch((err) => console.log(`Error: ${err}`));
  }



  render() {
    return (
      <div className="adminHeader">
        <div>
          <AmplifyAuthenticator>
            <h1 className="pageName">S3 Panel</h1>
            <form onSubmit={this.submitFormHandler}>
              <div>
                <FilePicker callbackFromParent={this.myCallback} />
              </div>
              <input type="submit" className="submitButton" id="submitButton" value="Create Asset" />
            </form>
            <br/>
            <AmplifySignOut />
          </AmplifyAuthenticator>
        </div>
      </div>
    );
  }
}

export default Admin;

