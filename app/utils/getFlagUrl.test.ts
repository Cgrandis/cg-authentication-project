import { getFlagUrl } from './getFlagUrl';

describe('getFlagUrl', () => {
  it('should return correct URL and country for known currency', () => {
    const result = getFlagUrl('USD');
    expect(result).toEqual({ url: 'https://flagcdn.com/w40/us.png', country: 'Estados Unidos' });
  });

  it('should return null for unknown currency', () => {
    const result = getFlagUrl('XYZ');
    expect(result).toBeNull();
  });

  it('should be case-insensitive', () => {
    const result = getFlagUrl('brl');
    expect(result).toEqual({ url: 'https://flagcdn.com/w40/br.png', country: 'Brasil' });
  });
});