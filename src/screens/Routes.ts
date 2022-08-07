export type Routes = {
  InitialPage: undefined;
  MockHome: undefined;
  UserProfilePage: undefined;
  PermissionsPage: undefined;
  CameraPage: undefined;
  MediaPage: {
    path: string;
    type: 'video' | 'photo';
  };
};
