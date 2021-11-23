# Architecture

- https://polylith.gitbook.io/polylith/introduction/polylith-in-a-nutshell

# Running locally

- We need to reverse-proxy our localhost so that 3rd party auth flows work locally:
    - Run `ngrok http --region=us --hostname=flaminggoose.piktock.ngrok.io 1337` to proxy localhost:1337 traffic via
      http url returned by this command.
    - Set the SERVER_URL env var to the ngrok hostname.
    - Start Strapi at localhost:1337 with `yarn develop`

- Vendor integrations:
    - Twitter keys: Managed with admin api account at https://developer.twitter.com/en/docs/twitter-api.
    - Titter sign-in: Twitter public and private keys need to be set via the Strapi UI.
    - Twitter client on server: Twitter Bearer keys need to be set as environment variables - Twitter integration: make
      sure ngrok SERVER_URL is set in Twitter account for user auth -- THIS MUST BE AN HTTP URL.

## Possible policies

Link to your Terms & Conditions
https://www.termsfeed.com/live/6b6bf4f5-0087-492e-89df-bd362f1c69c9

Link to your Privacy Policy
https://www.termsfeed.com/live/3c1b1810-c90f-4a49-814f-3c9893c0a596
https://app.termsfeed.com/download/3c1b1810-c90f-4a49-814f-3c9893c0a596
