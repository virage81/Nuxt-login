import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();
const { googleClientId } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const token = body.token;

	if (!token) {
		throw createError({
			statusCode: 400,
			statusMessage: "No token or invalid token provided",
		});
	}

	const user = verify(token).catch(console.error);

	return user;
});

async function verify(token: string) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: googleClientId, // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	const payload = ticket.getPayload();

	return payload;
	// const userid = payload["sub"];
	// If request specified a G Suite domain:
	// const domain = payload['hd'];
}
