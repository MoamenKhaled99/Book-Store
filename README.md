# Bookstore Backend

A backend system for a digital bookstore that provides CSV-based inventory management and PDF report generation.

## Features

- **CSV Inventory Upload**: Upload and synchronize book inventory data via CSV files
- **PDF Report Generation**: Generate detailed store reports with top books and authors
- **Database**: PostgreSQL with Prisma ORM
- **Containerization**: Docker and Docker Compose support

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma 7.x
- **Database**: PostgreSQL
- **PDF Generation**: PDFKit
- **CSV Parsing**: csv-parser

## Database Schema

- **store**: `id`, `name`, `address`, `logo`
- **book**: `id`, `name`, `pages`, `author_id`
- **author**: `id`, `name`
- **store_book**: `store_id`, `book_id`, `price`, `copies`, `sold_out` (many-to-many relationship)

## API Endpoints

### 1. Upload CSV Inventory
**POST** `/api/inventory/upload`

Upload a CSV file to ingest inventory data.

**CSV Format:**
```
store_name,store_address,book_name,pages,author_name,price,logo
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/inventory/upload \
  -F "file=@inventory.csv"
```

**Response:**
```json
{
  "success": true,
  "message": "Inventory uploaded successfully",
  "data": {
    "processed": 10,
    "created": {
      "stores": 2,
      "authors": 5,
      "books": 8,
      "storeBooks": 10
    },
    "updated": {
      "storeBooks": 0
    },
    "errors": []
  }
}
```

### 2. Download Store Report
**GET** `/api/store/:id/download-report`

Generate and download a PDF report for a specific store.

**Example Request:**
```bash
curl http://localhost:3000/api/store/1/download-report -o report.pdf
```

**Report Contents:**
- Store name and logo
- Top 5 Priciest Books
- Top 5 Prolific Authors (by book count)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Docker & Docker Compose (optional)

### Installation (Local)

1. **Clone the repository**
```bash
git clone <repository-url>
cd bookstore-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/bookstore"
PORT=3000
```

4. **Run database migrations**
```bash
npm run prisma:migrate
```

5. **Start the server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

### Installation (Docker)

1. **Start the application with Docker Compose**
```bash
docker-compose up -d
```

2. **Run database migrations**
```bash
docker-compose exec app npm run prisma:migrate
```

The application will be available at `http://localhost:3000`

### Stopping the containers
```bash
docker-compose down
```

## Testing the API


```

### Upload Sample CSV

Create a file named `sample_inventory.csv`:
```csv
store_name,store_address,book_name,pages,author_name,price,logo
BookWorld,123 Main St,The Great Gatsby,180,F. Scott Fitzgerald,15.99,https://example.com/logo1.png
BookWorld,123 Main St,1984,328,George Orwell,14.99,https://example.com/logo1.png
ReadMore,456 Oak Ave,To Kill a Mockingbird,324,Harper Lee,16.99,https://example.com/logo2.png
ReadMore,456 Oak Ave,Pride and Prejudice,432,Jane Austen,12.99,https://example.com/logo2.png
BookWorld,123 Main St,Animal Farm,112,George Orwell,10.99,https://example.com/logo1.png
```

Upload the CSV:
```bash
curl -X POST http://localhost:3000/api/inventory/upload \
  -F "file=@sample_inventory.csv"
```

### Download Store Report
```bash
curl http://localhost:3000/api/store/1/download-report -o BookWorld-Report.pdf
```



```
bookstore-backend/
├── src/
│   ├── config/
│   │   └── prisma.js              # Prisma client configuration
│   ├── modules/
│   │   ├── inventory/
│   │   │   ├── presentation/
│   │   │   │   ├── routes.js
│   │   │   │   ├── controllers/
│   │   │   │   │   └── inventory.controller.js
│   │   │   │   └── validators/
│   │   │   │       └── inventory.validation.js
│   │   │   ├── services/
│   │   │   │   ├── inventory.service.js
│   │   │   │   └── validators/
│   │   │   │       └── inventory_service.validation.js
│   │   │   └── repository/
│   │   │       └── inventory.repository.js
│   │   ├── store/
│   │   │   ├── presentation/
│   │   │   │   ├── routes.js
│   │   │   │   └── controllers/
│   │   │   │       └── store.controller.js
│   │   │   ├── services/
│   │   │   │   ├── store.service.js
│   │   │   │   └── validators/
│   │   │   │       └── store_service.validation.js
│   │   │   └── repository/
│   │   │       └── store.repository.js
│   │   └── shared/
│   │       └── filters/
│   │           └── global_error.filter.js
│   └── index.js                    # Application entry point
├── prisma/
│   └── schema.prisma               # Database schema
├── prisma.config.ts                # Prisma 7.x configuration
├── .env                            # Environment variables
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## Architecture

The project follows a **layered architecture** pattern:

1. **Presentation Layer** (`presentation/`): Routes, controllers, and input validation
2. **Service Layer** (`services/`): Business logic and orchestration
3. **Repository Layer** (`repository/`): Data access and database operations

This separation ensures:
- **Maintainability**: Clear separation of concerns
- **Testability**: Each layer can be tested independently
- **Scalability**: Easy to extend with new features

## Error Handling

All endpoints include comprehensive error handling:
- Input validation errors (400)
- Not found errors (404)
- Server errors (500)



## Development Time
1.5 hours

**Estimated Development Time**: ~2.5 hours

## License

ISC
