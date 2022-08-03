import LoadingOverlay from 'react-loading-overlay-ts';
import BounceLoader from 'react-spinners/BounceLoader';
import styled from 'styled-components';

const StyledLoader = styled(LoadingOverlay)`
  width: 100%;
  height:100%;
  overflow: hidden;
  border-radius:20px;
  .MyLoader_overlay {
    background: rgba(180, 180, 180, 0.5);
  }
  &.MyLoader_wrapper--active {
    overflow: auto;
  }
  .MyLoader_spinner{
    background:red;
  }
`;

export default function MyLoader({ active, children }: any) {
  return (
    <StyledLoader
      active={active}
      spinner={<BounceLoader />}
      classNamePrefix='MyLoader_'
    >
      {children}
    </StyledLoader>
  );
}