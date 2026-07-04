import 'dotenv/config';
import { sendEmailTo } from './mailer.js';

// Get template name from command line
const templateName = process.argv[2] || 'index';

const requiredEnv = ['GMAIL_USER', 'GMAIL_CLIENT_ID', 'GMAIL_CLIENT_SECRET', 'GMAIL_REFRESH_TOKEN'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
	console.error(`Error: Missing ENV variables: ${missingEnv.join(', ')}`);
	process.exit(1);
}

async function main() {
	const { recipients } = await import(`./templates/${templateName}.js`);

	if (!recipients || recipients.length === 0) {
		console.log('No Receivers.');
		return;
	}

	console.log(`Receivers ${recipients.length}:`);
	recipients.forEach((to) => console.log(` → ${to}`));

	let sent = 0;
	const failed = [];

	for (const to of recipients) {
		try {
			await sendEmailTo(to, templateName);
			sent++;
		} catch (err) {
			failed.push(to);
			console.error(`Failed → ${to}: ${err.message}`);
		}
	}

	console.log(`\nSent Emails: ${sent} \n`);

	if (failed.length > 0) {
		console.log(`Failed ${failed.length}:`);
		failed.forEach((to) => console.log(` → ${to}`));
	}

	console.log(`Done! \n`);
}

main().catch(console.error);
