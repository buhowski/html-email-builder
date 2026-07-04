import { C, UI, tableAttr } from './EmailLayout.js';

// Icons Server Path
const SERVER_SITE_URL = 'https://buhowski.github.io/html-email-builder';
const ICONS_PATH = `${SERVER_SITE_URL}/assets/icons`;

// Social media links
export const defaultSocialLinks = [
	{ url: 'https://t.me/olexander_tsiomakh', icon: `${ICONS_PATH}/tg.png`, alt: 'Telegram' },
	{ url: 'https://www.instagram.com/buhowski', icon: `${ICONS_PATH}/ig.png`, alt: 'Instagram' },
	{ url: 'https://linkedin.com/in/olexander', icon: `${ICONS_PATH}/in.png`, alt: 'LinkedIn' },
];

// Footer
export const EmailFooter = (links = defaultSocialLinks) => {
	const imgRatio = 25;

	return `
    <tr>
      <td style="font-size: 0; line-height: 0; height: 22px;">&nbsp;</td>
    </tr>
    <tr>
      <td align="center" style="background: ${C.footerBg}; padding: 42px ${UI.padX}px 18px;">
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
