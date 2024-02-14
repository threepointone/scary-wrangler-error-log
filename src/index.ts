export interface Env {
	DURABLE: DurableObjectNamespace;
}

// A simple Durable Object, that responds to `ping` with `pong`

export class DurableSocket implements DurableObject {
	async fetch(req: Request): Promise<Response> {
		if (req.headers.get('upgrade') !== 'websocket') {
			return new Response('Hello World!');
		}
		const { 0: client, 1: server } = new WebSocketPair();

		server.accept();

		server.addEventListener('message', (event) => {
			if (event.data === 'ping') {
				server.send('pong');
			}
		});

		return new Response(null, {
			status: 101,
			webSocket: client,
		});
	}
}

export default {
	async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// let's open a connection to the durable object
		const roomName = 'some-room';
		const docId = env.DURABLE.idFromName(roomName).toString();
		const id = env.DURABLE.idFromString(docId);
		const stub = env.DURABLE.get(id);
		const ws = (
			await stub.fetch('http://dummy.com/some-path', {
				headers: {
					upgrade: 'websocket',
				},
			})
		).webSocket!;

		ws.accept();

		const response = await new Promise<string>((resolve) => {
			ws.addEventListener('message', (event) => {
				// This will log a scary error in the console
				console.log(event);
				// but will not crash the worker
				resolve('success');
			});

			ws.send('ping');
		});

		return new Response(response);
	},
};
