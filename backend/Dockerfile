# Use a Python base image that supports the necessary dependencies
FROM python:3.12-slim

# Install system dependencies for OpenCV and Audio processing
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libportaudio2 \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Install uv for fast dependency management
COPY --from=ghcr.io/astral-sh/uv:0.5.29 /uv /uvx /bin/

# Set the working directory
WORKDIR /app

# Create a non-root user
RUN groupadd -g 10001 appgroup && \
    useradd -u 10001 -g appgroup -m -s /bin/bash appuser && \
    chown -R appuser:appgroup /app

# Copy the dependency files
COPY --chown=appuser:appgroup pyproject.toml uv.lock ./

# Install dependencies (using uv for speed)
RUN uv sync --frozen

# Copy the backend code
COPY --chown=appuser:appgroup . .

# Switch to the non-root user
USER appuser

# Expose the API port
EXPOSE 8000

# Start the application
CMD ["uv", "run", "fastapi", "run", "main.py", "--host", "0.0.0.0", "--port", "8000"]
