import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EmailPreheader, EmailPadding, EmailCompiler } from '../components/EmailLayout.js';
import { EmailHeading2, EmailHeading3, EmailParagraph } from '../components/EmailTypography.js';
import { EmailLinkItem, EmailBulletList } from '../components/EmailLists.js';
import { EmailFooter } from '../components/EmailFooter.js';

const LIVE_SITE = 'https://buhowski.dev/';

// Metadata
export const emailInfo = {
	from: 'buhowski.dev',
	subject: 'TEST: HTML Email Showcase',
};

// Receivers list
export const recipients = [
	process.env.GMAIL_USER, // Dev Test

	// Receivers
	// 'client@example.com'
];

// Email Content
export const emailText = [
	EmailPreheader('Engineering, media, and counterculture ecosystem.'),

	EmailPadding(),

	EmailParagraph('HTML Email Template.'),

	EmailParagraph(
		'A production-grade showcase built via a modular email engine with live-reload development and programmatic OAuth2 distribution.',
	),

	EmailHeading2('Frontend Starter Pack'),

	EmailLinkItem([
		{ title: 'Portfolio', url: `${LIVE_SITE}` },
		{ title: 'CV', url: `${LIVE_SITE}cv` },
	]),

	EmailHeading3('In a nutshell'),

	EmailBulletList([
		'Semantic, responsive, and dynamic UI development',
		'High-performance UX optimization',
		'Revitalization of legacy codebases',
		'AI-augmented development workflows',
	]),

	EmailHeading2('Counterculture Ecosystem'),

	EmailParagraph(
		'Developed a market colonization strategy and launch-ready concepts for magazine, film, gamedev, and tech.',
	),

	EmailLinkItem([
		{ genre: 'The Plan', title: 'Ecosystem Vision', url: `${LIVE_SITE}vision` },
		{ genre: 'Strategy', title: 'Magazine & MVP', url: `${LIVE_SITE}mvp` },
		{ genre: 'Tools', title: 'Video Shows & Experiments', url: `${LIVE_SITE}pilots` },
		{ genre: 'Projects', title: 'Cinema Development', url: `${LIVE_SITE}cinema` },
		{ genre: 'Projects', title: 'Gamedev Dimension', url: `${LIVE_SITE}gamedev` },
	]),

	EmailParagraph('Let’s build something significant.'),

	EmailFooter(),
];

export const compile = (blocks, lang = 'en') => EmailCompiler(blocks, lang);

// Generate HTML = JS FileName
if (import.meta.url === `file://${process.argv[1]}`) {
	const fileName = path.basename(process.argv[1], '.js');
	fs.writeFileSync(`${fileName}.html`, compile(emailText, 'en'));
}
