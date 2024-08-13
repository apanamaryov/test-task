# test-task

To run the application go to project's folder and:

1. docker-compose up
2. cd backend
3. npm i
4. npm start
5. cd ../frontend
6. npm i
7. npm start

Frontend is running at http://localhost:3000 , backend at http://localhost:3000

API

1. Sign Up

POST http://localhost:3000/api/v1/users/signUp

Payload JSON: { username, password, name, email, phone }

2. Sign In

POST http://localhost:3000/api/v1/users/signIn

Payload JSON: { username, password }

Response: { userId, accessToken }

3. Get user info by id

GET http://localhost:3000/api/v1/users/{id}

accessToken and userId from previous request needs to be used