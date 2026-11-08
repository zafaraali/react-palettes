import React, { Component, Suspense, lazy } from 'react';
import seedColors from './seedColors';
import { Route, Switch, Redirect } from 'react-router-dom';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList';
import { generatePalette } from './colorHelpers';
import SingleColorPalette from './components/SingleColorPalette';
import Snackbar from '@mui/material/Snackbar';
import { loadPalettes, loadThemeMode, writeStorage } from './storage';
import Page from './components/Page';
import ThemeContext from './ThemeContext';
const NewPaletteForm = lazy(() => import('./components/NewPaletteForm'));
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: loadPalettes(),
      themeMode: loadThemeMode(),
      storageError: false
    };
  }
  componentDidMount() {
    this.applyTheme();
    this.systemThemeQuery = window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;
    if (this.systemThemeQuery && this.systemThemeQuery.addListener) {
      this.systemThemeQuery.addListener(this.handleSystemThemeChange);
    }
  }
  componentDidUpdate(_, previousState) {
    if (previousState.themeMode !== this.state.themeMode) {
      this.persist('themeMode', this.state.themeMode);
      this.applyTheme();
    }
  }
  componentWillUnmount() {
    if (this.systemThemeQuery && this.systemThemeQuery.removeListener) {
      this.systemThemeQuery.removeListener(this.handleSystemThemeChange);
    }
  }
  handleSystemThemeChange = () => {
    if (this.state.themeMode === 'system') this.applyTheme();
  };
  applyTheme = () => {
    const { themeMode } = this.state;
    const prefersDark = this.systemThemeQuery
      ? this.systemThemeQuery.matches
      : window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effectiveTheme =
      themeMode === 'system' ? (prefersDark ? 'dark' : 'light') : themeMode;
    document.documentElement.setAttribute('data-theme', effectiveTheme);
  };
  setThemeMode = (themeMode) => this.setState({ themeMode });
  findPalette = (id) => {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  };
  deletePalette = (id) => {
    this.setState(
      (st) => ({
        palettes: st.palettes.filter((palette) => palette.id !== id)
      }),
      this.syncLocalStorage
    );
  };
  savePalette = (newPalette) => {
    this.setState(
      (state) => ({ palettes: [...state.palettes, newPalette] }),
      this.syncLocalStorage
    );
  };
  resetPalettes = () => {
    this.setState(
      {
        palettes: seedColors
      },
      this.syncLocalStorage
    );
  };
  persist = (key, value) => {
    const saved = writeStorage(key, value);
    this.setState({ storageError: !saved });
  };
  syncLocalStorage() {
    this.persist('palettes', JSON.stringify(this.state.palettes));
  }
  render() {
    const { palettes } = this.state;
    return (
      <Suspense fallback={<div role='status'>Loading palette editor…</div>}>
        <ThemeContext.Provider
          value={{
            themeMode: this.state.themeMode,
            setThemeMode: this.setThemeMode
          }}
        >
          <Route
            render={({ location }) => (
              <Switch location={location}>
                    <Route
                      exact
                      path='/palette/new'
                      render={(routeProps) => (
                        <Page>
                          <NewPaletteForm
                            savePalette={this.savePalette}
                            palettes={palettes}
                            {...routeProps}
                          />
                        </Page>
                      )}
                    />
                    <Route
                      exact
                      path='/palette/:paletteId/:colorId'
                      render={(routeProps) =>
                        !this.findPalette(routeProps.match.params.paletteId) ||
                        !this.findPalette(
                          routeProps.match.params.paletteId
                        ).colors.some(
                          (color) =>
                            color.name.toLowerCase().replace(/ /g, '-') ===
                            routeProps.match.params.colorId
                        ) ? (
                          <Redirect to='/' />
                        ) : (
                          <Page>
                            <SingleColorPalette
                              colorId={routeProps.match.params.colorId}
                              palette={generatePalette(
                                this.findPalette(
                                  routeProps.match.params.paletteId
                                )
                              )}
                            />
                          </Page>
                        )
                      }
                    />
                    <Route
                      exact
                      path='/'
                      render={(routeProps) => (
                        <Page>
                          <PaletteList
                            palettes={palettes}
                            deletePalette={this.deletePalette}
                            {...routeProps}
                            resetPalettes={this.resetPalettes}
                          />
                        </Page>
                      )}
                    />
                    <Route
                      exact
                      path='/palette/:id'
                      render={(routeProps) =>
                        !this.findPalette(routeProps.match.params.id) ? (
                          <Redirect to='/' />
                        ) : (
                          <Page>
                            <Palette
                              palette={generatePalette(
                                this.findPalette(routeProps.match.params.id)
                              )}
                            />
                          </Page>
                        )
                      }
                    />
                    <Route
                      render={(routeProps) => (
                        <Page>
                          <PaletteList
                            palettes={palettes}
                            deletePalette={this.deletePalette}
                            {...routeProps}
                            resetPalettes={this.resetPalettes}
                          />
                        </Page>
                      )}
                    />
              </Switch>
            )}
          />
        </ThemeContext.Provider>
        <Snackbar
          open={this.state.storageError}
          message='Changes could not be saved to browser storage. They are available for this session only.'
          action={
            <button
              type='button'
              onClick={() => this.setState({ storageError: false })}
            >
              Dismiss
            </button>
          }
        />
      </Suspense>
    );
  }
}
