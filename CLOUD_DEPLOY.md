# GCP Deployment Guide: Stadium Routing App

Follow these steps to deploy the application to Google Cloud Platform.

## 1. Prerequisites
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and initialized.
- Active GCP project with billing enabled.

## 2. Setup Environment
```bash
# Set your project ID
export PROJECT_ID="your-project-id"
export REGION="asia-south1"

# Enable required services
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  firestore.googleapis.com
```

## 3. Create Artifact Registry
```bash
gcloud artifacts repositories create stadium-routing-repo \
    --repository-format=docker \
    --location=$REGION \
    --description="Docker repository for Stadium Routing App"
```

## 4. Build and Push Image (using Cloud Build)
```bash
gcloud builds submit --tag $REGION-docker.pkg.dev/$PROJECT_ID/stadium-routing-repo/app:latest .
```

## 5. Deploy to Cloud Run
```bash
gcloud run deploy stadium-routing-app \
  --image $REGION-docker.pkg.dev/$PROJECT_ID/stadium-routing-repo/app:latest \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --port 3000
```

## 6. Real-time Status (Firestore)
- Go to the [GCP Console](https://console.cloud.google.com/firestore)
- Create a Database in **Native Mode**.
- Use the SDK in Next.js to connect using the default service account credentials.

## 7. Security (Cloud Armor)
```bash
# Create security policy
gcloud compute security-policies create stadium-protection \
    --description "DDoS protection for Stadium Routing"

# (Optional) Add rules for rate limiting
```
