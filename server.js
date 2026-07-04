import path from 'path';
import http from 'http';
import fs, { existsSync } from 'fs';
import { execSync } from 'child_process';
import chokidar from 'chokidar';
import { sendEmailTo } from './mailer.js';

const PORT = 666;
const senderTools = 'helpers/sender-panel.html';
const SOURCE = process.argv[2] || 'templates/index.js';

// Dev tools injection
const injectDevTools = (html) => {
	try {
		const tools = fs.readFileSync(senderTools, 'utf8');
		return html.replace('</body>', `${tools}</body>`);
	} catch (e) {
		console.warn('Sender form file not found, skipping injection.');
		return html;
	}
};

let clients = [];

// Template compiler
const rebuild = (changedPath) => {
	const target = changedPath && changedPath.startsWith('templates/') ? changedPath : SOURCE;

	try {
		console.log(`\nCompiling: ${target}`);
		execSync(`node ${target}`);

		clients.forEach((res) => {
			res.write('data: reload\n\n');
		});

		console.log('Rebuilt Successfully.');
	} catch (e) {
		console.error(e);
	}
};

http
	.createServer((req, res) => {
		// Email delivery handler
		if (req.method === 'POST' && req.url === '/send') {
			let body = '';
			req.on('data', (chunk) => (body += chunk));
			req.on('end', async () => {
				try {
					const { to, template } = JSON.parse(body);
					const templateName = template || path.basename(SOURCE, '.js');

					await sendEmailTo(to, templateName);
					res.writeHead(200, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify({ ok: true }));
				} catch (e) {
					res.writeHead(500, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify({ ok: false, error: e.message }));
				}
			});
			return;
		}

		// SSE connection handler
		if (req.url === '/sse') {
			res.writeHead(200, {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive',
			});

			clients.push(res);

			req.on('close', () => {
				clients = clients.filter((c) => c !== res);
			});
			return;
		}

		// Asset server
		if (req.url.startsWith('/assets/')) {
			const filePath = req.url.slice(1);
			if (existsSync(filePath)) {
				const ext = filePath.split('.').pop();
				res.writeHead(200, { 'Content-Type': `image/${ext}` });
				return res.end(fs.readFileSync(filePath));
			}
		}

		// HTML routing
		let file = req.url.slice(1);
		if (req.url === '/') {
			file = `${path.basename(SOURCE, '.js')}.html`;
		} else if (!file.includes('.')) {
			file += '.html';
		}

		// Lazy build
		if (!existsSync(file)) {
			const templateName = path.basename(file, '.html');
			const jsSource = `templates/${templateName}.js`;
			if (existsSync(jsSource)) {
				rebuild(jsSource);
			}
		}

		// 404 handler
		if (!existsSync(file)) {
			res.writeHead(404);
			return res.end('not found');
		}

		// Response delivery
		const html = fs.readFileSync(file, 'utf8');
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(injectDevTools(html));
	})
	.listen(PORT, () => console.log(`http://localhost:${PORT} — ${SOURCE}`));

// Watcher
chokidar
	.watch(['components', 'templates', 'helpers'], { ignored: /node_modules/ })
	.on('change', (path) => {
		rebuild(path);
	});

rebuild();
