export type Routes = {
  InitialPage: undefined;
  MockHome: undefined;
  PermissionsPage: undefined;
  CameraPage: undefined;
  MediaPage: {
    path: string;
    type: 'video' | 'photo';
  };
};
