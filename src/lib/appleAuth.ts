// Loaded only when Apple sign-in is configured and supported by the installed binary.
export async function appleCredential(){
 const Apple=await import('expo-apple-authentication');
 const Crypto=await import('expo-crypto');
 const nonce=Crypto.randomUUID();
 const hashed=await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,nonce);
 const credential=await Apple.signInAsync({requestedScopes:[Apple.AppleAuthenticationScope.EMAIL],nonce:hashed});
 if(!credential.identityToken)throw Error('APPLE_ID_TOKEN_MISSING');
 return {credential,nonce};
}
