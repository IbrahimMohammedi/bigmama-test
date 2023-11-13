from locust import HttpUser, task, between

# Define a Locust user class
class MyUser(HttpUser):
    # Set the wait time between requests to be between 1 and 3 seconds
    wait_time = between(1, 3)
    
    # Helper method to load text from a file
    def load_text_from_file(self, file_path):
        with open(file_path, "r") as file:
            return file.read()

    # Define a Locust task to summarize text
    @task
    def summarize_text(self):
        # Load text from a file (change "test_txt.txt" to your actual file path)
        text_from_file = self.load_text_from_file("test_txt.txt")

        # Check if the text from the file is empty
        if not text_from_file:
            print("Error: Sample text file is empty.")
            return
        
        # Prepare data for the POST request
        data = {"text": text_from_file, "max_length": 150}

        # Make a POST request to the "/api/summarize" endpoint
        response = self.client.post("/api/summarize", json=data, headers={"Content-Type": "application/json"})

        if response.status_code != 200:
            print(f"Error: {response.status_code} - {response.text}")
