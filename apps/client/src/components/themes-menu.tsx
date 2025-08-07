import themes, { IXTerminal } from '@/utils/themes';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

type ThemeProps = {
    changeTheme: (theme: IXTerminal) => void;
};

export default function ThemesMenu({ changeTheme }: ThemeProps) {
    const currentTheme = ({ theme }: IXTerminal) => {
        const current = localStorage.getItem('theme');
        if (current) {
            const parsed = JSON.parse(current);
            return parsed.background === theme.background;
        }
        return false;
    };
    return (
        <Menu>
            <MenuButton>Themes</MenuButton>

            <MenuItems
                transition
                anchor="bottom"
                className="custom-scrollbar focus:outline-hidden data-closed:scale-95 data-closed:opacity-0 z-50 h-52 w-52 origin-top-right overflow-y-auto rounded-xl border border-white/5 bg-white p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)]">
                {themes.map((theme) => (
                    <MenuItem key={theme.name}>
                        <button
                            onClick={() => changeTheme(theme)}
                            className={`data-focus:bg-white/10 group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 ${
                                currentTheme(theme) ? 'bg-gray-300' : ''
                            }`}>
                            {theme.name}
                            <kbd className="group-data-focus:inline ml-auto hidden font-sans text-xs">
                                ⌘ {theme.name[0].toUpperCase()}
                            </kbd>
                        </button>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
}
