# Use an official Python runtime as a parent image
FROM python:3.9.5

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Update pip to the latest version
RUN /usr/local/bin/python -m pip install --upgrade pip

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Uninstall pymongo and bson
RUN pip uninstall -y pymongo bson

# Install pymongo
RUN pip install pymongo

# Make port 80 available to the world outside this container
EXPOSE 8080

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]