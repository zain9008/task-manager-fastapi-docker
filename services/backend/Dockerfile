# 1. Base Python image use karein
FROM python:3.10-slim

# 2. Container ke andar working directory set karein
WORKDIR /app

# 3. Pehle requirements copy karein takay cache use ho sake
COPY requirements.txt .

# 4. Required Python packages install karein
RUN pip install --no-cache-dir -r requirements.txt

# 5. Apni app ka saara code container me copy karein
COPY ./app ./app

# 6. Port 8000 expose karein jahan FastAPI chalegi
EXPOSE 8000

# 7. Uvicorn server start karne ki command
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
