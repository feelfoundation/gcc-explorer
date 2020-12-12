# Run GCC Explorer from Source

Before installing from source a proper development environment has to be installed and configured.

- [Linux Prerequisites](prerequisites-linux.md)
- [MacOS Prerequisites](prerequisites-macos.md)

Clone the GCC Explorer Repository:

```
git clone https://github.com/feelfoundation/gcc-explorer.git
cd gcc-explorer
```


## Managing GCC Explorer

To test that Feel Explorer is configured correctly, use the following commands:

```
npm run start          // default config based on environment variables
npm run start:local    // connect with localhost:18500
npm run start:testnet  // connect with testnet
npm run start:mainnet  // connect with mainnet
```

Open: <http://localhost:16540>, or if its running on a remote system, switch `localhost` for the external IP Address of the machine.

Once the process is verified as running correctly, `CTRL+C` and start the process with `PM2`. This will fork the process into the background and automatically recover the process if it fails.

## Optional steps

### Configuration

You can configure the application by setting the following variables manually and running the process from command-line.

```
- FEEL_HOST=node.feel.surf       # Feel Core/SDK host IP/domain name
- FEEL_PORT=8500               # Feel Core/SDK port
- REDIS_HOST=localhost         # Redis host IP
- REDIS_PORT=6379              # Redis port
- REDIS_DB=0                   # Redis database number
```
> The default `config.js` file contains all of the configuration settings for GCC Explorer. These options can be modified according to comments included in configuration file.

### Frontend source code file watch

For having a watcher to generate bundles continuously for all the changes of the code, Run the following command:

`DEBUG=true npm run watch`

From now on all changes made to the frontend code in `/src` trigger instant rebuild.

> `DEBUG=true` enables source maps useful for in-browser debugging

### Google Analytics

If you want to add a meta tag with name and content defined (For example to verify your ownership to Google analytics) run:

```
SERVICE_NAME='your service name' \
CLIENT_ID='you client id' \
npm run build
```

### Market Watcher

In case of problems with candlestick chart it may be beneficial to rebuild the database by running the following command again.

`grunt candles:build`

To update candlestick data manually run (only after initialization):

`grunt candles:update`

> Note: There is no need to run this command in production environment - during runtime the  candlestick data is updated automatically.

### Run with PM2

`pm2 start pm2-explorer.json`

After the process is started its runtime status and log location can be found by issuing this statement:

`pm2 list`

To stop Explorer after it has been started with `PM2`, issue the following command:

`pm2 stop gcc-explorer`
