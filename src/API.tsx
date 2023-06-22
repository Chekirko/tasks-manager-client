import { ApolloClient, gql, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  const authHeader = token ? `Bearer ${token}` : '';
  return {
    headers: {
      ...headers,
      authorization: authHeader,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const REGISTER_USER = gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(createUserInput: $user) {
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      user {
        id
        email
        categories {
          id
          userId
          name
          dateCreated
          tasks {
            dateEnd
            dateStart
            categoryId
            name
          }
        }
      }
      access_token
    }
  }
`;

export const ALL_CATEGORIES = gql`
  query categories {
    categories {
      name
      dateCreated
      id
      tasks {
        id
        name
        dateStart
        dateEnd
        categoryId
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation createCategory($category: CreateCategoryInput!) {
    newCategory: createCategory(createCategoryInput: $category) {
      name
      id
      user {
        id
      }
      dateCreated
      userId
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($category: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $category) {
      name
      id
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation removeCategory($id: Int!) {
    removeCategory(id: $id) {
      id
    }
  }
`;

export const ALL_TASKS = gql`
  query tasks($id: Int!) {
    tasks(id: $id) {
      id
      name
      dateEnd
      dateStart
    }
  }
`;

export const ADD_TASK = gql`
  mutation createTask($task: CreateTaskInput!) {
    newTask: createTask(createTaskInput: $task) {
      id
      name
      dateEnd
      dateStart
    }
  }
`;
