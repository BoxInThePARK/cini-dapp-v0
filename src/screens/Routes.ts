export type Routes = {
  InitialPage: undefined;
  MainPages: undefined;
  Home: undefined;
  Feed: undefined;
  Wallet: undefined;
  UserProfilePage: {
    initialTab: number;
  };
  PermissionsPage: undefined;
  CameraPage: undefined;
  MediaPage: {
    path: string;
    type: 'video' | 'photo';
  };
};
