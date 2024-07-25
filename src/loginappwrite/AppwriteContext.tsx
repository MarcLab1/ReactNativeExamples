import React, {FC, createContext} from 'react';

import Appwrite from './service';
import {PropsWithChildren} from 'react';

type AppContextType = {
  appwrite: Appwrite;
};

export const AppwriteContext = createContext<AppContextType>({
  appwrite: new Appwrite(),
});

export const AppwriteProvider: FC<PropsWithChildren> = ({children}) => {
  const defaultValue = {
    appwrite: new Appwrite(),
  };

  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  );
};

export default AppwriteContext;
