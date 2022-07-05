# Terapeando

Online therapy App to connect users and psychologists with the objective of facilitate mental health access, with de following features implemented:
- Reserve system.
- Google login and simple login.
- Payment gateway (Stripe).
- Confirmation and password recovery emails (Nodemailer).
- Chatbot (React chatbot).
- Admin panel.
- Google Maps API.
- Blog.
- Filters and sort
- Searchbar

### Visit terapeando

https://terapeando.vercel.app/ (Vercel and Heroku deploy)

### Technologies used in this project

<b>Front-end:</b> React.js, Redux, Chakra UI, CSS.</br>
<b>Back-end:</b> Node.js, Express, Mongoose, Typegoose.</br>
<b>Database:</b> MongoDB.

### Project images

Landing page
![landingpage-terapeando](https://user-images.githubusercontent.com/94813118/177249911-0f954ae7-da3a-4b22-8c42-619a4824b203.png)

Chatbot
![chatbot-terapeando](https://user-images.githubusercontent.com/94813118/177249931-50817dc0-0a4c-4168-bed1-8d82f34fba6e.png)

Sign in
![signin-terapeando](https://user-images.githubusercontent.com/94813118/177249975-ce064b81-c4c2-4c6b-8679-5f82df6d4e58.png)

Sign up
![signip-terapeando](https://user-images.githubusercontent.com/94813118/177249983-1f1500e2-f7aa-44fa-b183-f7aa86caa70e.png)

Blog
![blog-terapeando](https://user-images.githubusercontent.com/94813118/177250011-02107ad4-41fa-42cf-9ee0-ce77fff4e68c.png)

Home
![home-terapeando](https://user-images.githubusercontent.com/94813118/177249946-739ffe29-55a6-48bf-bb6b-467f1cf695b6.png)

Calendar to reserve appointments
![calendar-terapeando](https://user-images.githubusercontent.com/94813118/177249997-5ea6a1b8-2311-4fa5-9d57-18a859fa737f.png)

Payments
![pago-terapeando](https://user-images.githubusercontent.com/94813118/177251251-3b66d92f-538c-4978-bc6d-1b43f1f32764.png)
![pago2-terapeando](https://user-images.githubusercontent.com/94813118/177251260-a3c73bd3-6804-48d9-9e58-c7ec8b01ea44.png)

Appointments history
![citas-terapeando](https://user-images.githubusercontent.com/94813118/177250060-97a0e35b-f13d-408f-befb-243b6b3d9eef.png)

Psychologist profile
![perfil-terapeando](https://user-images.githubusercontent.com/94813118/177250067-49d70e65-8d6b-4c2e-83bd-783d3140b620.png)

Psychologist location map
![mapa-terapeando](https://user-images.githubusercontent.com/94813118/177250077-d54d1481-3cd6-4557-9f81-2e2f9df54c95.png)

Psychologist reviews
![reviews-terapeando](https://user-images.githubusercontent.com/94813118/177250102-81fe04cb-8e65-4cce-a1cd-7fa36d499c45.png)

---

### More about Terapeando

Grupal project developed for academic purpose in Henry Bootcamp.</br>
Contribuitors:
- Esteban Longo.
- Jeferson David Cañon Melo.
- Liliana Leiva.
- Maria Isabel Gestoso.
- Pedro Chi Novelo.
- Sergio Salgado.

### Node and npm versions
npm: '8.1.2', </br>
node: '16.13.1'

### Quick Start

- Clone this reposotory
- Run the next commands in root file.
> npm install </br>
> npm start
- Open http://localhost:3000/ in your browser.

### Dependencies and devDependencies installed

- <b>api folder:</b>

"devDependencies": {

    "@types/bcryptjs": "^2.4.2",
    "@types/express": "^4.17.13",
    "@types/jsonwebtoken": "^8.5.8",
    "@types/morgan": "^1.9.3",
    "@types/node": "^17.0.41",
    "@types/passport-google-oauth20": "^2.0.11",
    "http-proxy-middleware": "^2.0.6",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.16",
    "ts-node-dev": "^2.0.0",
    "typescript": "^4.7.3"

}

"dependencies": {
  
    "@typegoose/typegoose": "^9.9.0",
    "@types/cors": "^2.8.12",
    "@types/gridfs-stream": "^0.5.36",
    "@types/multer": "^1.4.7",
    "@types/multer-gridfs-storage": "^4.0.5",
    "@types/nodemailer": "^6.4.4",
    "@types/passport-google-oauth2": "^0.1.5",
    "@types/passport-jwt": "^3.0.6",
    "@types/stripe": "^8.0.417",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.18.2",
    "connect-flash": "^0.1.1",
    "connect-mongo": "^4.6.0",
    "cookie-parser": "^1.4.5",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "ejs": "^3.1.8",
    "express": "^4.18.1",
    "express-flash": "0.0.2",
    "express-session": "^1.17.3",
    "gridfs-stream": "^1.1.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.4.0",
    "multer": "^1.4.5-lts.1",
    "multer-gridfs-storage": "^0.1.0",
    "nodemailer": "^6.7.5",
    "passport": "^0.4.1",
    "passport-google-oauth20": "^2.0.0",
    "passport-local": "^1.0.0",
    "stripe": "^9.8.0",
    "sweetalert2": "^11.4.19",
    "uuid": "^8.3.2"
    
 }

- <b>client folder:</b>

  "dependencies": {
  
  ```
    "@chakra-ui/icons": "^2.0.2",
    "@chakra-ui/react": "^2.2.1",
    "@emotion/react": "^11.9.0",
    "@emotion/styled": "^11.8.1",
    "@react-google-maps/api": "^2.12.0",
    "@stripe/react-stripe-js": "^1.8.1",
    "@stripe/stripe-js": "^1.31.0",
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "@wojtekmaj/react-timerange-picker": "^3.5.0",
    "axios": "^0.27.2",
    "chart.js": "^3.8.0",
    "dotenv": "^16.0.1",
    "framer-motion": "^6.3.11",
    "gapi-script": "^1.2.0",
    "jsonwebtoken": "^8.5.1",
    "react": "^18.1.0",
    "react-calendar": "^3.7.0",
    "react-chartjs-2": "^4.2.0",
    "react-chatbot-kit": "^2.0.1",
    "date-fns": "^2.28.0",
    "react-dom": "^18.1.0",
    "react-google-login": "^5.2.2",
    "react-icons": "^4.4.0",
    "react-places-autocomplete": "^7.3.0",
    "react-redux": "^8.0.2",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.1",
    "react-time-picker": "^4.5.0",
    "react-select-country-list": "^2.2.3",
    "redux": "^4.2.0",
    "redux-thunk": "^2.4.1",
    "sweetalert2": "^11.4.17",
    "web-vitals": "^2.1.4"
    
  }
        
