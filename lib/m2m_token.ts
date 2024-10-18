
const KINDE_CLIENT_ID = process.env.KINDE_M2M_CLIENT_ID!;
const KINDE_CLIENT_SECRET = process.env.KINDE_M2M_CLIENT_SECRET!;
const KINDE_DOMAIN = process.env.KINDE_ISSUER_URL!;

export default async function getM2MToken() {
    const tokenResponse = await fetch(`${KINDE_DOMAIN}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: KINDE_CLIENT_ID,
            client_secret: KINDE_CLIENT_SECRET,
            audience: `${KINDE_DOMAIN}/api`
        })
    });

    if (!tokenResponse.ok) {
        throw new Error('Failed to get M2M token');
    }

    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
}
