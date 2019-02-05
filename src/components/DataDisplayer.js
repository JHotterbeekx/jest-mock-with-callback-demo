import React from "react";
import DataRetriever from "./DataRetriever";

export default class DataDisplayer extends React.Component {
  constructor(props) {
    super(props);

    // We initialize the state with a boolean that contains a boolean telling us if data is
    // available, which will be set to 'true' once the callback method is called. And a data
    // property which will be filled on callback containing a string with a title.
    this.state = {
      dataAvailable: false,
      data: null
    };
  }

  // We use the componentDidMount to trigger the retrieval of the data once the component is
  // mounted. Which means the component first mounts with its default state and than triggers
  // this method so data is retrieved.
  componentDidMount() {
    // We create a new instance of data retriever and call the retrieve method. In this
    // retrieve method we pass a so-called callback method as a parameter. This method will
    // be called inside the retrieve method. As you can see the method expects a title parameter
    // which it will set on the data property in the state and also setting the dataAvailable
    // property to true;
    new DataRetriever().Retrieve(title => {
      this.setState({
        dataAvailable: true,
        data: title
      });
    });
  }

  // This render method will initially render the text 'Data not available', because in the 
  // initial state the property dataAvailable is false. Once data is retrieved and the callback
  // method has been called the state will update, which triggers a re-render, so the render
  // is executed again. Now the dataAvailable will be true and the content in data will be shown.
  render() {
    if (!this.state.dataAvailable) return <div>Data not available</div>;
    return (
      <div>
        Data value: <strong>{this.state.data}</strong>
      </div>
    );
  }
}
