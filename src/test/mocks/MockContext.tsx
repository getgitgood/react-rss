// import { ReactNode, createContext, useState } from 'react';
// import { initialResponse } from '../../utils/initialStates';
// import { ApiResponse } from '../../types';

// export type MockContextProps = {
//   children: ReactNode;
// };

// export const MockContext = createContext({
//   setData: (newData: ApiResponse) => {
//     data = newData;
//   },
//   data: {
//     user_platforms: false,
//     previous: null,
//     results: [],
//     next: null,
//     count: 0,
//     name: ''
//   }
// });

// export default function MockContextProvider({ children }: MockContextProps) {
//   const [data, setData] = useState(initialResponse);
//   const values = {
//     data,
//     setData
//   };

//   return <MockContext.Provider value={values}>{children}</MockContext.Provider>;
// }
