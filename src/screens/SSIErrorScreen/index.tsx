import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC} from 'react';

import SSIPopup from '../../components/messageBoxes/popups/SSIPopup';
import {
  SSIBasicContainerStyled as Container,
  SSIErrorScreenContentContainerStyled as ContentContainer,
  SSIPopupModalDetailsModalContainerStyled as ExtraDetailsContainer,
} from '../../styles/components';
import {ScreenRoutesEnum, StackParamList} from '../../types';

type Props = NativeStackScreenProps<StackParamList, ScreenRoutesEnum.ERROR>;

const SSIErrorScreen: FC<Props> = (props: Props): JSX.Element => {
  const {onClose, image, title, titleBadge, details, extraDetails, detailsPopup, primaryButton, secondaryButton} = props.route.params;
  const [showExtraDetails, setShowExtraDetails] = React.useState(false);

  return (
    <Container>
      <ContentContainer>
        {showExtraDetails && detailsPopup && (
          <ExtraDetailsContainer>
            <SSIPopup
              onClose={async () => setShowExtraDetails(false)}
              title={detailsPopup.title}
              details={detailsPopup.details}
              extraDetails={detailsPopup.extraDetails}
              darkMode
            />
          </ExtraDetailsContainer>
        )}
        <SSIPopup
          onClose={onClose}
          image={image}
          title={title}
          titleBadge={titleBadge}
          details={details}
          extraDetails={extraDetails}
          detailsButton={
            detailsPopup
              ? {
                  caption: detailsPopup.buttonCaption,
                  onPress: async () => setShowExtraDetails(true),
                }
              : undefined
          }
          primaryButton={primaryButton}
          secondaryButton={secondaryButton}
          darkMode
        />
      </ContentContainer>
    </Container>
  );
};

export default SSIErrorScreen;
