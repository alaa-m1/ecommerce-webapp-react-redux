import { Box, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "shared/components";
import _ from "lodash";
import styled from "styled-components";

const withLoadingIndicator = (Element: any, loadingMessage: string) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const handleLoadingIsComplete = useCallback(() => {
      setLoading(false);
    }, []);

    return (
      <MainContainer>
        {loading && (
          <SpinnerContainer>
            {_.isEmpty(loadingMessage) ? (
              <LoadingSpinner size={5} />
            ) : (
              <Typography
                sx={{
                  color: "primary.light",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {t(loadingMessage)}
              </Typography>
            )}
          </SpinnerContainer>
        )}
        <Element
          {...props}
          onLoadingIsComplete={handleLoadingIsComplete}
          isLoading={loading}
        />
      </MainContainer>
    );
  };
};
const MainContainer = styled(Box)`
  position: relative;
  display: flex;
  height: 100%;
  width: 100;
`;

const SpinnerContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default withLoadingIndicator;
