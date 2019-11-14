// @flow
import React from 'react';
import PropTypes from 'prop-types';
import type { Vault } from '../../actions/vault';

import styles from './MainPage.css';

import Menu from '../../containers/Menu';
import VaultsContainer from '../../ui_components/VaultsContainer/VaultsContainer';
import Welcome from '../../containers/Welcome';

type Props = {
  vaults: Array<Vault>
};

function MainPage(props: Props) {
  return (
    <React.Fragment>
      <div className={styles.root}>
        {props.vaults.length > 0 && <VaultsContainer />}
        <Welcome />
      </div>
      <Menu />
    </React.Fragment>
  );
}

MainPage.propTypes = {
  vaults: PropTypes.array.isRequired
};

export default MainPage;
