import styled from '@react-pdf/styled-components';

export const Table = styled.View`display: table; width:auto; borderStyle: solid; borderWidth: 1; borderRightWidth: 0; borderBottomWidth: 0`;

export const TR = styled.View`
flexDirection: row; margin:auto`;

export const TD = styled.View`
width: 25%; borderStyle: solid; borderWidth: 1; borderLeftWidth: 0; borderTopWidth: 0;'
`;

export const TT = styled.Text`
margin: auto; marginTop: 5; fontSize 10;
`;

export const LI = styled.Text`
display: list-item; margin-left: 1em;
`;