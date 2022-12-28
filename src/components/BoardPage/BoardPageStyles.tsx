import styled from 'styled-components'

export const BoardPageWrapper: any = styled.div`
  background-color: white;
  border-radius: 8px;

  & .ant-spin-container {
    overflow: auto;
    ${(props: any) => `height: ${props.listHeight}px`};
  }
  & .ant-list-items {
    & > .ant-list-item {
      &:hover {
        background-color: #eeeeee;
      }
    }
  }
`