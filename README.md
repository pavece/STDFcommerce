# STDF commerce

## Configure environment variables

Go to .env.template, then remove the ".template" from the filename and update all the variables.

### Env variables explanation

```text
MONGO_DB= Mongo db connection string [Example: mongodb://localhost:27017/stdfdb]
NEXT_PUBLIC_TAX_RATE= Tax rate used to calculate fees [Example: 0.21]
NEXT_PUBLIC_SITE_URL= The site URL, used for the API and OG images [Example:  http://localhost:3000]

GITHUB_SECRET= Github Oauth credentials, more info: https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app
GITHUB_CLIENT_ID= Github Oauth credentials 

NEXTAUTH_URL= Same as SITE_URL [Example:  http://localhost:3000]
NEXTAUTH_SECRET= Secret used for the nextauth JWT, needs to be a random and complex value
JWT_SECRET= Same as NEXTAUTH_SECRET

STRIPE_SECRET_KEY= Stripe keys used for processing payments, more info: https://stripe.com/
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= Stripe keys used for processing payments, more info: https://stripe.com/
STRIPE_WEBHOOK_KEY= Stripe webhook key, (read stripe documentation for more info)

CLOUDINARY_URL= Cloudinary url, used for uploading product images, more info: https://cloudinary.com/

```

## Run the development server

First, run the mongo db container

```bash
docker compose up -d
```

Second, run the development server

```bash
npm i
npm run dev 
```

Then go to [http://localhost:3000/api/seed](seed api EP) to load default data into the DB.

Finally open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### More info

By default all the users created with github are admins.
