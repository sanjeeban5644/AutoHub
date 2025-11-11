***

# 🚗 AutoHub – Microservices-Based Car Management System

AutoHub is a microservices-based web application for managing cars, customers, and orders in an automobile dealership.  

It provides REST APIs for adding cars, managing stock, handling customer information, and placing orders.  
All services are independently deployed, registered with **Netflix Eureka**, and communicate through **Spring Cloud OpenFeign** via an **API Gateway** built using **Spring Cloud Gateway**.

***

## ⚙️ System Overview

AutoHub consists of three backend microservices, one API Gateway, and a frontend web application.

### 🧩 Microservices and Components

1. **CarService** – Handles car details and stock management  
2. **CustomerService** – Manages customer information  
3. **OrderService** – Processes and coordinates orders between Car and Customer services  
4. **API Gateway** – Routes and load-balances requests to backend microservices  
5. **Eureka Server** – Service registry for automatic discovery and communication between services  

All microservices are registered with Eureka and accessible through the API Gateway.

***

## 🧰 Technologies Used

### Backend
- Spring Boot – Microservice development  
- Spring Cloud Gateway – API Gateway for routing and load balancing  
- Spring Cloud Netflix Eureka – Service discovery and registration  
- Spring Cloud OpenFeign – Inter-service communication  
- Spring Data JPA – ORM and database management  
- MySQL – Database  
- Swagger/OpenAPI – API documentation  
- Maven – Build and dependency management  

### Frontend
- HTML, CSS, JavaScript  
- Organized modules: `car.js`, `customer.js`, `order.js`  
- Uses `fetch()` to connect with API Gateway endpoints  
- Assets and styles in `/assets` and `/css`  

***

## 🖥️ How to Run the Project

### Prerequisites
- Java 17+  
- Maven  
- MySQL  
- Node.js or any static server (for frontend)  

***

### Steps to Run

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/AutoHub.git
cd AutoHub
```

#### 2. Set Up Databases
Create the following databases in MySQL:  
- `car_db`  
- `customer_db`  
- `order_db`  

Update credentials in each service’s `application.yml`.

#### 3. Run the Eureka Server
```bash
cd EurekaServer
mvn spring-boot:run
```

#### 4. Run Microservices
```bash
cd CarService
mvn spring-boot:run
```
```bash
cd ../CustomerService
mvn spring-boot:run
```
```bash
cd ../OrderService
mvn spring-boot:run
```

All services will automatically register with Eureka.

#### 5. Run the API Gateway
```bash
cd ../ApiGateway
mvn spring-boot:run
```

#### 6. Access the Applications
- **Eureka Dashboard:** `http://localhost:8761`  
- **Swagger UI (for each microservice):** `http://localhost:<port>/swagger-ui/index.html`  
- **Gateway Base URL:** `http://localhost:8080`

***

## 💻 Frontend Setup

#### Option 1 – Open Directly
Open:
```
AutoHubFrontend/index.html
```

#### Option 2 – Run Using Live Server
Access using:
```
http://127.0.0.1:5500/index.html
```

***

## 🚘 Features

- Register, update, and view cars  
- View and manage stock details  
- Add and manage customers  
- Place and track orders across services  
- Service discovery and dynamic routing through Eureka and API Gateway  

***

## 🖼️ Screenshots

<img width="1889" height="943" alt="image" src="https://github.com/user-attachments/assets/b9e17fbf-30d2-4221-bc93-3b6c1bed42a2" />
- Car Management UI  

<img width="1886" height="888" alt="image" src="https://github.com/user-attachments/assets/0e76e36b-7439-4ee3-9e25-2ce69940841a" />
 - Eureka Dashboard  
<br><br>



***
