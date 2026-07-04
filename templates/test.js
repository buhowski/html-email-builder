import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EmailPreheader, EmailPadding, EmailCompiler } from '../components/EmailLayout.js';
import { EmailHeading2, EmailHeading3, EmailParagraph } from '../components/EmailTypography.js';
import { EmailLinkItem, EmailBulletList } from '../components/EmailLists.js';
import { EmailFooter } from '../components/EmailFooter.js';

// Metadata
export const emailInfo = {
	from: 'Test',
	subject: 'Test',
};

// Receivers list
export const recipients = [
	process.env.GMAIL_USER, // Dev Test

	// Receivers
	// 'client@example.com'
];

// Email Content
export const emailText = [
	EmailPreheader('Test.'),

	EmailPadding(),

	EmailParagraph('Test.'),

	EmailFooter(),
];

export const compile = (blocks, lang = 'en') => EmailCompiler(blocks, lang);

// Generate HTML = JS FileName
if (import.meta.url === `file://${process.argv[1]}`) {
	const fileName = path.basename(process.argv[1], '.js');
	fs.writeFileSync(`${fileName}.html`, compile(emailText, 'en'));
}
