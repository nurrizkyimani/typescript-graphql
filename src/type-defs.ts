import {gql} from 'apollo-server-express'

export default gql`
  type Query {
    """
      text message 
    """
    textMessage : String!
  }
`;