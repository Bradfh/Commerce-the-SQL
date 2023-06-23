# E-Commerce Application

This is an e-commerce application developed as a class project for a coding bootcamp. The application allows users to view, create, update, and delete products, categories, and tags. It also supports associating tags with products.

## Features

- View a list of products with their details, including category and tags.
- View a single product by ID.
- Create new products with associated category and tags.
- Update existing products, including modifying the category and tags.
- Delete products by ID.

## Technologies Used

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL (Database)
- HTML/CSS (Frontend)

## Getting Started

To run this application locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install the dependencies: `npm install`
3. Set up the MySQL database and update the connection configuration in `config/connection.js`.
4. Run the database migrations: `npm run migrate`
5. Start the server: `npm start`
6. Access the application in your browser at `http://localhost:3000`.

## API Endpoints

The following API endpoints are available:

- `GET /products`: Retrieve a list of all products.
- `GET /products/:id`: Retrieve a single product by ID.
- `POST /products`: Create a new product.
- `PUT /products/:id`: Update an existing product by ID.
- `DELETE /products/:id`: Delete a product by ID.

- `GET /categories`: Retrieve a list of all categories.
- `GET /categories/:id`: Retrieve a single category by ID.
- `POST /categories`: Create a new category.
- `PUT /categories/:id`: Update an existing category by ID.
- `DELETE /categories/:id`: Delete a category by ID.

- `GET /tags`: Retrieve a list of all tags.
- `GET /tags/:id`: Retrieve a single tag by ID.
- `POST /tags`: Create a new tag.
- `PUT /tags/:id`: Update an existing tag by ID.
- `DELETE /tags/:id`: Delete a tag by ID.

## Contributing

Contributions to this project are welcome. If you find any issues or would like to suggest improvements, please submit a pull request or open an issue.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For any questions or inquiries, please contact [Brad](mailto:bradfh@gmail.com).
