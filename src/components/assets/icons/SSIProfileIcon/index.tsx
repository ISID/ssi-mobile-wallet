import React, {FC} from 'react';
import {ColorValue} from 'react-native';
import {useSelector} from 'react-redux';
import {connect} from 'react-redux';

import {fonts, profiles} from '../../../../styles/colors';
import {SSIProfileIconContainerStyled as Container, SSITextH2LightStyled as ProfileIconText} from '../../../../styles/components';
import {RootState} from '../../../../types';
import {getInitials} from '../../../../utils/UserUtils';

export interface IProps {
  fontColor?: ColorValue;
  backgroundColor?: ColorValue;
}

const SSIProfileIcon: FC<IProps> = (props: IProps): JSX.Element => {
  const {fontColor = fonts.light, backgroundColor = profiles['100']} = props;
  const {activeUser} = useSelector(mapStateToProps);

  return (
    <Container style={{backgroundColor}}>
      <ProfileIconText style={{color: fontColor}}>{getInitials(`${activeUser?.firstName} ${activeUser?.lastName}`)}</ProfileIconText>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    activeUser: state.user.activeUser,
  };
};

export default connect(mapStateToProps, null)(SSIProfileIcon);
