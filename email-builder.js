import fs from 'fs';

const LIVE_SITE = 'https://buhowski.dev/';

// --- STYLES & VARIABLES ---
const tableAttr = 'cellpadding="0" cellspacing="0" border="0" role="presentation"';

const C = {
	bodyBg: '#303030',
	cardBg: '#242424',
	footerBg: '#121212',
	accent1: '#f6b96f',
	accent2: '#d0887d',
	text: '#e2e2e2',
	link: '#55aadd',
	listLinkBg: '#1a1a1a',
	copy: '#696969',
};

const UI = {
	padX: 28,
	spacing: 18,
	borderRd: 12,
	font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
	fSize: '16px',
};

const S = {
	cell: (t = 0, b = UI.spacing) => `padding: ${t}px ${UI.padX}px ${b}px;`,
	titleBase: `margin: 0; font-weight: normal; text-transform: uppercase; line-height: 1.3; letter-spacing: 1.4px;`,
	textBase: `margin: 0; font-size: ${UI.fSize}; line-height: 1.5; letter-spacing: 0.25px; word-spacing: 0.5px; color: ${C.text};`,
};

// Icons Server Path
const SERVER_SITE_URL = 'https://buhowski.github.io/html-email-builder';
const ICONS_PATH = `${SERVER_SITE_URL}/assets/icons`;

// Social media links
export const socialLinks = [
	{ url: 'https://t.me/olexander_tsiomakh', icon: `${ICONS_PATH}/tg.png`, alt: 'Telegram' },
	{ url: 'https://www.instagram.com/buhowski', icon: `${ICONS_PATH}/ig.png`, alt: 'Instagram' },
	{ url: 'https://linkedin.com/in/olexander', icon: `${ICONS_PATH}/in.png`, alt: 'LinkedIn' },
];

// Row Spacer
export const padding = () => `<tr><td style="padding: 40px ${UI.padX}px 0;"></td></tr>`;

// H2 Title
export const h2 = (content, top = 20) => `
  <tr>
    <td style="${S.cell(top)}">
      <h2 style="${S.titleBase} color: ${C.accent1}; font-size: 18px;">${content}</h2>
    </td>
  </tr>
`;

// H3 Title
export const h3 = (content, top = 10) => `
  <tr>
    <td style="${S.cell(top)}">
      <p style="${S.titleBase} color: ${C.accent2}; font-size: 15px;">${content}</p>
    </td>
  </tr>
`;

// Paragraph block
export const text = (content) => `
  <tr>
    <td style="${S.cell()}">
      <p style="${S.textBase}">${content}</p>
    </td>
  </tr>
`;

// Links Items
export const linkItem = (items) => `
  <tr>
    <td style="${S.cell(0, 18)}">
      <table ${tableAttr} width="100%" style="border-radius: 6px; overflow: hidden; background-color: ${C.listLinkBg};">
        ${items
					.map(
						(item, i) => `
          <tr>
            <td style="font-size: ${UI.fSize}; line-height: 1.3; letter-spacing: 0.8px; vertical-align: middle;">
              <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="display: block; text-decoration: none; outline: none; color: ${C.link}; padding: 14px 0 14px 20px;">
                ${
									item.genre
										? `<span style="display: block; margin: 0 0 5px; padding: 0; color: ${C.copy}; font-size: 10px; text-transform: uppercase; line-height: 1.3; font-weight: 300;">${item.genre}</span>`
										: ''
								}
                ${item.title}
              </a>
            </td>
            <td align="right" width="40" style="font-size: 23px; line-height: 0.9; vertical-align: middle;">
              <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; outline: none; color: ${C.accent1}; display: block; padding: 14px 18px 14px 0;">→</a>
            </td>
          </tr>
          ${
						i < items.length - 1
							? `<tr><td colspan="2" height="1" style="background-color: ${C.bodyBg}; font-size: 1px; line-height: 1px; height: 1px;">&nbsp;</td></tr>`
							: ''
					}
        `,
					)
					.join('')}
      </table>
    </td>
  </tr>
`;

// Bullet list
export const bulletList = (items) => `
  <tr>
    <td style="${S.cell(0, 0)}">
      <table ${tableAttr} width="100%">
        ${items
					.map(
						(item) => `
          <tr>
            <td style="padding: 0 0 ${UI.spacing}px;">
              <table ${tableAttr} width="100%">
                <tr>
                  <td width="20" valign="middle">
                    <span style="display: block; width: 4px; height: 4px; border-radius: 50%; background-color: ${C.accent2};"></span>
                  </td>
                  <td style="${S.textBase}">${item}</td>
                </tr>
              </table>
            </td>
          </tr>
        `,
					)
					.join('')}
      </table>
    </td>
  </tr>
`;

// Footer with social links
export const footer = (links = socialLinks) => {
	const imgRatio = 25;

	return `
    <tr>
      <td style="font-size: 0; line-height: 0; height: 22px;">&nbsp;</td>
    </tr>
    <tr>
      <td align="center" style="background: ${C.footerBg}; padding: 40px ${UI.padX}px 18px;">
        <table ${tableAttr} width="100%">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin: 0 auto;">
                <tr>
                  ${links
										.map(
											(link) => `
                    <td style="padding: 0 10px;">
                      <a href="${link.url}" target="_blank" rel="noopener noreferrer" style="display: block; border-radius: 50%; background: ${C.cardBg}; padding: 1px; text-decoration: none; outline: none; overflow: hidden;">
                        <span style="display: block; background: ${C.listLinkBg}; border-radius: 50%; padding: 13px; overflow: hidden;">
                          <img src="${link.icon}" alt="${link.alt}" width="${imgRatio}" height="${imgRatio}" style="display: block; width: ${imgRatio}px; height: ${imgRatio}px; border: 0; background: transparent; outline: none; overflow: visible; font-size: 10px;" />
                        </span>
                      </a>
                    </td>
                  `,
										)
										.join('')}
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 22px;">
              <div style="background-color: ${C.bodyBg}; font-size: 1px; line-height: 1px; height: 1px;">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0 0; vertical-align: baseline;">
              <table ${tableAttr} width="100%">
                <tr>
                  <td style="font-size: 11px; color: ${C.copy}; letter-spacing: 1.2px; vertical-align: baseline;">
                    ${new Date().getFullYear()} © Olexander Tsiomakh
                  </td>
                  <td align="right" style="vertical-align: baseline;">
                    <a href="https://buhowski.dev" target="_blank" rel="noopener noreferrer" style="display: inline; text-decoration: none; outline: none; color: ${C.link}; font-size: 11px; opacity: 0.68; letter-spacing: 1.6px; padding: 14px 0 14px 6px; font-weight: 600; line-height: 1;">
                      buhowski.dev
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
};

// Preheader content
export const preheader = (text) => {
	// Hide preview text
	const invisibleTail = '&nbsp;&zwnj;'.repeat(200);
	const combinedStyles = `display: none !important; visibility: hidden; mso-hide: all; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; color: ${C.cardBg};`;

	return `
    <tr style="display: none; mso-hide: all;">
      <td style="display: none; mso-hide: all;">
        <div style="${combinedStyles}">
          <span style="display: block; white-space: nowrap;">«${text}»</span>
          ${invisibleTail}
        </div>
      </td>
    </tr>
  `;
};

// HTML wrapper compiler
export const compile = (blocks, lang = 'en') => `<!DOCTYPE html>
<html lang="${lang}" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>HTML Email Showcase</title>
  <style>
    :root { color-scheme: dark; supported-color-schemes: dark; }
    [data-ogsc] .dark-img { display:block !important; width: auto !important; overflow: visible !important; float: none !important; max-height:inherit !important; max-width:inherit !important; line-height: auto !important; visibility:visible !important; }
    [data-ogsc] .light-img { display:none; display:none !important; }
    table { text-rendering: auto; -webkit-font-smoothing: auto; border-collapse: collapse; border-spacing: 0; }
    table a { display: inline }
  </style>
</head>
<body bgcolor="${C.bodyBg}" style="margin: 0; padding: 0; background-color: ${C.bodyBg}; font-family: ${UI.font}; font-size: 100%; mso-line-height-rule: exactly;">
  <table lang="${lang}" ${tableAttr} style="font-family: ${UI.font}; border-spacing: 0;" bgcolor="${C.bodyBg}" width="100%">
    <tr>
      <td align="center" style="padding: 45px 0;">
        <table ${tableAttr} width="600" bgcolor="${C.cardBg}" style="width: 100%; max-width: 600px; min-width: 312px; border-radius: ${UI.borderRd}px; overflow: hidden; background-color: ${C.cardBg};">
          <tr>
            <td bgcolor="${C.cardBg}" style="background-color: ${C.cardBg}; border-radius: ${UI.borderRd}px; overflow: hidden;">
              <table ${tableAttr} style="width: 100%; border-collapse: collapse;">
                ${blocks.join('')}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// Email content
export const emailText = [
	preheader('Engineering, media, and counterculture ecosystem.'),

	padding(),

	text('HTML Email Showcase.'),

	text(
		'This system is a modular email builder I developed to streamline deployment, featuring live preview and automated production-grade delivery.',
	),

	h2('Frontend Developer'),

	linkItem([
		{ title: 'Portfolio', url: `${LIVE_SITE}` },
		{ title: 'CV', url: `${LIVE_SITE}cv` },
	]),

	h3('SUMMARY'),

	bulletList([
		'Semantic, pixel-perfect, responsive UI development',
		'High-performance UX optimization',
		'Revitalization of legacy codebases',
		'AI-augmented development workflows',
	]),

	h2('Counterculture Ecosystem'),

	text(
		'Developed a market colonization strategy and launch-ready concepts for magazine, film, gamedev, and tech',
	),

	linkItem([
		{ genre: 'The Plan', title: 'Ecosystem Vision', url: `${LIVE_SITE}vision` },
		{ genre: 'Strategy', title: 'Magazine & MVP', url: `${LIVE_SITE}mvp` },
		{ genre: 'Tools', title: 'Video Shows & Experiments', url: `${LIVE_SITE}pilots` },
		{ genre: 'Projects', title: 'Cinema Development', url: `${LIVE_SITE}cinema` },
		{ genre: 'Projects', title: 'Gamedev Dimension', url: `${LIVE_SITE}gamedev` },
	]),

	text('Let’s build something significant.'),

	footer(),
];

// Metadata for sending
export const emailInfo = {
	from: 'Olexander',
	subject: 'Email Subject',
};

// Recipients list
export const recipients = [
	// Dev Test
	process.env.GMAIL_USER,

	// Other
	// 'client@example.com'
];

// Generate HTML file
fs.writeFileSync('index.html', compile(emailText, 'en'));
