# upload-demo

Web Stream API demonstration.

## How to run

After successfully clone this repository,

```bash
cd upload-demo
npm run dev -- --open
```

Then select a file to send to the server.
## How does it work?

Inside POST function in src/api/upload/+server.js, notice how body.getReader() return a stream reader.  This is according to the [Web Stream API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).
