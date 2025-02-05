# POS System Web Application

# Description
This is a simple POS (Point of Sale) System web application that provides both a Manager and Operator interface. The application uses PouchDB to store and manage data locally. It supports basic CRUD operations for managing products, takes orders in the Operator page, and updates the total in the Manager page when an order is accepted.

# Features
Sign-In: Secure login functionality for different users.
Manager Page:
Basic CRUD operations (Create, Read, Update, Delete) for managing items/products.
View and manage all inventory and orders.
Operator Page:
Take customer orders and add items to an order list.
Accept orders, which will update the inventory by reducing the total amount of items from the Manager page.
# Technology Stack
Frontend: HTML, CSS, JavaScript
Backend: PouchDB (for local storage)
Authentication: Simple login system (for Manager and Operator roles)
# Usage
## Sign In
Users can sign in using their credentials.
Based on the role (Manager or Operator), different views will be shown.
## Manager Page
CRUD Operations:
Add, edit, or delete items/products.
View current stock and manage inventory.
Order Management:
View orders made by the Operator.
Track total sales and inventory.
## Operator Page
Order Creation:
Add items to the order list.
Order Acceptance:
When an order is accepted, the total amount in the inventory will be reduced on the Manager page.
