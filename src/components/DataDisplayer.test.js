import React from "react";
import { mount } from "enzyme";
import DataDisplayer from "./DataDisplayer";
// We want to test DataDisplayer in an isolated state, but DataDisplayer uses DataRetriever.
// To keep the isolation we will need to mock out the DataRetriever. This way we control 
// what this component does and we can predict the outcome. To do this we need to do a manual
// mock, we can do this by importing the component we want to mock, and then defining a mock
// om that import.
import DataRetriever from "./DataRetriever";
jest.mock("./DataRetriever");


describe("DataDisplayer", () => {
  // Before each test we want to reset the state of the mocked component, so each test can
  // mock the component in the way it needs to be mocked. Should you have any default mock
  // needed that is required for every test, this is the place to do this.
  beforeEach(() => {
    DataRetriever.mockClear();
  });

  // In this test we will mock the DataRetriever in a way that it will call the callback method
  // we pass to it, and call it with "fakeTitle" as argument. This simulates that the API has
  // given us a result with { title: "fakeTitle" } in it.
  it("Should show the data, When retrieved", () => {
    // We are going to set up a mock implementation on the DataRetriever, we tell it when the code
    // uses DataRetiever instead of the original code it will receive a mocked object. This mocked
    // object has one method call "Retrieve".
    DataRetriever.mockImplementation(() => {
      return {
        // The retrieve method is defined as a method with is own logic. It's a method that gets 
        // another method as argument, the so-called callback method. And the only thing it does
        // is call this method with the argument "fakeTitle". This means that when the code will
        // create a new instance of DataRetriever and calls Retrieve(callback) that the method
        // callback is instantly called with the argument "fakeTitle". Simulating the API returning
        // this result.
        Retrieve: (callback) => callback("fakeTitle")
      }
    });

    // We mount the compont through enzyme. This renders the component with a fake DOM making us
    // able to see the result that would be rendered. Usually in unit tests I'd prefer the shallow
    // mount which doesn't execute lifecycle methods, but in this case part of the logic of our
    // component is in the componentDidMount lifecycle method, so we need mount to make sure this
    // lifecycle is triggerd.
    var wrapper = mount(<DataDisplayer />);
    // Since we fake a result coming back from the retriever, we expect the text to actually show
    // the word "fakeTitle" in the component.
    expect(wrapper.text()).toContain("fakeTitle");
  });

  // In this test we will mock the DataRetriever in a way that it will not call the callback
  // method we pass to it. This simulates tha API not being finished or returning an error.
  it("Should show not available, When data has not been retrieved", () => {
    // We are setting up a new mock implementation on the DataRetriever again.
    DataRetriever.mockImplementation(() => {
      return {
        // This is where we made it a little different. Instead of passing a method which does
        // an instant call to the callback we pass an empty method that doesn't do anything. So
        // when the code will create a new instance of DataRetriever and calls Retrieve(callback)
        // nothing is done with this callback. To make it more clear you could also read this line
        // as: Retriever: (callback) => { /* Do Nothing */ }
        Retrieve: () => {}
      }
    });

    //We mount the component again, since we need to use the lifecycle methods.
    var wrapper = mount(<DataDisplayer />);
    // Since we fake no result coming back from the retriever we don't expect any title appearing
    // on the page, but instead we expect to see the text "not available"
    expect(wrapper.text()).toContain("not available");
  });
});
