import { generateCodeChallenge, generateCodeVerifier } from '../../utils/spotify';

const AUDIONEST_CLIENT_ID = process.env.NEXT_PUBLIC_AUDIONEST_CLIENT_ID; 
const AUTHORIZATION_CODE = undefined;

async function redirectToAuthCodeFlow(clientId: string) {

  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);
  
  localStorage.setItem('verifier', verifier);

  // TODO: come back to implement refresh logic with code response type
  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('response_type', 'token');
  params.append('redirect_uri', process.env.NEXT_PUBLIC_REDIRECT_URL);
  params.append('scope', (
    `user-read-private user-read-email \n
    user-top-read playlist-modify-private \n
    playlist-modify-public user-modify-playback-state \n
    user-read-currently-playing`
  ));
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

async function getAccessToken(clientId: string, token: string): Promise<any> {
  const verifier = localStorage.getItem('verifier');

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('access_token=', token);
  params.append('redirect_uri', process.env.NEXT_PUBLIC_REDIRECT_URL);
  params.append('code_verifier', verifier!);

  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });
}

export const authenticateSpotify = async (): Promise<string> => {
  if (!AUTHORIZATION_CODE) {
    redirectToAuthCodeFlow(AUDIONEST_CLIENT_ID);
  } else {
    return getAccessToken(AUDIONEST_CLIENT_ID, AUTHORIZATION_CODE);
  }
};