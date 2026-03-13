# Mobile Authentication

The mobile app authenticates using native Google Sign-In. After verifying the Google ID token server-side, the API issues a long-lived JWT that is sent as a Bearer token on all subsequent requests.

## Flow

```
Mobile app
  │
  ├─ 1. Google Sign-In (native SDK) → receives idToken
  │
  ├─ 2. POST /api/auth/mobile/token
  │       { idToken, deviceName? }
  │       ← { token, expiresAt }
  │
  └─ 3. All API calls
          Authorization: Bearer <token>
```

## 1. Get a token

```http
POST /api/auth/mobile/token
Content-Type: application/json

{
  "idToken": "<google id token from native sign-in>",
  "deviceName": "iPhone 15"   // optional, for your own reference
}
```

**Response `200`**
```json
{
  "token": "eyJ...",
  "expiresAt": "2026-06-11T22:39:34.000Z"
}
```

Tokens are valid for **90 days**. Store the token securely (e.g. iOS Keychain / Android Keystore).

## 2. Make authenticated requests

Include the token in every request that requires auth:

```http
GET /api/users/current
Authorization: Bearer eyJ...
```

A missing or invalid token returns `401`. A revoked or expired token also returns `401`.

## 3. Sign out / revoke

To invalidate a token (e.g. on sign-out or device removal), send its `jti`. The `jti` is the `jti` claim inside the JWT payload.

```http
POST /api/auth/mobile/revoke
Authorization: Bearer eyJ...
Content-Type: application/json

{
  "jti": "<jti claim from the JWT payload>"
}
```

**Response `200`**
```json
{ "success": true }
```

## Google Sign-In setup

The `idToken` comes from Google's native SDK. The same `GOOGLE_CLIENT_ID` used for the web OAuth flow is the audience you pass when configuring the SDK.

- **Android** — `GoogleSignIn` / Credential Manager: use the web client ID as `serverClientId`
- **iOS** — `GoogleSignIn-iOS`: set `serverClientID` to the web client ID

The backend verifies the token against that same client ID automatically.
