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
                className="w-52 z-50 origin-top-right custom-scrollbar rounded-xl h-52 overflow-y-auto border border-white/5 bg-white p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
                {themes.map((theme) => (
                    <MenuItem key={theme.name}>
                        <button
                            onClick={() => changeTheme(theme)}
                            className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 ${
                                currentTheme(theme) ? 'bg-gray-300' : ''
                            }`}>
                            {theme.name}
                            <kbd className="ml-auto hidden font-sans text-xs group-data-[focus]:inline">
                                ⌘ {theme.name[0].toUpperCase()}
                            </kbd>
                        </button>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
}
