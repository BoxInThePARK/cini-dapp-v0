export type Routes = {
  InitialPage: undefined;
  MainPages: undefined;
  Home: undefined;
  Feed: undefined;
  SinglePhoto: {
    imageSource: string;
    imageRatio: number;
    creatorInfo: {
      avatar: string;
      name: string;
    };
  };
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
