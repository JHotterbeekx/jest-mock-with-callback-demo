export default class DataRetriever {
  
  // This demo method calls an open API, then translates the response to JSON. Once that is done
  // it calls the passed in callbackMethod with the title property as parameter. So when the API
  // gives us { title: 'myTitle' }, the code will perform callbackMethod('myTitle')
  Retrieve(callbackMethod) {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(response => {
        return response.json();
      })
      .then(responseJson => callbackMethod(responseJson.title));
  }
}
