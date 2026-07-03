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
		console.log('No Receivers.');
		return;
	}

	console.log(`Receivers ${recipients.length}:`);
	recipients.forEach((to) => console.log(` → ${to}`));

	let sent = 0;
	const failed = [];

	for (const to of recipients) {
		try {
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
