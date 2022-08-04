export type Routes = {
  MockHome: undefined;
  PermissionsPage: undefined;
  CameraPage: undefined;
  MediaPage: {
    path: string;
    type: 'video' | 'photo';
  };
};
