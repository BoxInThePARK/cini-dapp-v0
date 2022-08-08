export type Routes = {
  InitialPage: undefined;
  MainPages: undefined;
  MockHome: undefined;
  UserProfilePage: undefined;
  PermissionsPage: undefined;
  CameraPage: undefined;
  MediaPage: {
    path: string;
    type: 'video' | 'photo';
  };
};
