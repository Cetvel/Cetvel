import { useTheme } from 'next-themes';

const useThemeColors = () => {
  const { resolvedTheme } = useTheme();

  return {
    primary: '#6366f1',
    'base-content': resolvedTheme === 'dark' ? '#ffffff' : '#010102',
    secondary: resolvedTheme === 'dark' ? '#374151' : '#f3f4f6',
    border: resolvedTheme === 'dark' ? '#3E4756' : '#e2e8f0',
    accent: resolvedTheme === 'dark' ? '#313844' : '#ffffff',
    'secondary-content': resolvedTheme === 'dark' ? '#919EAB' : '#64748b',
  };
};

export default useThemeColors;
