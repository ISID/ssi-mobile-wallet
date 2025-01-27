import styled from 'styled-components/native';

import {fonts} from '../../../colors';
import {SSIFlexDirectionRowViewStyled, SSIRoundedContainerBackgroundSecondaryDarkStyled} from '../../containers';
import {SSITextH5LightSemiBoldStyled} from '../../fonts';

export const SSIConnectionDetailsViewCaptionDetailsStyled = styled(SSITextH5LightSemiBoldStyled)`
  margin-bottom: 9px;
`;

export const SSIConnectionDetailsViewValueCaptionStyled = styled(SSITextH5LightSemiBoldStyled)`
  color: ${fonts.light};
  height: auto;
`;

export const SSIConnectionDetailsViewLabelRowViewStyled = styled(SSIFlexDirectionRowViewStyled)`
  margin-bottom: 9px;
`;

export const SSIConnectionDetailsViewRoundedContainerStyled = styled(SSIRoundedContainerBackgroundSecondaryDarkStyled)`
  max-height: 75%;
  width: 86.67%;
  margin-top: 10px;
  padding: 16px 17px 0px 17px;
`;

export const SSIConnectionDetailsLabelsContainerStyled = styled.View`
  padding-top: 16px;
  height: 270px;
`;

export const SSIConnectionDetailsViewSeparatorStyled = styled.View`
  border-bottom-width: 1px;
  padding-bottom: 5px;
  border-bottom-color: #404d7a;
`;
