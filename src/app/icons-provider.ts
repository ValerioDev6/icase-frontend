import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import {
	ArrowLeftOutline,
	CaretRightFill,
	DashboardOutline,
	DatabaseOutline,
	DeleteOutline,
	EditOutline,
	EyeOutline,
	FolderFill,
	FolderOutline,
	FormOutline,
	HomeOutline,
	LogoutOutline,
	MenuFoldOutline,
	MenuUnfoldOutline,
	SaveOutline,
	SearchOutline,
	SettingOutline,
	SwitcherOutline,
	TeamOutline,
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

const icons = [
	MenuFoldOutline,
	MenuUnfoldOutline,
	DashboardOutline,
	FormOutline,
	SettingOutline,
	ArrowLeftOutline,
	LogoutOutline,
	HomeOutline,
	EyeOutline,
	EditOutline,
	SearchOutline,
	DatabaseOutline,
	DeleteOutline,
	FolderOutline,
	TeamOutline,
	SaveOutline,
	SwitcherOutline,
	CaretRightFill,
	FolderFill,
];

export function provideNzIcons(): EnvironmentProviders {
	return importProvidersFrom(NzIconModule.forRoot(icons));
}
