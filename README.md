# A demo of a scary log

When connecting to a durable object with a websocket, logging a message inside a message handler logs a scary message, which makes it look like the worker has crashed.

```
npm install
npm run dev
open http://localhost:8787
```

And look in the console

```
<Formatting threw (Error: Failed to get the 'ports' property on 'MessageEvent': the property is not implemented.
    at MessageEvent.formatJsgResourceType (node-internal:internal_inspect:2188:31)
    at formatValue (node-internal:internal_inspect:660:49)
    at inspect (node-internal:internal_inspect:246:12)
    at formatWithOptionsInternal (node-internal:internal_inspect:2047:44)
    at formatWithOptions (node-internal:internal_inspect:1916:12)
    at formatLog (node-internal:internal_inspect:2136:16)
    at null.<anonymous> (file:///***/src/index.ts:48:13)>
```
