import {createContext} from 'react';

interface CaptureContextProp {
  isCapture: boolean;
  setIsCapture: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CaptureContext = createContext({} as CaptureContextProp);
