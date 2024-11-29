# Weather API

A RESTful API for managing weather records with MongoDB, featuring CRUD operations, filtering, sorting, and pagination.

## Features

- CRUD operations for weather records
- Advanced filtering by city, country, temperature range, and date range
- Sorting by any field
- Pagination support
- MongoDB integration
- Ready for Vercel deployment

## API Endpoints

### GET /api/weather
Get all weather records with support for:
- Pagination: `?page=1&limit=10`
- Sorting: `?sortBy=temperature&order=desc`
- Filtering:
  - By city: `?city=London`
  - By country: `?country=UK`
  - By temperature range: `?minTemp=20&maxTemp=30`
  - By date range: `?fromDate=2023-01-01&toDate=2023-12-31`

### GET /api/weather/:id
Get a specific weather record by ID

### POST /api/weather
Create a new weather record
```json
{
    "city": "London",
    "country": "UK",
    "temperature": 20,
    "humidity": 65,
    "condition": "Cloudy",
    "date": "2023-09-14"
}
```

### PUT /api/weather/:id
Update an existing weather record

### DELETE /api/weather/:id
Delete a weather record

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create .env file with:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

3. Run the server:
```bash
npm run dev
```

## Deployment

The API is configured for Vercel deployment. Simply push to your GitHub repository and connect it to Vercel.
