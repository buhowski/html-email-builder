import http from 'http';
import fs, { existsSync } from 'fs';
import { execSync } from 'child_process';
import chokidar from 'chokidar';

const PORT = 666;

const SOURCE =
	process.env.SOURCE ||
	fs
		.readdirSync('.')
		.sort()
		.find((f) => f.startsWith('_email_') && f.endsWith('.js')) ||
	'email-builder.js';

const inject = (html) =>
	html.replace(
		'</body>',
		`<script>
const es = new EventSource("/sse");
es.onmessage = () => location.reload();
</script></body>`,
	);

let clients = [];

const rebuild = () => {
	try {
		execSync(`node ${SOURCE}`);
		clients.forEach((r) => r.write('data: reload\n\n'));
		clients = [];
		console.log('rebuilt');
	} catch (e) {
		console.error(e.message);
	}
};

http
	.createServer((req, res) => {
		if (req.url === '/sse') {
			res.writeHead(200, {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive',
			});
			clients.push(res);
			req.on('close', () => {
				clients = clients.filter((r) => r !== res);
			});
			return;
		}

		if (req.url.startsWith('/assets/')) {
			const filePath = req.url.slice(1);
			if (existsSync(filePath)) {
				const ext = filePath.split('.').pop();
				res.writeHead(200, { 'Content-Type': `image/${ext}` });
				return res.end(fs.readFileSync(filePath));
			}
		}

		let file =
			SOURCE === 'email-builder.js'
				? req.url === '/'
					? 'index.html'
					: req.url.slice(1)
				: req.url === '/'
					? '_generated.html'
					: req.url.slice(1);

		if (!file.includes('.')) file += '.html';

		if (!existsSync(file)) {
			res.writeHead(404);
			return res.end('not found');
		}

		const html = fs.readFileSync(file, 'utf8');
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(inject(html));
	})
	.listen(PORT, () => console.log(`http://localhost:${PORT} — ${SOURCE}`));

chokidar.watch(SOURCE).on('change', rebuild);

rebuild();
