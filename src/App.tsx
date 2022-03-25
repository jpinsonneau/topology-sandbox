import {
  Avatar,
  Brand, Page, PageHeader,
  PageHeaderTools,
  PageHeaderToolsItem, Select, SelectOption, SelectVariant, SkipToContent
} from '@patternfly/react-core';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import imgAvatar from './assets/images/imgAvatar.svg';
import imgBrand from './assets/images/imgBrand.svg';
import { TopologyDemo } from './components/demos';

interface AppState {
  activeItem: number | string;
  isNavOpen: boolean;
  isThemesOpen: boolean;
  theme: string;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    activeItem: '',
    isNavOpen: true,
    isThemesOpen: false,
    theme: 'Light theme'
  };

  private onNavSelect = (selectedItem: { itemId: number | string }) => {
    this.setState({ activeItem: selectedItem.itemId });
  };

  private onThemeSelect = (event: React.MouseEvent<Element, MouseEvent>, selectedItem: string) => {
    this.setState({ theme: selectedItem, isThemesOpen: false });
    const htmlElement = document.getElementsByTagName('html')[0];
    if (htmlElement) {
      if (selectedItem === 'Dark theme') {
        htmlElement.classList.add('pf-theme-dark');
      } else {
        htmlElement.classList.remove('pf-theme-dark');
      }
    }
  };

  private onThemeToggle = () => {
    this.setState({ isThemesOpen: !this.state.isThemesOpen });
  };

  private themeSelectItems = [
    <SelectOption key="light" value="Light theme" />,
    <SelectOption key="dark" value="Dark theme" />
  ];

  private getContent = () => (
    <React.Fragment>
      <TopologyDemo />
    </React.Fragment>
  );

  private pageId = 'ts-demo-app-page-id';
  private getSkipToContentLink = () => <SkipToContent href={`#${this.pageId}`}>Skip to Content</SkipToContent>;

  render() {
    const { isNavOpen, activeItem, isThemesOpen, theme } = this.state;

    const AppToolbar = (
      <PageHeaderTools>
        <PageHeaderToolsItem>
          <Select
            toggleId="select-theme-toggle"
            variant={SelectVariant.single}
            position="right"
            onToggle={this.onThemeToggle}
            onSelect={this.onThemeSelect}
            selections={theme}
            isOpen={isThemesOpen}
          >
            {this.themeSelectItems}
          </Select>
        </PageHeaderToolsItem>
        <Avatar src={imgAvatar} alt="Avatar image" />
      </PageHeaderTools>
    );

    const AppHeader = (
      <PageHeader
        logo={<Brand src={imgBrand} alt="Patternfly Logo" />}
        headerTools={AppToolbar}
        showNavToggle
        isNavOpen={isNavOpen}
        onNavToggle={() => this.setState({ isNavOpen: !isNavOpen })}
      />
    );

    return (
      <Router>
        <Page
          header={AppHeader}
          skipToContent={this.getSkipToContentLink()}
          isManagedSidebar
          mainContainerId={this.pageId}
        >
          {this.getContent()}
        </Page>
      </Router>
    );
  }
}

export default App;
