## ReactPizza 🍕

**ReactPizza** არის სასწავლო პროექტი, რომელიც შევქმენი **React**–ის შესასწავლად.  
პროექტი წარმოადგენს პიცის შეკვეთის საიტის სიმულაციას, JWT ავტორიზაციით დაცული REST API–თ.

🌍 **გაშვებული ვერსია:** [ReactPizza (Render)](https://reactpizza-je52.onrender.com/)

## ✨ ფუნქციონალი

### Client side (React)

- კატეგორიების მიხედვით პიცის დათვალიერება
- ძიება და სორტირება
- გვერდებად დაყოფილი შედეგები (Pagination)
- დეტალური გვერდები თითოეული პიცისთვის
- კალათის ფუნქციონალი

### Backend (Flask REST API)

- JWT (RS256 private/public key pair) დაცული ადმინისტრატორის როუტები
- პიცის დამატება, რედაქტირება და წაშლა
- PostgreSQL მონაცემთა ბაზა
- Cloudinary ინტეგრაცია სურათებისთვის
- Swagger UI დოკუმენტაცია

## 🛠 ტექნოლოგიები

**Frontend**

- React 19
- React Router
- Redux Toolkit
- SCSS
- Axios

**Backend**

- Flask
- Flask-RESTX (Swagger UI მხარდაჭერით)
- Flask-CORS
- SQLAlchemy
- Gunicorn (Render-ზე გასაშვებად)
- PostgreSQL
- PyJWT (RS256 გასაღებებით)
- Pydantic

## ⚙️ ლოკალური გაშვების ინსტრუქცია

### 1. რეპოზიტორიის კლონირება

```
bash
  git clone https://github.com/NikaMalakmadze/ReactPizza.git
  cd ReactPizza
```

### 2. Backend ინსტალაცია

```
bash
cd backend
python -m venv venv
source venv\Scripts\activate
pip install -r requirements.txt
```

### 3. PostgreSQL ბაზა

დააყენე და გაუშვი PostgreSQL

შექმენი ბაზა (მაგ: reactpizza_db)

`.env` ფაილში მიუთითე `DATABASE_URL`

### 4. JWT გასაღებები

JWT-სთვის საჭიროა RSA გასაღებების წყვილი:

```
bash
  openssl genrsa -out jwt_private.pem 2048
  openssl rsa -in jwt_private.pem -pubout -out jwt_public.pem
```

ფაილები განათავსე `backend` დირექტორიაში.

`.env` ფაილში მიუთითე:

```
bash
  JWT_PRIVATE_KEY_PATH=./jwt_private.pem
  JWT_PUBLIC_KEY_PATH=./jwt_public.pem
```

## 5. Backend გაშვება

```
bash
  flask run
```

API ხელმისაწვდომი იქნება `http://127.0.0.1:5000/api`.

### 6. Frontend ინსტალაცია

```
bash
  cd ../frontend
  npm install
```

## 7. Frontend გაშვება

```
bash
  npm run dev
```

React აპლიკაცია გაეშვება `http://localhost:5173`.

## 🔑 კონფიგურაცია

`backend/.env` ფაილი უნდა შეიცავდეს:

```
.env
  # Flask
  FLASK_ENV=development
  FLASK_DEBUG=1
  SECRET_KEY=super_secret_key
  SECRET_PASSWORD=super_secret_password

  # Database
  DATABASE_URL=postgresql://user:password@localhost:5432/reactpizza_db

  # JWT
  JWT_PRIVATE_KEY_PATH=./jwt_private.pem
  JWT_PUBLIC_KEY_PATH=./jwt_public.pem
  JWT_ACCESS_TOKEN_EXPIRES_MINUTES=30
  JWT_REFRESH_TOKEN_EXPIRES_MINUTES=1440

  # Cloudinary
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
```

### 📌 შენიშვნები

ეს არის სასწავლო პროექტი და არა **production-ready** სისტემა.

**გადახდის სისტემა არ არის ინტეგრირებული**.

შექმნილია **React**, **Redux** და **REST API** ტექნოლოგიების სასწავლა
