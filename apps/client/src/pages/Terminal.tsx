import Button from '@/components/button';
import InputLabel from '@/components/input-label';
import Modal from '@/components/modal';
import TextInput from '@/components/text-input';
import ThemesMenu from '@/components/themes-menu';
import XTerminalUI from '@/components/x-terminal';
import useTerminal from '@/hooks/use-terminal';

import { MdFullscreen, MdOutlineAdd } from 'react-icons/md';

export default function Terminal() {
    const {
        isLoading,
        terminalState,
        formState,
        isModal,
        toggleModal,
        themeHandler,
        connectSSH,
        formHandler,
        handlePrivateKey,
        toggleShowPassword,
        closeModal
    } = useTerminal();

    return (
        <div className="h-screen">
            <div className="h-full rounded-sm subpixel-antialiased">
                <div className="grid grid-cols-2 items-center justify-between rounded-t border-b border-gray-500 bg-gray-200 p-2 text-center text-black md:grid-cols-3">
                    <div className="relative hidden gap-2 md:flex">
                        <button type="button">File</button>
                        <button type="button">Terminal</button>
                        <ThemesMenu changeTheme={themeHandler} />
                        <button type="button">Help</button>
                    </div>

                    <div className="flex items-center justify-center gap-1">
                        <p className="text-sm">{terminalState.title}</p>
                        {terminalState.id && (
                            <p className="text-xs text-gray-600">(Socket ID: {terminalState.id})</p>
                        )}
                    </div>

                    <div className="ml-auto flex gap-2">
                        <MdOutlineAdd className="size-6 cursor-pointer" onClick={toggleModal} />
                        <MdFullscreen className="size-6 cursor-pointer" />
                    </div>
                </div>
                {!terminalState.id && (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-gray-500">Connecting to server...</p>
                    </div>
                )}
                <XTerminalUI loading={isLoading} theme={terminalState.theme} />
            </div>

            <Modal show={isModal} maxWidth="md" onClose={closeModal}>
                <form onSubmit={connectSSH}>
                    <div>
                        <InputLabel htmlFor="input" value="Host" />

                        <TextInput
                            id="input"
                            name="input"
                            type="search"
                            value={formState.input}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            onChange={formHandler}
                            isFocused
                            required
                            placeholder="root@127.0.0.1 -p 22"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="privateKey" value="Private Key" />
                        {formState.hasKey ? (
                            <input
                                type="file"
                                id="privateKey"
                                name="privateKey"
                                onChange={handlePrivateKey}
                                className="form-input block w-full rounded-md bg-gray-100 p-1.5"
                            />
                        ) : (
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    name="password"
                                    value={formState.password}
                                    type={formState.showPassword ? 'text' : 'password'}
                                    className="mt-1 block w-full"
                                    placeholder="*********"
                                    onChange={formHandler}
                                />

                                <button
                                    onClick={toggleShowPassword}
                                    type="button"
                                    className="absolute inset-y-0 end-0 z-20 flex items-center pe-4">
                                    {formState.showPassword ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16">
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    <label htmlFor="custom_switch" className="mt-2 flex items-center">
                        <div className="relative m-0 h-6 w-12">
                            <input
                                type="checkbox"
                                id="custom_switch"
                                name="hasKey"
                                checked={formState.hasKey}
                                onChange={formHandler}
                                className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                            />
                            <span className="before-bg-close peer-checked:border-primary peer-checked:before:bg-primary peer-checked-before-bg block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:bg-center before:bg-no-repeat before:transition-all before:duration-300 peer-checked:before:left-7"></span>
                        </div>
                        <span className="mx-2">With Private Key</span>
                    </label>

                    <div className="mt-4 flex items-center justify-center gap-3">
                        <Button className="mr-2" type="button" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button className="btn btn-primary">Connect</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
