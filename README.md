# Hono Lambda template

## Clone
```bash
git clone https://github.com/prawee/hono-lambda-template.git user-service
cd user-service
```

## Develop
```bash
cp env.dist .env
npm install
npm run dev | nodemon
```
open your browser <http://localhost:3000/api>

### Testing
```bash
cp app.rest.dist app.rest
```

## Deploy
```bash
npm run build
cdk bootstrap # first time
cdk synth
cdk deploy | cdk deploy --require-approval never
```

### Testing
```bash
cp app.prod.rest.dist app.prod.rest 
```

## Destroy
```bash
cdk destroy | cdk destroy --force
```