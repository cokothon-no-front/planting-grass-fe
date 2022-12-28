import styled from 'styled-components'

export const BoardPageWrapper: any = styled.div`
  background-color: white;
  & .ant-list-items {
    & > .ant-list-item {
      &:hover {
        background-color: #eeeeee;
      }
    }
  }
`