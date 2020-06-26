import * as React from 'react';
import AuthNavigation from './logInStack';
import MainNavigation from './homeStack';

export function authNavigation() {
  return (
    <AuthNavigation />
  );
}

export function mainNavigation() {
  return (
    <MainNavigation />
  );
}
