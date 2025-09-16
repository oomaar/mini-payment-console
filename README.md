# XPay Mini Console (Take-home Task)

A minimal payment management console built with **Next.js App Router** and **TypeScript**.  
It simulates a merchant creating and tracking payments, and customers marking them as Paid or Canceled via a public link.

---

## Features
- Create a payment (`/new`)
- List payments with search + status filter (`/`)
- View payment details (`/payments/[id]`)
- Copy a public link for customers
- Customer page (`/pay/[publicId]`) with **Mark Paid** or **Cancel**
- Server Actions + `revalidatePath` keep UI updated
- Local JSON file as DB (`data/payments.json`)
- Loading and error UI

---

## Setup & Run

### 1. Clone and install
```bash
git clone <your-repo-url>
cd xpay-console
npm install
```

### 2. Environment

Create .env.local: ``` NEXT_PUBLIC_BASE_URL=http://localhost:3000 ```

### 3. Data file

- The app uses ``` data/payments.json ``` as a local DB.
- The file is included in the repo, starting empty ([]).
- This means you don’t need to create it manually.
- Important: runtime changes to this file (new payments you create while testing) should not be committed back to Git. Treat it like a temporary local database.

### 4. Run

``` 
npm run dev
# open http://localhost:3000
```

## Usage Flow
- Go to /new, fill in amount (cents) and merchantOrderId, submit.
- You’ll be redirected to /payments/[id] (details page).
- Copy the public link and open it in a new tab (customer view).
- Customer can mark payment as Paid or Canceled.
- Status updates everywhere (list + details).

## Project Structure
```
xpay-console/
├── data/
│   └── payments.json   ← ✅ local JSON “DB”
├── public/
│   └── favicon.ico
 src/
│   ├── actions/
│   │   └── payments.ts
│   ├── app/
│   │   ├── new/
│   │   │   ├── page.tsx
│   │   │   └── CreatePaymentPage.css
│   │   ├── pay/[publicId]/
│   │   │   ├── page.tsx
│   │   │   └── PayPublicId.css
│   │   ├── payments/[id]/
│   │   │   ├── page.tsx
│   │   │   └── Payment.css
│   │   ├── error.tsx
│   │   ├── error.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── loading.css
│   │   ├── page.tsx
│   │   ├── page.module.css
│   │   └── globals.css
│   │
│   ├── Components/
│   │   └── HomePage/
|   |   |   └── HomePageTable
│   │   |   |   ├── HomePageTable.tsx
│   │   |   |   ├── HomePageTable.css
|   |   |   └── HomePageFilters
|   |   |   |   └── HomePageSearchFilter
│   │   |   |   |   ├── HomePageSearchFilter.tsx
│   │   |   |   |   ├── HomePageSearchFilter.css
|   |   |   |   └── HomePageStatusFilter
│   │   |   |   |   ├── HomePageStatusFilter.tsx
│   │   |   |   |   ├── HomePageStatusFilter.css
│   │   |   |   └── HomePageFilters.tsx
│   │   |   |   └── HomePageFilters.css
│   │   |   └── HomePageContainer.tsx
│   │   |   └── HomePageContainer.css
│   ├── lib/
│   │   ├── db.ts
│   │   └── id.ts
│
└── package.json
```

## Notes
- Payments are stored in data/payments.json (local file DB).
- The file is included in the repo empty, but will change locally as you create payments.
- Currency is fixed to EGP.
- Amount is stored in cents (integer).
- This project is not production-ready; it’s a simulation for demo/testing.

## Notes on Requirements
-This project intentionally skips real-world payment complexity to keep the exercise simple:

### No idempotency
- In real payment systems, repeated requests (e.g., clicking "Pay" twice) are guarded with an idempotency key so the charge only happens once.
- Here, duplicate entries may be created in payments.json, and that’s fine for this assignment.

### No HMAC
- Payment providers usually sign requests/responses with an HMAC (Hash-based Message Authentication Code) to prove authenticity.
- This project does not implement cryptographic signatures — it just reads/writes to the local JSON file.

### No webhooks
- Real providers send asynchronous notifications (webhooks) to update payment status (e.g., “Payment succeeded”).
- Here, payment status is updated manually through the public payment page (Mark as Paid / Cancel buttons).

### The app simulates a mini payment console without the heavy infrastructure — just simple CRUD on a local file (data/payments.json).

## Deliverables
## Git repo
- This repository, with README.md for setup, run, finishedparts.

## Technical documentation
### Key Decisions
- Use of payments.json as a local DB (simple persistence).
- Split UI into modular components (HomePageTable, HomePageFilters, etc.).
- Next.js App Router with Server Actions (createPayment, updatePayment).

### Data Flow
- Merchant creates payment → written to payments.json.
- Payment detail page displays from file.
- Public link → customer marks Paid/Cancel → updates JSON file.
- Home page list always reads fresh from JSON.

### Assumptions
- Single-user environment (no concurrency handling).
- Currency fixed to EGP.
- Payments stored in cents (integer).
- No authentication/authorization.

### Task estimate
- T-shirt size: M
- Time-based: 5 hours total (coding + styling + docs)

