FROM python:3.9.5

WORKDIR /app
COPY . /app

# Update pip to the latest version
RUN /usr/local/bin/python -m pip install --upgrade pip

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# For bson compatibilty reasons:
# Uninstall pymongo and bson for bson compatibilty reasons
RUN pip uninstall -y pymongo bson

# Install pymongo
RUN pip install pymongo

EXPOSE 8080

ENV NAME World

# Run app.py when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]