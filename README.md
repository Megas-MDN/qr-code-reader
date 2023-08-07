# Project QR-code products

Fullstack Application! By combining the API with backend access control and a websocket server, I have developed a platform that allows users to receive and send products in a simple way, using only the scanning of a QR code. The experience is enhanced with real-time notifications via socket io, which enable users to accept or decline the sending or receiving of a scanned item.

Additionally, the application features user login and registration capabilities, with password encryption and token generation via JWT. The entire product inventory is stored in the MongoDB database, ensuring data persistence.

This platform represents a proof of concept with the implementation of QR code reading and generation linked to a set of product attributes, and it integrates the Next.js frontend, Express.js backend along with socket.io, and the MongoDB Atlas database.

The deployment of this application can be found at the following address: [Deploy-frontend](https://qr-code-reader-alpha.vercel.app/).

[The first access can be a bit slow due to the backend hosted on Render's free server.](https://render.com/).

The link to the backend repository that serves this application can be found at the following address: [Repo-backend](https://github.com/Megas-MDN/qr-backend). As for the backend deployment link, it can be accessed at the following address: [Deploy-backend](https://qr-backend-cdo9.onrender.com/).

<hr>

## Application flow

![application-running](https://i.imgur.com/cLgHeV9.gifv)

Firstly, when accessing the application's homepage ( / ), a login screen is displayed, allowing the user to enter their email and password if they already have an account, or click on "register" to create a new account.

After logging in, on the main screen, users can view the inventory, perform searches for words contained in the name or description of an item in the inventory, create a new product, and scan an external product by reading the QR code. In the product details, there is an option to view the history of locations where the product has been and delete the item from the inventory if necessary.

In the top bar of the application, there is also a logout button to end the session.

Additionally, each product has a combo dropdown that allows it to be sent to another user. Selecting this option triggers a notification to the recipient, requesting authorization to receive the product.

Likewise, clicking on the QR code expands it, enabling the user to read the code. The product information is retrieved from the database, and an option to request the product appears. In this case, the user who has the product in their inventory can authorize or decline the product's shipment.

![application-running-2](https://i.imgur.com/Vgmgsm9.gifv)

<hr>

## 🧐 Features

- **Login and user registration.**
- **Product creation.**
- **Reading products via QR-code and requesting the scanned product.**
- **Notification of product request via websocket.**
- **Sending a product via dropdown.**
- **Notification of receiving a product via websocket.**
- **Product search within the inventory.**
- **Product logs.**
- **Delete a product.**
- **QR-code reading with the option to choose the camera (front or back).**
<hr>

## 🛠️ Install project

1. Clone the repository

```bash
git clone https://github.com/Megas-MDN/qr-code-reader
```

2. Enter the cloned folder

```bash
cd qr-code-reader
```

3. Install the dependencies

```bash
npm install
```

4. Build the project

```bash
npm start
```

5. Run in development mode

```bash
npm run dev
```

<hr>

## 📦 Environment variables

To run this project, you will need to add the following environment variables to your .env file.

`URL_BASE_BACK`=Endpoint to acess the backend.

🌟 Ready to use!

<hr>

## 💻 Built with:

- [javascript](https://www.w3schools.com/js/js_es6.asp) : Language
- [Nextjs](https://nextjs.org/) : Framework
- [Socket.io](https://socket.io/) : Bidirectional and low-latency communication
- [JWT](https://jwt.io/) : Token generate
- [Mongo DB Atlas](https://www.mongodb.com/atlas/database) : Data base
- [Vercel](https://vercel.com/) : Deploy developer mode frontend
- [Render](https://render.com/) : Deploy developer mode backend

<hr>
<p align="center">
Developed with ❤️ by Megas
</p>
