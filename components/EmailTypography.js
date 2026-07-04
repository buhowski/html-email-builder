import { S, C } from './EmailLayout.js';

// h2 Title
export const EmailHeading2 = (content, top = 20) => `
  <tr>
    <td style="${S.cell(top)}">
      <h2 style="${S.titleBase} color: ${C.accent1}; font-size: 18px;">${content}</h2>
    </td>
  </tr>
`;

// h3 Title
export const EmailHeading3 = (content, top = 10) => `
  <tr>
    <td style="${S.cell(top)}">
      <p style="${S.titleBase} color: ${C.accent2}; font-size: 15px;">${content}</p>
    </td>
  </tr>
`;

// Paragraph Text
export const EmailParagraph = (content) => `
  <tr>
    <td style="${S.cell()}">
      <p style="${S.textBase}">${content}</p>
    </td>
  </tr>
`;
