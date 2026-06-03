/**
 * BITSOL MARKETING — LinkedIn OAuth Token Generator
 *
 * Gets an access token that allows posting to your LinkedIn Company Page.
 *
 * Run: node scripts/linkedin-auth.mjs
 *
 * What it does:
 *  1. Opens your browser to LinkedIn's authorization page
 *  2. You click "Allow" — LinkedIn redirects back to localhost
 *  3. Script exchanges the code for an access token
 *  4. Prints the token — paste it into your .env as LINKEDIN_ACCESS_TOKEN
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import http from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Load .env ───────────────────────────────────────────────────────────────
const envPath = join(__dirname, "../.env");
try {
  const envContent = readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const [key, ...rest] = line.split("=");
    if (key?.trim() && rest.length)
      process.env[key.trim()] = rest.join("=").trim().replace(/^"|"$/g, "");
  });
} catch {
  console.error("Could not load .env — make sure it exists.");
  process.exit(1);
}

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET must be set in .env");
  process.exit(1);
}

const REDIRECT_URI = "http://localhost:3333/callback";
const SCOPES = "w_member_social w_organization_social r_organization_social";
const STATE = Math.random().toString(36).slice(2);

// ─── Build auth URL ───────────────────────────────────────────────────────────
const authUrl =
  `https://www.linkedin.com/oauth/v2/authorization` +
  `?response_type=code` +
  `&client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(SCOPES)}` +
  `&state=${STATE}`;

// ─── Exchange code for token ──────────────────────────────────────────────────
async function exchangeCodeForToken(code) {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  return res.json();
}

// ─── Write token back to .env ─────────────────────────────────────────────────
function saveTokenToEnv(token) {
  const content = readFileSync(envPath, "utf8");
  const updated = content.replace(
    /^LINKEDIN_ACCESS_TOKEN=.*$/m,
    `LINKEDIN_ACCESS_TOKEN="${token}"`
  );
  writeFileSync(envPath, updated, "utf8");
}

// ─── Local callback server ────────────────────────────────────────────────────
async function waitForCallback() {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const url = new URL(req.url, "http://localhost:3333");
      if (url.pathname !== "/callback") return;

      const code = url.searchParams.get("code");
      const returnedState = url.searchParams.get("state");
      const error = url.searchParams.get("error");

      if (error) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(`<h2>Authorization failed: ${error}</h2><p>Close this tab and check the terminal.</p>`);
        server.close();
        return reject(new Error(`LinkedIn denied authorization: ${error}`));
      }

      if (returnedState !== STATE) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(`<h2>State mismatch — possible CSRF. Try again.</h2>`);
        server.close();
        return reject(new Error("State mismatch"));
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <html><body style="font-family:sans-serif;max-width:500px;margin:60px auto;text-align:center">
          <h2>✅ Authorization successful!</h2>
          <p>You can close this tab and check your terminal.</p>
        </body></html>
      `);
      server.close();
      resolve(code);
    });

    server.listen(3333, () => {});
    server.on("error", reject);
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`
╔══════════════════════════════════════════════════════╗
║       BITSOL — LinkedIn Token Generator              ║
╚══════════════════════════════════════════════════════╝

STEP 1: Make sure this redirect URI is added to your LinkedIn app:

    ${REDIRECT_URI}

  → Go to: https://www.linkedin.com/developers/apps
  → Select your app → Auth tab → Authorized redirect URLs
  → Add: ${REDIRECT_URI}  → Save

STEP 2: Opening your browser to authorize...
`);

  // Try to open browser automatically; if it doesn't work, print URL
  try {
    const { execSync } = await import("child_process");
    execSync(`cmd /c start "" "${authUrl}"`, { stdio: "ignore" });
  } catch {
    // fallback — just print the URL
  }

  console.log(`If your browser didn't open, go to this URL manually:\n\n${authUrl}\n`);
  console.log(`Waiting for you to authorize the app...\n`);

  let code;
  try {
    code = await waitForCallback();
  } catch (err) {
    console.error(`\n❌ Authorization failed: ${err.message}`);
    process.exit(1);
  }

  console.log(`✅ Authorization code received. Exchanging for access token...\n`);

  let tokenData;
  try {
    tokenData = await exchangeCodeForToken(code);
  } catch (err) {
    console.error(`\n❌ Token exchange failed: ${err.message}`);
    process.exit(1);
  }

  if (tokenData.error) {
    console.error(`\n❌ LinkedIn error: ${tokenData.error_description || tokenData.error}`);
    console.error(`Full response:`, JSON.stringify(tokenData, null, 2));
    process.exit(1);
  }

  const { access_token, expires_in } = tokenData;
  const expiresInDays = Math.round(expires_in / 86400);

  console.log(`✅ Access token received! (expires in ${expiresInDays} days)\n`);

  // Save to .env automatically
  try {
    saveTokenToEnv(access_token);
    console.log(`✅ Token saved to .env as LINKEDIN_ACCESS_TOKEN\n`);
  } catch {
    console.log(`Could not auto-save to .env. Add this line manually:\n`);
    console.log(`LINKEDIN_ACCESS_TOKEN="${access_token}"\n`);
  }

  console.log(`You're ready to publish! Run:\n`);
  console.log(`    node scripts/post-to-linkedin.mjs --dry-run`);
  console.log(`    node scripts/post-to-linkedin.mjs\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
