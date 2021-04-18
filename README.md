# Cab Karo (cab fare comparison)

### Leaving somewhere? Use cab karo to find the best deal for your travel..
<hr><br>
<img src="https://user-images.githubusercontent.com/49815429/115147185-6e7a6700-a077-11eb-9162-ad8f7fc1c59c.PNG" width="500" height="350"/>
<img src="https://user-images.githubusercontent.com/49815429/115147192-72a68480-a077-11eb-8473-826b318b1a09.PNG" width="500" height="350"/>


---

### Table of Contents


- [Description](#description)
- [How To Use](#how-to-use)
- [Important Note](#important-note)
- [License](#license)
- [Author Info](#author-info)

---

## Description

Cab Karo, allows you to choose the best deal for your travel.
Some features:
1. Map and corresponding details generation.
2. Fetching real-time fare prices from leading cab services through WebScraping using Puppeteer.
3. Graphical representation of fetched data using Google Charts API.
4. Inbuilt HTML to PDF conversion for on-the-go analysis.
5. Mailing the PDF and notifying the user on WhatsApp using nodemailer and Twilio libraries.

Check out this video for demo.

[![Demo](https://user-images.githubusercontent.com/49815429/115147106-062b8580-a077-11eb-8ba7-3b9a480a4f3d.PNG)](https://www.linkedin.com/posts/pantchayan_puppeteer-webscraping-automation-activity-6789315209803685888-v7vM)


#### Technologies

- Node.js
- Puppeteer (for Webscraping)
- Twilio and Nodemailer (for notifying user and mailing the result pdf)

[Back To The Top](#table-of-contents)

---

## How To Use

To run the script one would require NodeJS installed in their machine.

#### Installation

```html
    npm init
    npm install puppeteer
    npm install fs
    npm install twilio
    npm install nodemailer
```

Downloads all the dependencies. (Puppeteer, fs, nodemailer, twilio, process)

[Back To The Top](#table-of-contents)

---

## Important Note

notification.js has the following lines of code

```javascript
     // Gmail creds
     myEmail = "xxxxx@gmail.com";
     pwd = fs.readFileSync("../password.txt","utf-8");
```
```javascript
     // Twilio creds
     const accountSid = "ACe4fc7xxxxxxxx2d7eb";
     const authToken = fs.readFileSync("../token.txt","utf-8");
```

Make sure to create the credentials of your own and replace with these. 

data > credentials.txt has the target mail id which recieves the result.pdf. Replace the id with on of your own choice

#### Run

```html
    node main.js "SOURCE_VALUE" "DESTINATION_VALUE"
```
You can also refer to the video in [Description](#description) to see how the project is implemented.

[Back To The Top](#table-of-contents)

---

## License

MIT License

Copyright (c) [2017] [Chayan Pant]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[Back To The Top](#table-of-contents)

---

## Author Info

- Linkedin - [@pantchayan](https://www.linkedin.com/in/pantchayan/)
- Github - [@pantchayan](https://github.com/pantchayan)

[Back To The Top](#table-of-contents)
