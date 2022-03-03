// import { searchUser } from './../graphql/resolvers/queries/User/index';
// {
//     "data": {
//         "searchUser": [
//             {
//                 "id": "f517b148-7897-4151-8b78-6719b2e1b441",
//                 "name": "Munir Ali Muhammad",
//                 "email": "mamsheikh123@gmail.com",
//                 "image": "https://lh3.googleusercontent.com/a-/AOh14GijH6xIjeGU2J7erxOkKKj3jc5GDRopVJsic9fR=s96-c",
//                 "username": null,
//                 "__typename": "User"
//             },
//             {
//                 "id": "b214e957-b6a6-42f1-9812-5e99c859c385",
//                 "name": "Munir Ali Mohammed",
//                 "email": "mamsheikh124@gmail.com",
//                 "image": "https://lh3.googleusercontent.com/a/AATXAJwmuHYQfsGUjfjgUy8ZJsajaL15cDti2b6tmZ2a=s96-c",
//                 "username": null,
//                 "__typename": "User"
//             }
//         ]
//     }
// }

export interface ISearch {
  searchUser: {
    id: string;
    name: string;
    email: string;
    image: string;
    username: string | null;
  };
}
// "data": {
//     "searchUser": [
//       {
//         "name": "Munir Ali Muhammad",
//         "email": "mamsheikh123@gmail.com"
//       },
//       {
//         "name": "Munir Ali Mohammed",
//         "email": "mamsheikh124@gmail.com"
//       }
//     ]
//   }
export interface Users {
  id: string;
  name: string;
  email: string;
  image: string;
  username: string;
}
// [
//     {
//         "__typename": string
//         "id": "f517b148-7897-4151-8b78-6719b2e1b441",
//         "name": "Munir Ali Muhammad",
//         "email": "mamsheikh123@gmail.com",
//         "image": "https://lh3.googleusercontent.com/a-/AOh14GijH6xIjeGU2J7erxOkKKj3jc5GDRopVJsic9fR=s96-c",
//         "username": null
//     },
//     {
//         "__typename": "User",
//         "id": "b214e957-b6a6-42f1-9812-5e99c859c385",
//         "name": "Munir Ali Mohammed",
//         "email": "mamsheikh124@gmail.com",
//         "image": "https://lh3.googleusercontent.com/a/AATXAJwmuHYQfsGUjfjgUy8ZJsajaL15cDti2b6tmZ2a=s96-c",
//         "username": null
//     }
// ]
