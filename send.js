import 'dotenv/config';
import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';
import { compile, emailText, emailInfo, recipients } from './email-builder.js';

const requiredEnv = ['GMAIL_USER', 'GMAIL_CLIENT_ID', 'GMAIL_CLIENT_SECRET', 'GMAIL_REFRESH_TOKEN'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
	console.error(`Error: Missing ENV variables: ${missingEnv.join(', ')}`);
	process.exit(1);
}

const htmlEmail = compile(emailText, 'en');

const plainText = htmlToText(htmlEmail, {
	wordwrap: 80,
	selectors: [{ selector: 'img', format: 'skip' }],
});

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: process.env.GMAIL_USER,
		clientId: process.env.GMAIL_CLIENT_ID,
		clientSecret: process.env.GMAIL_CLIENT_SECRET,
		refreshToken: process.env.GMAIL_REFRESH_TOKEN,
	},
});

async function main() {
	if (!recipients || recipients.length === 0) {
		console.log('No recipients found.');
		return;
	}

	console.log(`Preparing to send ${recipients.length} email(s)...`);

	for (const to of recipients) {
		if (!to) {
			console.warn('Skipping empty email address.');
			continue;
		}

		await transporter.sendMail({
			from: `${emailInfo.from} <${process.env.GMAIL_USER}>`,
			to,
			subject: emailInfo.subject,
			html: htmlEmail,
			text: plainText,
			headers: {
				'List-Unsubscribe': `<mailto:${process.env.GMAIL_USER}?subject=unsubscribe>`,
			},
		});

		console.log(`Sent → ${to}`);
	}

	console.log('Done!');
}

main().catch(console.error);
