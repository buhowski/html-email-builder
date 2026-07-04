import { S, C, UI, tableAttr } from './EmailLayout.js';

// Links with arrow
export const EmailLinkItem = (items) => {
	const padY = '14px';
	const padY2 = '22px';

	return `
    <tr>
      <td style="${S.cell(0, 20)}">
        <table ${tableAttr} width="100%" style="border-radius: 6px; overflow: hidden; background-color: ${C.listLinkBg};">
          ${items
						.map(
							(item, i) => `
            <tr>
              <td style="font-size: ${UI.fSize}; line-height: 1.3; letter-spacing: 0.8px; vertical-align: middle;">
                <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="${S.linkBase} color: ${C.link}; padding: ${padY} 0 ${padY} 20px;">
                  ${item.genre ? `<span style="display: block; margin: 0 0 5px; color: ${C.copy}; font-size: 10px; text-transform: uppercase; line-height: 1.3; font-weight: 300;">${item.genre}</span>` : ''}
                  ${item.title}
                </a>
              </td>
              <td align="right" style="font-size: 23px; line-height: 1; vertical-align: middle;">
                <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="${S.linkBase} color: ${C.accent1}; padding:  ${item.genre ? padY2 : padY} 18px ${item.genre ? padY2 : padY} 5px">→</a>
              </td>
            </tr>
            ${i < items.length - 1 ? `<tr><td colspan="2" height="1" style="background-color: ${C.bodyBg}; font-size: 1px; line-height: 1px; height: 1px;">&nbsp;</td></tr>` : ''}
          `,
						)
						.join('')}
        </table>
      </td>
    </tr>
  `;
};

// Bullet list
export const EmailBulletList = (items) => `
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
