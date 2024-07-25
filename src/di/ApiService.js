// Example of a service dependency
export class ApiService {
    getData() {
      // Perform API request and return data
    }
  }
  
  // Example of a component with dependency injection
  export class MyComponent {
    constructor(apiService) {
      this.apiService = apiService;
    }
  
    fetchData() {
      // Use the injected ApiService dependency
      this.apiService.getData()
        .then(data => {
          // Handle the data
        })
        .catch(error => {
          // Handle errors
        });
    }
  }
  
  // Creating an instance of the ApiService
  const apiService = new ApiService();
  
  // Creating an instance of the MyComponent with the ApiService injected
  const myComponent = new MyComponent(apiService);
  
  // Using the MyComponent to fetch data
  myComponent.fetchData();