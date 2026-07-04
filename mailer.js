import 'dotenv/config';
import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';
import path from 'path';

// build transporter
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

// Dynamic sender
export async function sendEmailTo(to, templatePath) {
	const { compile, emailText, emailInfo } = await import(`./templates/${templatePath}.js`);

	const html = compile(emailText, 'en');
	const text = htmlToText(html, { wordwrap: 80, selectors: [{ selector: 'img', format: 'skip' }] });

	return transporter.sendMail({
		from: `${emailInfo.from} <${process.env.GMAIL_USER}>`,
		to,
		subject: emailInfo.subject,
		html,
		text,
		headers: {
			'List-Unsubscribe': `<mailto:${process.env.GMAIL_USER}?subject=unsubscribe>`,
		},
	});
}
