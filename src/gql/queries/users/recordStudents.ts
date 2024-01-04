import type * as Types from '../../schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RecordStudentsQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
  order?: Types.InputMaybe<Types.UserOrderBy>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type RecordStudentsQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'UserConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<Types.PageInfo, 'hasNextPage' | 'hasPreviousPage'>
    ), edges?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, 'id' | 'firstName' | 'lastName'>
      & { student?: Types.Maybe<(
        { __typename?: 'UserStudent' }
        & Pick<Types.UserStudent, 'id' | 'birthday' | 'grade' | 'emoji'>
      )> }
    )>>> }
  ) }
);


export const RecordStudentsDocument = gql`
    query recordStudents($search: String, $order: UserOrderBy, $offset: Int) {
  users(
    filter: {role: [student], orderBy: $order}
    search: $search
    offset: $offset
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      id
      firstName
      lastName
      student {
        id
        birthday
        grade
        emoji
      }
    }
  }
}
    `;

export function useRecordStudentsQuery(options: Omit<Urql.UseQueryArgs<never, RecordStudentsQueryVariables>, 'query'>) {
  return Urql.useQuery<RecordStudentsQuery, RecordStudentsQueryVariables>({ query: RecordStudentsDocument, ...options });
};