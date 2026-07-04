// --- STYLES & VARIABLES ---
export const tableAttr = 'cellpadding="0" cellspacing="0" border="0" role="presentation"';

export const UI = {
	padX: 28,
	spacing: 20,
	borderRd: 12,
	font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
	fSize: '16px',
};

export const C = {
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

export const S = {
	cell: (t = 0, b = UI.spacing) => `padding: ${t}px ${UI.padX}px ${b}px;`,
	titleBase: `margin: 0; font-weight: normal; text-transform: uppercase; line-height: 1.3; letter-spacing: 1.4px;`,
	textBase: `margin: 0; font-size: ${UI.fSize}; line-height: 1.5; letter-spacing: 0.25px; word-spacing: 0.5px; color: ${C.text};`,
	linkBase: `text-decoration: none; outline: none; display: block;`,
};

// Row Spacer
export const EmailPadding = () => `<tr><td style="padding: 40px ${UI.padX}px 0;"></td></tr>`;

// Preheader = Shown in email client preview
export const EmailPreheader = (text) => {
	const combinedStyles = `display: none !important; visibility: hidden; mso-hide: all; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; color: ${C.cardBg};`;
	const invisibleTail = '&nbsp;&zwnj;'.repeat(200);

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
export const EmailCompiler = (blocks, lang = 'en') => `<!DOCTYPE html>
<html lang="${lang}" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <link rel="icon" href="assets/icons/favicon.ico" type="image/x-icon">
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
