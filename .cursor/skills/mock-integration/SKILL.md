# Skill: mock-integration

Use this skill when the designer wants to prototype an integration with an external service, API, or system — without actually connecting to it.

## When to Use
- "Integrate with Stripe / payments"
- "Add push notifications"
- "Connect to Google Maps / location services"
- "Add social login (Google, Apple, Facebook)"
- "Integrate with [any third-party service]"
- "The app should send emails when..."
- "We need to call the backend API for..."
- "Add file upload / camera / biometrics"

---

## What This Skill Does
Creates a mock service file that simulates the integration convincingly, documents the real implementation contract, and wires it into the UI — all without touching a real API.

---

## Steps

### 1. Identify the integration type
Categorize the integration:
- **Auth service** (OAuth, SSO, biometrics)
- **Payment processor** (Stripe, PayPal, in-app purchases)
- **Messaging / notifications** (push, email, SMS)
- **Location / maps** (Google Maps, device GPS)
- **File / media** (upload, camera, storage)
- **Analytics** (tracking events, user properties)
- **Custom backend API** (the product's own server)
- **Other third-party** (weather, translation, AI, etc.)

### 2. Create a mock service file
Create at: `src/lib/mock-services/[service-name].ts`

The file must:
1. Export typed interfaces matching the real service's data shapes
2. Implement async functions that return mock data via `mockFetch()`
3. Include `// BACKEND:` comment blocks for every function

Example structure:

```typescript
import { mockFetch } from "@/lib/mock-api";

// Real integration: Stripe
// Docs: https://stripe.com/docs/api
// SDK: npm install stripe (server-side) or @stripe/stripe-js (client-side)

export interface PaymentMethod {
  id: string;
  type: "card" | "apple_pay" | "google_pay";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

export interface PaymentResult {
  success: boolean;
  paymentIntentId: string;
  status: "succeeded" | "processing" | "failed";
  errorMessage?: string;
}

// BACKEND: POST /api/payments/create-intent
// Request:  { amount: number (cents), currency: string, customerId: string }
// Response: { clientSecret: string, paymentIntentId: string }
// Auth:     Bearer token (customer JWT)
// Notes:    Amount in smallest currency unit (cents for USD)
//           Must verify user owns the cart before creating intent
//           Webhook: payment_intent.succeeded → fulfill order
export async function createPaymentIntent(amount: number): Promise<{ clientSecret: string }> {
  return mockFetch({ clientSecret: "pi_mock_secret_abc123" }, 1200);
}

// BACKEND: POST /api/payments/confirm
// Request:  { paymentIntentId: string, paymentMethodId: string }
// Response: PaymentResult
// Auth:     Bearer token
// Notes:    Idempotent — safe to retry with same paymentIntentId
export async function confirmPayment(): Promise<PaymentResult> {
  return mockFetch({
    success: true,
    paymentIntentId: "pi_mock_abc123",
    status: "succeeded",
  }, 1500);
}
```

### 3. Wire into the UI
Import the mock service in the relevant screen and use it:

```typescript
import { confirmPayment } from "@/lib/mock-services/payments";

const handlePay = async () => {
  setIsProcessing(true);
  const result = await confirmPayment();
  if (result.success) {
    router.push("/(screens)/payment-success");
  }
  setIsProcessing(false);
};
```

### 4. Show both happy path and error states
Always prototype:
- **Success state** — the normal flow
- **Error state** — what the user sees if it fails
- **Loading state** — while the "request" is in flight

Add a toggle or dev shortcut to switch between states if helpful.

### 5. Add real implementation notes
After the mock service file, add a `// REAL IMPLEMENTATION:` section as a comment:

```typescript
// REAL IMPLEMENTATION NOTES:
// 1. Install: npm install @stripe/stripe-js stripe
// 2. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY in .env
// 3. Create a Route Handler at src/app/api/payments/create-intent/route.ts
// 4. Initialize Stripe client on the server with the secret key
// 5. Use StripeElements component to render the payment form
// 6. Set up webhook at /api/webhooks/stripe to handle post-payment events
```

### 6. Report back
Tell the designer:
- What was mocked
- Where the mock service file lives
- What screens were updated
- Key `// BACKEND:` contracts documented
- What real implementation would require (brief, high-level)
