import create from 'zustand';
import type { AlertColor } from '@mui/material';

interface AppState {
	messageBar: {
		open: boolean;
		severity: AlertColor;
		text: string;
	};
	isLoading: boolean;
	alertDialogIsOpen: boolean;
	searchText: string;
	isDarkMode: boolean;
	setMessageBar: (open: boolean, severity: AlertColor, text: string) => void;
	setIsLoading: (isLoading: boolean) => void;
	setAlertDialogIsOpen: (isOpen: boolean) => void;
	setSearchText: (value: string) => void;
	setIsDarkMode: (isDarkMode: boolean) => void;
}

const useUiStore = create<AppState>(set => ({
	messageBar: {
		open: false,
		severity: 'success',
		text: '',
	},
	isLoading: false,
	alertDialogIsOpen: false,
	searchText: '',
	isDarkMode: false,
	setMessageBar: (open: boolean, severity: AlertColor, text: string) =>
		set({
			messageBar: {
				open: open,
				severity: severity,
				text: text,
			},
		}),
	setIsLoading: (isLoading: boolean) => set({ isLoading }),
	setAlertDialogIsOpen: (isOpen: boolean) => set({ alertDialogIsOpen: isOpen }),
	setSearchText: (text: string) => set({ searchText: text }),
	setIsDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
}));

export default useUiStore;
