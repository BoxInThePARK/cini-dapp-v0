# Capture to Earn
It is a decentralized "Capture to Earn" android mobile app for people who love taking photos. 

With a brand new token economics and native gallery for share and transact the Photo NFTs

# Build From Example React Native dApp

## Features

-   Authorize the web app for use with a native mobile wallet app.
-   Record a message of your choosing on-chain, using the Memo program.
-   Sign a message of your choosing.
-   Request an airdrop of SOL on devnet.

## Prerequisites

1. Set up the Android development environment by following the [environment setup instructions](https://reactnative.dev/docs/environment-setup) for your OS.
2. Install at least one mobile wallet adapter compliant wallet app on your device/simulator. You can build and install [`fakewallet`](../../android/fakewallet/) for testing purposes.

## Quick Start

### Android

1. Install dependencies and build the client libraries locally with `yarn`.
2. Start the React Native packager, build the application, and start the simulator with `yarn android`.

## Development

After making changes to any of the client libraries in `js/packages/` you will need to re-run `yarn` in this directory. This will rebuild the client libraries and copy their build artifacts into the `node_modules/` folder of this example app.