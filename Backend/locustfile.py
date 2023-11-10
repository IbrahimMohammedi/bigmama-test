from locust import HttpUser, task, between

class MyUser(HttpUser):
    wait_time = between(1, 3)
    
    def load_text_from_file(self, file_path):
        with open(file_path, "r") as file:
            return file.read()

    @task
    def summarize_text(self):
        text_from_file = self.load_text_from_file("test_txt.txt")
        if not text_from_file:
            print("Error: Sample text file is empty.")
            return
        
        data = {"text": text_from_file, "max_length": 150}
        response = self.client.post("/api/summarize", json=data, headers={"Content-Type": "application/json"})
        if response.status_code != 200:
            print(f"Error: {response.status_code} - {response.text}")

